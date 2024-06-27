import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OptionValue } from '../../comun.service';
import { IFormStructure } from '../../dynamic-form/dynamic-form.service';
import { DynamicFormComponent } from "../../dynamic-form/dynamic-form.component";
import { CommonModule, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-editor',
    standalone: true,
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss',
    imports: [
        CommonModule,
        ClipboardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        DynamicFormComponent,
        JsonPipe,
        FormsModule
    ]
})
export default class EditorComponent {

  typeControl = new FormControl('', [Validators.required]);

  formStructure? : IFormStructure[]

  initialData = [];

  editting = '';

  data : IFormStructure[] = []

  preview = true;

  jsonEdit = false;


  get dataValue () {
    return JSON.stringify(this.data, null, 2);
  }

  set dataValue (v) {
    try{
    this.data = JSON.parse(v);}
    catch(e) {
      console.log('error occored while you were typing the JSON');
    };
  }  

  options: OptionValue[] = [
    { value: 'text', viewValue: 'Texto' },
    { value: 'number', viewValue: 'Número' },
    { value: 'email', viewValue: 'Email' },
    { value: 'password', viewValue: 'Contraseña' },
    { value: 'textarea', viewValue: 'Texto multirenglón' },
    { value: 'select', viewValue: 'Selección' },
    { value: 'radio', viewValue: 'Radio button' },
    { value: 'date', viewValue: 'Fecha' },
    { value: 'daterange', viewValue: 'Fecha rango' },
    { value: 'checkbox', viewValue: 'Checkbox' }
  ]

  borrar(item: any) {
    this.data = this.data.filter((element) => element.name !== item.name)
    this.formPreview =  structuredClone(this.data)
  }

  
  
  edit(item: any) {
    this.editting = item.name
    this.typeControl.setValue(item.type)
    this.initialData = structuredClone(item)
  }

  onChange(event: any) {
    switch (event.value) {
      case 'text':
      case 'number':
      case 'email':
      case 'password':
      case 'textarea':
      case 'date':
      case 'daterange':
      case 'checkbox':
        this.formStructure = structuredClone(this.formText)
        break
      case 'select':
      case 'radio':
        this.formStructure = structuredClone(this.formSelect)
        break
      default:
        break
    }

  }

  refresh() {
    this.formPreview = structuredClone(this.data)
  }

  async process(item: any) {
    if (item) {

      if (this.editting) {
        this.data = await this.data.map((element) => {
          if (element.name === this.editting) {
            element = {type: this.typeControl.value, ...item}
          }
          return element
        })
        this.formPreview = structuredClone(this.data)
        this.editting = ''
        this.initialData = [];
        this.typeControl.setValue('text');
        this.formStructure = structuredClone(this.formText)
      } else {

        let existe = false
        this.data.forEach(element => {
          if (element.name === item.name) {
            existe = true
          }
        });

        if (!existe && item.name !== '') {

            let nuevo = {
              "type": this.typeControl.value!,
              "label": item.label,
              "name": item.name,
              "value": item.value
            }
            if (item.mask) {
              (nuevo as any)["mask"] = item.mask
            }

            if (item.validations) {
              (nuevo as any)["validations"] = item.validations
            }

            if(item.options) {
              (nuevo as any)["options"] = item.options
            }
            
            this.data.push(nuevo);
            this.formPreview = structuredClone(this.data)
            this.initialData = [];

        }
      }
    }
  }


  limpiar() {
    this.data = []
    this.formPreview = structuredClone(this.data)
  }

  subir(index: number) {
    this.data = this.moveUp(this.data, index)
    this.formPreview = structuredClone(this.data)
  }

  bajar(index: number) {
    this.data = this.moveDown(this.data, index)
    this.formPreview = structuredClone(this.data)    
  }

  moveUp<T>(array: T[], index: number): T[] {
    if (index <= 0 || index >= array.length) {
        return array; // No se puede mover el elemento hacia arriba
    }

    const newArray = array.slice();
    const temp = newArray[index];
    newArray[index] = newArray[index - 1];
    newArray[index - 1] = temp;

    return newArray;
  }


  moveDown<T>(array: T[], index: number): T[] {
    if (index < 0 || index >= array.length - 1) {
        return array; // No se puede mover el elemento hacia abajo
    }

    const newArray = array.slice();
    const temp = newArray[index];
    newArray[index] = newArray[index + 1];
    newArray[index + 1] = temp;

    return newArray;
  }


  formPreview : IFormStructure[] =[]


  formOptions : IFormStructure = 
  {
    "type": "list",
    "label": "Opciones",
    "value": "",
    "withCheck": true,
    "name": "options",
    "form": [
      {
        "type": "text",
        "label": "Etiqueta",
        "name": "label",
        "value": ""
      },
      {
        "type": "text",
        "label": "Valor",
        "name": "value",
        "value": ""
      }
    ]
  }

  formValidations : IFormStructure = 
  {
    "type": "list",
    "label": "Validaciones",
    "value": "",
    "withCheck": true,
    "name": "validations",
    "form": [
      {
        "type": "select",
        "label": "Validator",
        "name": "validator",
        "value": "",
        "options": [
          {
            "label": "Requerido",
            "value": "required"
          },
          {
            "label": "Email",
            "value": "email"
          },
          {
            "label": "Patrón",
            "value": "pattern"
          },
          {
            "label": "Longitud mínima",
            "value": "minlength"
          },
          {
            "label": "Longitud máxima",
            "value": "maxlength"
          },
          {
            "label": "Mínimo",
            "value": "min"
          },
          {
            "label": "Máximo",
            "value": "max"
          },
          {
            "label": "Checkeado",
            "value": "requiredTrue"
          },
          {
            "label": "Validador nulo",
            "value": "nullValidator"
          },
          {
            "label": "Seleccionado",
            "value": "selected"
          },
          {
            "label": "CUIT",
            "value": "cuit"
          },
          {
            "label": "CBU",
            "value": "cbu"
          },
          {
            "label": "CVU",
            "value": "cvu"
          }
        ]
      },
      {
        "type": "text",
        "label": "Valor (opcional)",
        "name": "value",
        "value": ""
      },
      {
        "type": "text",
        "label": "Mensaje error",
        "name": "message",
        "value": ""
      }
    ]
  }

  formText : IFormStructure[] = [
    {
      "type": "text",
      "label": "Nombre a mostrar",
      "name": "label",
      "value": ""
    },
    {
      "type": "text",
      "label": "Nombre del componente",
      "name": "name",
      "value": ""
    },
    {
      "type": "text",
      "label": "Valor inicial",
      "name": "value",
      "value": ""
    },
    {
      "type": "text",
      "label": "Máscara",
      "name": "mask",
      "value": ""
    },
    this.formValidations
  ]

  formSelect : IFormStructure[] = [
    {
      "type": "text",
      "label": "Nombre a mostrar",
      "name": "label",
      "value": ""
    },
    {
      "type": "text",
      "label": "Nombre del componente",
      "name": "name",
      "value": ""
    },
    {
      "type": "text",
      "label": "Valor inicial",
      "name": "value",
      "value": ""
    },
    this.formOptions,
    this.formValidations
  ]


}