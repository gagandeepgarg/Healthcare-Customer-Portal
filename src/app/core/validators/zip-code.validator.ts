import { AbstractControl } from '@angular/forms';
import { RegexConstants } from '../constants/regex-constants';

export function validateZipCode(control: AbstractControl) {
  const re = RegexConstants.Zipcode;
  let valid = true;
  if (!(control.value.toString().length > 9)) {
    valid = re.test(String(control.value).toLowerCase());
    if (!valid) {
      return { Invalid_Email: true };
    }
  }
  return null;
}