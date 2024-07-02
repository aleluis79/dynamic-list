import { ApplicationConfig, ErrorHandler, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { CustomErrorHandler } from './CustomErrorHandler';
import { globalHttpErrorInterceptor } from './globalHttpErrorInterceptor';
import { provideNativeDatetimeAdapter } from '@ng-matero/extensions/core';
import { CustomDateTimeAdapter } from './adapters/customDateTimeAdapter';

registerLocaleData(localeEsAr, 'es-ar');

export const CUSTOM_DATE_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([globalHttpErrorInterceptor])),
    provideEnvironmentNgxMask(),
    provideNativeDatetimeAdapter(),
    { provide: DateAdapter, useClass: CustomDateTimeAdapter },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT },
  ]
};
