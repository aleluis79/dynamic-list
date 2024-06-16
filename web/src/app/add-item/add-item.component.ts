import { Component, inject } from '@angular/core';
import { DynamicFormComponent, IFormStructure } from '../dynamic-form/dynamic-form.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  process(item: any) {
    this.dialogRef.close(item)
  }

}

export interface DialogData {
  formStructure: IFormStructure[],
  initialData: object,
  title: string
}
