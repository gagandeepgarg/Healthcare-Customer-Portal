import { RegexConstants } from '../constants/regex-constants';

export function validatePhoneNumber(event: any): number {
  event.target.value = event.target.value.trim();
  if (isNaN(event.target.value)) {
    event.target.value = event.target.value.replace(RegexConstants.PhoneNumber, '');
    return event.target.value;
  }
}