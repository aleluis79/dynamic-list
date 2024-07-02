import { CommonModule } from '@angular/common';
import { Component, effect, input, model } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MtxDatetimepicker, MtxDatetimepickerInput, MtxDatetimepickerToggle } from '@ng-matero/extensions/datetimepicker';

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
  styleUrl: './datetimerange.component.scss'
})
export class DatetimerangeComponent {

  control = input.required<string>()

  formGroup = model.required<FormGroup>()
  
  appearance = input<MatFormFieldAppearance>('fill', {alias: 'appearance'})

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
