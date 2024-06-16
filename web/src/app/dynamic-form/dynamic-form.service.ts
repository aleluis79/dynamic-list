import { Injectable } from "@angular/core";
import { IOption } from "./dynamic-form.component";

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

