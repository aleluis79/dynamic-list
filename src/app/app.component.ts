import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutocompleteComponent } from "./autocomplete/autocomplete.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ComunService } from './comun.service';
import { of } from 'rxjs';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { IFormStructure } from './dynamic-form/dynamic-form.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        AutocompleteComponent,
        MatFormFieldModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicListComponent
    ]
})
export class AppComponent {

  title = 'angular18';

  comunSvc = inject(ComunService)

  items: any[] = []

  formStructure: IFormStructure[] = []

  tipoRequerimiento = ''

  onChange(event: string) {
    this.items = []
    this.formStructure = []
    this.tipoRequerimiento = event
    if (event == '1') {
      //setTimeout(() => this.formStructure = this.formStructure1, 100)
      this.formStructure = [...this.formStructure1]
    } else if (event == '2') {
      //setTimeout(() => this.formStructure = this.formStructure2, 100)
      this.formStructure = [...this.formStructure2]
    }
  }

  getOptions(filter: string) {
    return of([
      { value: '1', viewValue: 'Oficio - Requerimiento por Alias' },
      { value: '2', viewValue: 'Oficio - Requerimiento por CUIL/CUIT' },
    ].filter(option => option.viewValue.toLowerCase().includes(filter.toLowerCase())));
  }

  show() {

    const rta = {
      tipoRequerimiento: this.tipoRequerimiento,
      items: this.items
    }

    console.log(JSON.stringify(rta))
  }

  reset() {
    this.items = []
    this.formStructure = []
    this.tipoRequerimiento = ''
  }

  formStructure1 = [
    {
      "type": "text",
      "label": "Alias",
      "name": "displayName",
      "value": "",
      "mask": "000.000.000",
      "validations": [
        {
          "validator": "required",
          "message": "El alias es requerido"
        }
      ]
    },
    {
      "type": "text",
      "label": "IPP",
      "name": "ipp",
      "value": "",
      "mask": "00-00000-0",
      "validations": [
        {
          "validator": "required",
          "message": "La IPP es requerido"
        },
        {
          "validator": "pattern",
          "value": "^[0-9]{8}$",
          "message": "La IPP no es valida",
        }
      ]
    },
    {
      "type": "daterange",
      "label": "Fecha Alias",
      "name": "fechaAlias",
      "value": "",
      "validations": [
        {
          "validator": "required",
          "message": "La fecha es requerida"
        }
      ]
    }
  ]

  formStructure2 = [
    {
      "type": "text",
      "label": "Cuil/Cuit",
      "name": "displayName",
      "value": "",
      "mask": "00-00000000-0",
      "validations": [
        {
          "validator": "required",
          "message": "El Cuil/Cuit es requerido"
        },
        {
          "validator": "pattern",
          "value": "^[0-9]{11}$",
          "message": "El Cuil/Cuit no es valido",
        },
        {
          "validator": "cuit",
          "message": "Cuil/Cuit error de verificación",
        },
      ]
    },
    {
      "type": "text",
      "label": "CBU",
      "name": "cbu",
      "value": "",
      "validations": [
        {
          "validator": "required",
          "message": "El CBU es requerido"
        },
        {
          "validator": "pattern",
          "value": "^[0-9]{22}$",
          "message": "El CBU no es valido",
        },
        {
          "validator": "cbu",
          "message": "CBU error de verificación",
        },
      ]
    },
    {
      "type": "date",
      "label": "Fecha cuit",
      "name": "fechaCuit",
      "value": "",
      "validations": [
        {
          "validator": "required",
          "message": "La fecha es requerida"
        }
      ]
    }
  ]


}
