import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }

  handleError(error: unknown) {
    this.zone.run(() => {
      this.snackbar.open(
        'Se detectó un error inesperado, por favor contacte con el administrador',
        'Close',
        {
          duration: 3000
        }
      );
    })
    console.warn(`Caught by Custom Error Handler: `, error);
  }
}
