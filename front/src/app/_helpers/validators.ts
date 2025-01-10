import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nameRegex = /^[a-zA-Z]+[-\s]?[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/;
      const forbidden = nameRegex.test(control.value);
      return forbidden ? null: { 'nameValidator': true };
    };
  }