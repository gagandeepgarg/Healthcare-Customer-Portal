import { AbstractControl } from '@angular/forms';
export function validateBlankSpace(control: AbstractControl) {
  let valid = true;
  valid = String(control.value).trim().length > 0;
  if (!valid) {
    return { Invalid_RequiredField: true };
  }
  return null;
}
