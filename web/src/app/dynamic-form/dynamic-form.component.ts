import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, of, Subject, takeUntil, catchError } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';
import { DynamicListComponent } from '../dynamic-list/dynamic-list.component';
import { DynamicFormService, IFormStructure, IOption } from './dynamic-form.service';
import { SelectionRequiredValidator, CuitValidator, CBUValidator, CVUValidator } from './dynamic-form.validators';
import { DatetimerangeComponent } from '../datetimerange/datetimerange.component';
import { MtxDatetimepicker, MtxDatetimepickerInput, MtxDatetimepickerToggle } from '@ng-matero/extensions/datetimepicker';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    NgxMaskDirective,
    DynamicListComponent,
    DatetimerangeComponent,
    MtxDatetimepicker,
    MtxDatetimepickerInput,
    MtxDatetimepickerToggle,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {

  private $destroy = new Subject<void>();

  formAux  : IFormStructure[] = []

  formStructure = input.required<IFormStructure[]>({alias: 'formStructure'});

  initialData = input<object | undefined>({},{alias: 'initialData'});

  urlApi = input<string>('', {alias: 'urlApi'});

  appearance = input<MatFormFieldAppearance>('fill', {alias: 'appearance'});

  btnOkText = input<string>('Aceptar', {alias: 'btnOkText'});

  btnCancelText = input<string>('Cancelar', {alias: 'btnCancelText'});

  dataResult = output<any>({alias: 'submitForm'});

  dynamicForm!: FormGroup

  lists : { [key: string]: any[] } = {}

  formBuilder = inject(FormBuilder)

  http = inject(HttpClient)

  dynamicFormService = inject(DynamicFormService)

  constructor() {

    effect(() => {

      this.formAux = structuredClone(this.formStructure())

      if (this.formAux.length > 0) {

        let initialData = this.initialData();
        let formGroup: { [key: string]: any } = {};

        this.formAux.forEach(control => {
          
          // Add validators to control
          
          let controlValidators: ValidationErrors[] = [];

          if (control.validations) {
            control.validations.forEach((validation: any) => {
              if (validation.validator === 'required') controlValidators.push(Validators.required);
              if (validation.validator === 'email') controlValidators.push(Validators.email);
              if (validation.validator === 'pattern') controlValidators.push(Validators.pattern(validation.value));
              if (validation.validator === 'minlength') controlValidators.push(Validators.minLength(validation.value));
              if (validation.validator === 'maxlength') controlValidators.push(Validators.maxLength(validation.value));
              if (validation.validator === 'min') controlValidators.push(Validators.min(validation.value));
              if (validation.validator === 'max') controlValidators.push(Validators.max(validation.value));
              if (validation.validator === 'requiredTrue') controlValidators.push(Validators.requiredTrue);
              if (validation.validator === 'nullValidator') controlValidators.push(Validators.nullValidator);
              if (validation.validator === 'selected') controlValidators.push(SelectionRequiredValidator);
              if (validation.validator === 'cuit') controlValidators.push(CuitValidator);
              if (validation.validator === 'cbu') controlValidators.push(CBUValidator);
              if (validation.validator === 'cvu') controlValidators.push(CVUValidator);
            });
          }

          // Add initial data to control

          if (initialData) {
            for(const [key, value] of Object.entries(initialData)){
              if (control.name === key) {
                control.value = value as string
              }
            }
          }

          // Add options to control

          if (control.optionsRest && control.type === 'select') {
            this.http.get<IOption[]>(`${this.urlApi()}/${control.optionsRest}`).subscribe(items =>
              control.options = items
            )
          }

          if (control.optionsVar && control.type === 'select') {
            control.options = this.dynamicFormService.getCollection(control.optionsVar)
          }

          // Add control to form group

          if (control.type === 'daterange') {
            if (initialData && (initialData as any)[control.name]) {
              for(const [key, value] of Object.entries(initialData)){
                if (control.name === key) {
                  formGroup[control.name] = new FormGroup({
                    start: new FormControl<Date | null>(value?.start, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null } ),
                    end: new FormControl<Date | null>(value?.end, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null }),
                  });
                }
              }
            } else {
              formGroup[control.name] = new FormGroup({
                start: new FormControl<Date | null>(control.value == undefined ? null : control.value.start, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null }),
                end: new FormControl<Date | null>(control.value == undefined ? null : control.value.end, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null }),
              });
            }
          } else if (control.type === 'list') {
              this.lists[control.name] = []
          } else if (control.type === 'datetime') {
              formGroup[control.name] = [control.value == undefined ? '' : new Date(control.value), controlValidators];
          } else {
              // General case for most controls...
              formGroup[control.name] = [control.value == undefined ? '' : control.value, controlValidators];
          }

        });

        this.dynamicForm = this.formBuilder.group(formGroup);

        this.formAux.forEach(control => {
          if (control.optionsRest && control.type === 'autocomplete') {
            // Subscribe to the change events of the autocomplete control and update the options
            this.dynamicForm.get(control.name)?.valueChanges
            .pipe(
              takeUntil(this.$destroy),
              debounceTime(400),
              distinctUntilChanged(),
              switchMap(value => {
                if ((value || '')?.length >= 3) {
                  return this.http.get<IOption[]>(`${this.urlApi()}/${control.optionsRest}/${value}`).pipe(
                    catchError(async (error) => {
                      console.warn(error)
                    })
                  )
                } else {
                  return of([])
                }
              })
            ).subscribe((items: any) => control.options = items)
          }
        })

      }

    })

}

  getInitialDataForList(name: string): any {
    const data =  this.initialData() as any
    const dataArray = data[name]
    return dataArray
  }

  getRange(name: string) {
    return this.dynamicForm.get(name)! as FormGroup
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      const data = {...this.dynamicForm.value, ...this.lists};
      console.log(JSON.stringify(data))
      this.dataResult.emit(data);
    } else {
      this.dynamicForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.dataResult.emit(undefined);
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);
    for (let validation of control.validations) {
      let validator = validation.validator;
      if (validator === 'requiredTrue') validator = 'required';
      if (formControl?.hasError(validator)
        || (control.type === 'daterange' && (formControl as FormGroup)?.controls['start']?.hasError(validator))
        || (control.type === 'daterange' && (formControl as FormGroup)?.controls['end']?.hasError(validator))) {
        return validation.message;
      }
    }
    return '';
  }

  isRequired(control: any): boolean {
    return control.validations?.some((validation: any) => validation.validator === 'required');
  }

  autocompleteDisplay(option: IOption): string {
    return option ? option.label : '';
  }

}

