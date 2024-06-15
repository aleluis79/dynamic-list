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
import { NgxMaskDirective } from 'ngx-mask';
import { DynamicListComponent } from '../dynamic-list/dynamic-list.component';
import { D } from '@angular/cdk/keycodes';

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
    DynamicListComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {

  private $destroy = new Subject<void>();

  formStructure = input.required<IFormStructure[]>({alias: 'formStructure'});

  initialData = input.required<object | undefined>({alias: 'initialData'});

  urlApi = input<string>('', {alias: 'urlApi'});

  dataResult = output<any>({alias: 'submitForm'});

  dynamicForm!: FormGroup

  lists : { [key: string]: any[] } = {}

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
              if (validation.validator === 'cbu') controlValidators.push(CBUValidator);
              if (validation.validator === 'cvu') controlValidators.push(CVUValidator);
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
            if (control.type !== 'list') {
              formGroup[control.name] = [control.value == undefined ? '' : control.value, controlValidators];
            }
          }


          if (control.type === 'list') {
            this.lists[control.name] = []
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

  getData(name: string): any {
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

  displayFn(option: IOption): string {
    return option ? option.label : '';
  }

}

export const SelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const item = control?.value
  return typeof item === 'string' ? { selected: true } : null;
}


export const CuitValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  // Eliminar cualquier carácter no numérico
  const cuitCuilNumerico = control?.value.replace(/\D/g, '');

  // Verificar que la longitud sea 11
  if (cuitCuilNumerico.length !== 11) {
      return { cuit: true };
  }

  // Convertir a un array de números
  const cuitCuilArray = cuitCuilNumerico.split('').map(Number);

  // Coeficientes según la posición
  const coeficientes = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  // Calcular el número verificador
  const verificador = cuitCuilArray[10];
  const suma = cuitCuilArray.slice(0, 10).reduce((acc: number, num: number, index: number) => acc + num * coeficientes[index], 0);
  const resto = suma % 11;
  const digitoCalculado = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;

  // Verificar el dígito calculado con el dígito verificador
  return digitoCalculado === verificador ? null : { cuit: true };

}

export const CBUValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return validarCBU(control?.value) ? null : { cbu: true };
}

export const CVUValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return validarCBU(control?.value) ? null : { cvu: true };
}

function validarCBU(cbu: string) {
  if (cbu.length != 22) { return false }
  return validarCodigoBanco(cbu.slice(0,8)) && validarCuenta(cbu.slice(8,22))
}

function validarCodigoBanco(codigo: string) {
 if (codigo.length != 8) { return false }
 var banco = codigo.slice(0,3)

 var sucursal = codigo.slice(3,7)
 var digitoVerificador2 = codigo[7]

 var suma = parseInt(banco[0]) * 7 + parseInt(banco[1]) * 1 + parseInt(banco[2]) * 3 + parseInt(sucursal[0]) * 9 + parseInt(sucursal[1]) * 7 + parseInt(sucursal[2]) * 1 + parseInt(sucursal[3]) * 3

 var diferencia = 10 - (suma % 10)

 if(parseInt(digitoVerificador2)!=0 && diferencia == parseInt(digitoVerificador2)) return true;
 if(parseInt(digitoVerificador2)==0 && diferencia == 10) return true;

 return false;
}

function validarCuenta(cuenta: string) {
 if (cuenta.length != 14) { return false }
 var digitoVerificador = parseInt(cuenta[13])
 var suma = parseInt(cuenta[0]) * 3 + parseInt(cuenta[1]) * 9 + parseInt(cuenta[2]) * 7 + parseInt(cuenta[3]) * 1 + parseInt(cuenta[4]) * 3 + parseInt(cuenta[5]) * 9 + parseInt(cuenta[6]) * 7 + parseInt(cuenta[7]) * 1 + parseInt(cuenta[8]) * 3 + parseInt(cuenta[9]) * 9 + parseInt(cuenta[10]) * 7 + parseInt(cuenta[11]) * 1 + parseInt(cuenta[12]) * 3
 var diferencia = 10 - (suma % 10)

 if(digitoVerificador!=0 && diferencia == digitoVerificador) return true;
 if(digitoVerificador==0 && diferencia == 10) return true;

 return false;

}


export interface IFormStructure {
  type: string;
  label: string;
  name: string;
  value: string | number | boolean | any;
  options?: IOption[];
  optionsFn?: string;
  mask?: string;
  form?: IFormStructure[];
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
