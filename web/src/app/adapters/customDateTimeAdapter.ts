import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
export class CustomDateTimeAdapter extends NativeDateAdapter {

  override getFirstDayOfWeek() {
    return 1;
  }

  override parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      
      value = value.trim()
      const date = Number(value.slice(0,2));
      const month = Number(value.slice(3,5)) - 1;
      const year = Number(value.slice(6, 10));
      
      const hour = Number(value.slice(11, 13));
      const min = Number(value.slice(14, 16));

      console.log(date, month, year, hour, min)

      return new Date(year, month, date, hour, min);
    }

    const timestamp = typeof value === 'number' ? value : Date.parse(value);

    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: Object): string {

    date = new Date(Date.UTC(
    date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
    date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    //displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
    displayFormat = Object.assign({day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}, { }, { timeZone: 'utc' });

    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
    return dtf.format(date).replace(/[\u200e\u200f]/g, '');
  }

}
