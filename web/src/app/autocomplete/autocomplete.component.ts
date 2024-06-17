import { Component, effect, input, output } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { OptionValue } from '../comun.service';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {

  searchMinChars = 3

  title = input.required<string>();

  disabled = input<boolean>(false);

  optionFn = input.required<(args: string) => Observable<OptionValue[]>>();

  optionTopFn = input<() => Observable<OptionValue[]>>();

  changeValue = output<string>()

  myControl = new FormControl('', [Validators.required, SelectionRequiredValidator]);
  filteredOptions?: Observable<OptionValue[]>;



  constructor() {

    effect(() => {
      if (this.disabled()) {
        this.myControl.disable();
      } else {
        this.myControl.enable();
      }
    })

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        if ((value || '')?.length >= this.searchMinChars) {
          return this.optionFn()(value?.toLowerCase() || '')
        } else if (value?.length == 0 && this.optionTopFn()) {
          return this.optionTopFn()!()
        } else {
          return of([])
        }
      }),
    );
  }

  ngAfterViewInit() {
    this.myControl.setValue('', {emitEvent: true});
  }


  autocompleteDisplay(option: OptionValue): string {
    return option ? option.viewValue : '';
  }

  getErrorMessage() {
    if (this.myControl.hasError('required')) {
      return 'Requerido';
    }
    return this.myControl.hasError('matchRequired') ? 'Debe seleccionar una opción' : '';
  }

  onSelectionChange(option: OptionValue) {
    this.changeValue.emit(option.value)
  }

}


export const SelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  const item = control?.value
  return typeof item === 'string' ? { matchRequired: true } : null;

}


