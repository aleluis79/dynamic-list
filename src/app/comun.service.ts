import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


const options: OptionValue[] = [
  { value: '1', viewValue: 'One' },
  { value: '2', viewValue: 'Two' },
  { value: '3', viewValue: 'Three' },
  { value: '4', viewValue: 'Four' },
  { value: '5', viewValue: 'Five' },
  { value: '6', viewValue: 'Six' },
  { value: '7', viewValue: 'Seven' },
  { value: '8', viewValue: 'Eight' },
  { value: '9', viewValue: 'Nine' },
  { value: '10', viewValue: 'Ten' },
  { value: '11', viewValue: 'Eleven' },
  { value: '12', viewValue: 'Twelve' },
  { value: '13', viewValue: 'Thirteen' },
  { value: '14', viewValue: 'Fourteen' },
  { value: '15', viewValue: 'Fifteen' },
  { value: '16', viewValue: 'Sixteen' },
  { value: '17', viewValue: 'Seventeen' },
  { value: '18', viewValue: 'Eighteen' },
  { value: '19', viewValue: 'Nineteen' },
  { value: '20', viewValue: 'Twenty' },
  { value: '21', viewValue: 'Twenty One' },
  { value: '22', viewValue: 'Twenty Two' },
  { value: '23', viewValue: 'Twenty Three' }
];

const countryOptions: OptionValue[] = [
  { value: '1', viewValue: 'Colombia' },
  { value: '2', viewValue: 'Espana' },
  { value: '3', viewValue: 'Peru' },
  { value: '4', viewValue: 'Chile' },
  { value: '5', viewValue: 'Brasil' },
  { value: '6', viewValue: 'Argentina' },
  { value: '7', viewValue: 'Venezuela' },
  { value: '8', viewValue: 'Uruguay' },
  { value: '9', viewValue: 'Paraguay' },
  { value: '10', viewValue: 'Bolivia' },
  { value: '11', viewValue: 'Ecuador' }
]

@Injectable({
  providedIn: 'root'
})
export class ComunService {


  getOptions(filter: string): Observable<OptionValue[]> {
    if (filter) {
      return of(options.filter(option => option.viewValue.toLowerCase().includes(filter.toLowerCase())));
    } else {
      return of(options);
    }
  }

  getTopOptions(): Observable<OptionValue[]> {
    return of(options.slice(0, 3));
  }

  getCountryOptions(filter: string): Observable<OptionValue[]> {
    if (filter) {
      return of(countryOptions.filter(option => option.viewValue.toLowerCase().includes(filter.toLowerCase())));
    } else {
      return of(countryOptions);
    }
  }

  getCountryTopOptions(): Observable<OptionValue[]> {
    return of(countryOptions.slice(0, 3));
  }
}

export interface OptionValue {
  value: string;
  viewValue: string;
}
