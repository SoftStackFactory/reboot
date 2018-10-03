import { AbstractControl } from '@angular/forms'

export const PasswordValidator = (control: AbstractControl): {[key: string]: boolean} => {
    const password = control.get('password');
    const passwordCheck = control.get('passwordCheck');
    if (!password || !passwordCheck) {
      return null;
    }
    return password.value === passwordCheck.value ? null : { nomatch: true };
  };
/*
import { FormControl, FormGroup } from '@angular/forms';

export class PasswordValidator {

  static areEqual(formGroup: FormGroup) {
    let val;
    let valid = true;

    for (let key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        let control: FormControl = <FormControl>formGroup.controls[key];

        if (val === undefined) {
          val = control.value
        } else {
          if (val !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
}
*/