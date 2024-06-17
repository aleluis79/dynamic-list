import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { NgZone, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { retry, timer, catchError, throwError } from "rxjs";

export const globalHttpErrorInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {

    const zone = inject(NgZone);
    const snackbar = inject(MatSnackBar);

    return next(req).pipe(
        retry({
            count: 3,
            delay: (_, retryCount) => timer(retryCount * 1000),
        }),
        catchError(err => {
            console.log('Error handled by HTTP interceptor...');
            zone.run(() => {
                snackbar.open(
                    'Se detectó un error inesperado, por favor contacte con el administrador',
                    'Close',
                    {
                    duration: 3000
                    }
                );
            })
            return throwError(() => {
                console.log('Error rethrown by HTTP interceptor');
                return err;
            });
        })
    )
}
