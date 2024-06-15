import { Component, effect, inject, input, model } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NgxMaskPipe } from 'ngx-mask';
import { DynamicFormComponent, IFormStructure } from '../dynamic-form/dynamic-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-dynamic-list',
    standalone: true,
    templateUrl: './dynamic-list.component.html',
    styleUrl: './dynamic-list.component.scss',
    providers: [
        DatePipe
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        JsonPipe,
        NgxMaskPipe,
        MatCheckboxModule,
        DynamicFormComponent
    ]
})
export class DynamicListComponent {

  items = model.required<any[]>()

  formStructure = input.required<IFormStructure[]>({alias: 'formStructure'})

  initialData = model<object | undefined>(undefined, {alias: 'initialData'});

  controlCheck = false

  data?: any = []

  itemEdit?: any

  itemNew = false

  dialog = inject(MatDialog)

  datePipe = inject(DatePipe)

  constructor() {
    effect(() =>  {  
      if (this.initialData() && this.items().length === 0) {
        const items = this.initialData() as object[]
        if (items.length > 0) {
          this.controlCheck = true;
          for (const item of items) {
            this.items().push(item)
          }
        }
      }
    })
  }

  getHeaders() {
    return Object.keys(this.items()[0]);
  }

  getValueDescription(item: any, key: string) {
    let value = item[key]
    if (value && typeof value === 'object' && value['start'] && value['end']) {
      value = this.datePipe.transform(value['start'],'dd/MM/yyyy') + " - " + this.datePipe.transform(value['end'],'dd/MM/yyyy')
    }
    return value
  }

  getMask(key: string): string {
    return this.formStructure().filter(c => c.name === key)[0].mask || ''
  }

  changeCheck() {
    this.controlCheck = !this.controlCheck
    if (!this.controlCheck) {
      this.data = undefined
      this.itemNew = false
      this.itemEdit = undefined
      this.items.set([])
      this.initialData.set(undefined)
    }
  }

  createItem() {
    this.data = undefined
    this.itemNew = true
  }

  removeItem(item: any) {
    this.dialog.open(ConfirmComponent, {
      data: `¿Desea borrar el item?`
    }).afterClosed().subscribe(result => {
      if (result) {
        const itemsSinBorrar = this.items().filter(i => i !== item)
        if (itemsSinBorrar.length === 0) {
          this.initialData.set(undefined)
        }
        this.items.set(itemsSinBorrar)
      }
    })
  }

  editarItem(item: any) {
    this.data = item
    this.itemEdit = item
  }

  process(item: any) {
    if (item) {
      if (this.itemEdit) {
        this.items.set(this.items().map(i => i === this.itemEdit ? item : i))
      } else {
        this.items().push(item)
      }
    }

    this.itemNew = false
    this.itemEdit = undefined
    this.data = undefined

  }

}

