import { CommonModule } from '@angular/common';
import { Component, effect, input, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDatetimeAdapter } from '@ng-matero/extensions/core';
import { MtxDatetimepicker, MtxDatetimepickerInput, MtxDatetimepickerToggle } from '@ng-matero/extensions/datetimepicker';

import { DateAdapter } from '@angular/material/core';
import { CustomDateTimeAdapter } from '../adapters/customDateTimeAdapter';

@Component({
  selector: 'app-datetimerange',
  standalone: true,
  imports: [
    MtxDatetimepicker,
    MtxDatetimepickerInput,
    MtxDatetimepickerToggle,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './datetimerange.component.html',
  styleUrl: './datetimerange.component.scss',
  providers: [
    provideNativeDatetimeAdapter(),
    { provide: DateAdapter, useClass: CustomDateTimeAdapter }
  ]
})
export class DatetimerangeComponent {

  control = input.required<string>()

  formGroup = model.required<FormGroup>()

  start = new FormControl();

  end = new FormControl();

  constructor() {
    effect(() => {
      let aux = this.formGroup().get(this.control())?.value
      if (!aux) return
      if (typeof aux !== 'string') {
        const {start, end} = aux || {}
        if (!start || !end) return
        this.start.setValue(new Date(start))
        this.end.setValue(new Date(end))
      } else {        
        aux = JSON.parse(aux) || {}
        if (!aux?.start || !aux?.end) return
        const {start, end} = aux
        if ( !start || !end) return
        this.start.setValue(new Date(start))
        this.end.setValue(new Date(end))
      }

      //{"start":"2024-07-01T03:00:00.000Z","end":"2024-07-02T03:00:00.000Z"}
    })
  }


  selected() {
    this.formGroup().get(this.control())?.setValue({start: this.start.value, end: this.end.value}, {emitEvent: true})
    
    if (!this.start.valid || !this.end.valid || !this.start.value || !this.end.value) {
      this.formGroup().get(this.control())?.setErrors(['error'], {emitEvent: true})
    }

    if (this.start.value > this.end.value) {
      this.formGroup().get(this.control())?.setErrors(['error'], {emitEvent: true})
    }
    
  }

  hasError() {
    return this.formGroup().get(this.control())?.invalid && this.formGroup().get(this.control())?.touched
  }

}
