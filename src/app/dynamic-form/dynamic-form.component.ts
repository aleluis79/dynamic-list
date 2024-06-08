import { Component, effect, inject, input, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, of, Subject, takeUntil } from 'rxjs';

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
    MatAutocompleteModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {

  private $destroy = new Subject<void>();

  formStructure = input.required<IFormStructure[]>({alias: 'formStructure'});

  initialData = input<object | undefined>(undefined, {alias: 'initialData'});

  urlApi = input<string>('', {alias: 'urlApi'});

  dataResult = output<any>({alias: 'submitForm'});

  dynamicForm!: FormGroup

  formBuilder = inject(FormBuilder)

  http = inject(HttpClient)

  constructor() {

    effect(() => {

      let formStructure = this.formStructure();

      if (formStructure.length > 0) {

        let initialData = this.initialData();
        let formGroup: { [key: string]: any } = {};

        formStructure.forEach(control => {
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
            });
          }

          if (initialData) {
            for(const [key, value] of Object.entries(initialData)){
              if (control.name === key) {
                control.value = value as string
              }
            }
          } else {
            control.value = ''
          }

          if (control.optionsFn && control.type === 'select') {
            this.http.get<IOption[]>(`${this.urlApi()}/${control.optionsFn}`).subscribe(items =>
              control.options = items
            )
          }

          if (control.type === 'daterange') {

            if (initialData) {
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
                start: new FormControl<Date | null>(null, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null }),
                end: new FormControl<Date | null>(null, { validators: control.validations?.find(v => v.validator === 'required') ? Validators.required : null }),
              });
            }

          } else {
            formGroup[control.name] = [control.value || '', controlValidators];
          }

        });

        this.dynamicForm = this.formBuilder.group(formGroup);

        formStructure.forEach(control => {
          if (control.optionsFn && control.type === 'autocomplete') {
            this.dynamicForm.get(control.name)?.valueChanges
            .pipe(
              takeUntil(this.$destroy),
              debounceTime(400),
              distinctUntilChanged(),
              switchMap(value => {
                if ((value || '')?.length >= 3) {
                  return this.http.get<IOption[]>(`${this.urlApi()}/${control.optionsFn}/${value}`)
                } else {
                  return of([])
                }
              }),
            ).subscribe((items: any) => control.options = items)
          }
        })

      }

    })

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
      const data = {...this.dynamicForm.value};
      console.log(data)
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

  displayFn(option: IOption): string {
    return option ? option.label : '';
  }

}

export const SelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const item = control?.value
  return typeof item === 'string' ? { selected: true } : null;
}


export const CuitValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const cuit_nro: string = control?.value
  let rv = false

  if (cuit_nro.length === 11) {
    let verificador : number;
    let resultado = 0;
    const codes = "6789456789";
    verificador = parseInt(cuit_nro[cuit_nro.length-1])
    var x = 0;
    while (x < 10)
    {
      let digitoValidador =  parseInt(codes.charAt(x))
      let digito = parseInt(cuit_nro.charAt(x))
      let digitoValidacion = digitoValidador * digito;
      resultado += digitoValidacion;
      x++;
    }
    resultado = resultado % 11;
    rv = (resultado == verificador);

  }

  return rv ? null : { cuit: true };
}

export interface IFormStructure {
  type: string;
  label: string;
  name: string;
  value: string | number | boolean | any;
  options?: IOption[];
  optionsFn?: string;
  validations?: {
    validator: string;
    value?: string | number | boolean;
    message: string;
  }[];
}

export interface IOption {
  label: string;
  value: number | string | boolean;
}
