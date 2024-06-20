import { Component, inject, signal } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFormStructure } from '../dynamic-form/dynamic-form.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DynamicFormComponent
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {

  readonly dialogRef = inject(MatDialogRef<AddItemComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  error = signal('')

  process(item: any) {
    if (!this.exists(item)) {
      this.dialogRef.close(item)
    } else {
      this.error.set('El elemento ya existe')
    }
  }

  exists(newItem: any) : boolean {
    
    // No hay items en la lista, por lo tanto no existe
    if (!this.data.items || this.data.items.length === 0) {
      return false
    }

    // El item es el mismo que el inicial, por lo tanto no existe
    if (this.data.initialData && JSON.stringify(this.data.initialData) === JSON.stringify(newItem)) {
      return false
    }

    // El item ya existe en la lista, por lo tanto no tengo que agregarlo
    for (const item of this.data.items) {
      if (JSON.stringify(item) === JSON.stringify(newItem)) {
        return true
      }
    }
    return false
  }

}

export interface DialogData {
  formStructure: IFormStructure[],
  initialData: object,
  items: any[],
  title: string
}
