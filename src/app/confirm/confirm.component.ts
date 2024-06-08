import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  constructor(public dialogo: MatDialogRef<ConfirmComponent>,@Inject(MAT_DIALOG_DATA) public mensaje: string) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

}
