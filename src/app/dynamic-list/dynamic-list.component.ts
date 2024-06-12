import { Component, effect, inject, input, model } from '@angular/core';
import { DynamicFormComponent, IFormStructure } from "../dynamic-form/dynamic-form.component";
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
    selector: 'app-dynamic-list',
    standalone: true,
    templateUrl: './dynamic-list.component.html',
    styleUrl: './dynamic-list.component.scss',
    imports: [
      MatButtonModule,
      MatIconModule,
      DynamicFormComponent,
      JsonPipe,
      NgxMaskPipe
    ]
})
export class DynamicListComponent {

  //items: any[] = []
  items = model.required<any[]>()

  formStructure = input.required<IFormStructure[]>({alias: 'formStructure'})

  data?: any

  itemEdit?: any

  itemNew = false

  dialog = inject(MatDialog)

  createItem() {
    this.data = undefined
    this.itemNew = true
  }

  removeItem(item: any) {
    this.dialog.open(ConfirmComponent, {
      data: `¿Desea borrar el item ${item.displayName}?`
    }).afterClosed().subscribe(result => {
      if (result) {
        this.items.set(this.items().filter(i => i !== item))
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

  }

  getMaskDisplayName(): string {
    return this.formStructure().filter(c => c.name === 'displayName')[0].mask || ''
  }
}

