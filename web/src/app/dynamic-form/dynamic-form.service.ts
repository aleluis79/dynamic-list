import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DynamicFormService {

    collections: { [key: string]: IOption[] } = {}

    removeCollection(key: string): void {
        delete this.collections[key];
    }

    addCollection(key: string, value: IOption[]): void {
        this.collections[key] = value;
    }

    getCollection(key: string): IOption[] {
        return this.collections[key];
    }

}

// Structures

export interface IFormStructure {
    type: string;
    label: string;
    name: string;
    value: string | number | boolean | any;
    options?: IOption[];
    optionsRest?: string;
    optionsVar?: string;
    mask?: string;
    withCheck?: boolean;
    form?: IFormStructure[];
    validations?: {
      validator: string;
      value?: string | number | boolean;
      message: string;
    }[];
  }
  
  export interface IOption {
    label: string;
    value: number | string | boolean;
  }
  
