import { AbstractControl } from '@angular/forms';
import { RegexConstants } from '../constants/regex-constants';
export function validateEmail(control: AbstractControl) {
  const re = RegexConstants.EmailId;
  let valid = true;
  valid = re.test(String(control.value).toLowerCase());
  if (!valid) {
    return { Invalid_Email: true };
  }
  return null;
}