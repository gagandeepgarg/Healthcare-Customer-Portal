import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { DatePipe } from '@angular/common';

// import * as constants from '@core/components/constants';
import * as constants from '../constants/app-constants';

@Injectable()
export class UtilService {
  constants = constants;
  medium = 0;

  datePipe = new DatePipe('en-US');

  passwordStrengthInfo: any = {
    strongRegex: '',
    mediumRegex: '',
    passwordStrength: '',
    strenthbar: '',
    progressval: ''
  };

  documentAndFormClick = new BehaviorSubject<any>(false);
  picUploadNotifier = new BehaviorSubject<any>(false);
  topNavFirstName = new BehaviorSubject<any>(null);
  topNavLastLogin = new BehaviorSubject<any>(null);
  DeleteArchiveConfirmationEvent = new BehaviorSubject<any>(null);
  lastLoginInfo: any = null;
  checkPasswordExpiry: any;

  /**
   * Decode JWT token
   // @param token
   */
  public decodeJwt(token: string) {
    const jwtDecode = require('jwt-decode');
    const decoded = jwtDecode(token);
    return decoded;
  }

  public displayProgressbar(password: string): any {
    this.passwordStrengthInfo.strongRegex = new RegExp(
      this.constants.PASSWORD_REGEX_STRONG
    );
    this.passwordStrengthInfo.mediumRegex = new RegExp(
      this.constants.PASSWORD_REGEX_MEDIUM
    );
    if (this.passwordStrengthInfo.strongRegex.test(password)) {
      this.passwordStrengthInfo.passwordStrength = 'pw-strong';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 100;
    } else if (
      password.length === 14
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 90;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      password.length === 13
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-strong';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 85;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      password.length === 12
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-strong';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 80;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      password.length === 11
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-strong';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 75;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      password.length === 10
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-strong';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 65;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      password.length === 9
    ) {
      if (this.passwordStrengthInfo.mediumRegex.test(password)) {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 55;
      } else {
        this.passwordStrengthInfo.passwordStrength = 'pw-medium';
        this.passwordStrengthInfo.strenthbar = true;
        this.passwordStrengthInfo.progressval = 45;
      }
    } else if (
      this.medium === 1 &&
      !this.passwordStrengthInfo.mediumRegex.test(password) &&
      password.length === 8
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-weak';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 48;
    } else if (this.passwordStrengthInfo.mediumRegex.test(password)) {
      this.medium = 1;
      this.passwordStrengthInfo.passwordStrength = 'pw-medium';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 52;
    } else if (
      password.length === 7 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-weak')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-weak';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 45;
    } else if (
      password.length === 6 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-weak')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 42;
    } else if (
      password.length === 5 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-weak')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 40;
    } else if (
      password.length === 4 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-weak')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.strenthbar = true;
      this.passwordStrengthInfo.progressval = 35;
    } else if (
      password.length === 3 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-none')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.progressval = 30;
      this.passwordStrengthInfo.strenthbar = true;
    } else if (
      password.length === 2 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-none')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.progressval = 20;
      this.passwordStrengthInfo.strenthbar = true;
    } else if (
      password.length === 1 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-none')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.progressval = 10;
      this.passwordStrengthInfo.strenthbar = true;
    } else if (
      password.length === 0 &&
      (this.passwordStrengthInfo.passwordStrength = 'pw-none')
    ) {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.progressval = 0;
      this.passwordStrengthInfo.strenthbar = false;
    } else {
      this.passwordStrengthInfo.passwordStrength = 'pw-none';
      this.passwordStrengthInfo.strenthbar = true;
    }
    return this.passwordStrengthInfo;
  }

  checkPasswordValidation(enteredPassword: string) {
    const strongRegex = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,15})'
    );
    return strongRegex.test(enteredPassword) ? true : false;
  }
  setdocumentAndFormClick(status: any) {
    this.documentAndFormClick.next(status);
  }
  settopNavFirstName(firstName: any) {
    this.topNavFirstName.next(firstName);
  }
  settopNavLastLogin(lastLogin: any) {
    this.topNavLastLogin.next(lastLogin);
  }
  setDeleteArchiveConfirmationEvent(confirm: any) {
    this.DeleteArchiveConfirmationEvent.next(confirm);
  }

  removeSpecialCharsAndWhiteSpace(str: string) {
    if (str) {
      return str
        .trim()
        .replace('(', '')
        .replace(')', '')
        .replace('-', '')
        .replace(' ', '');
    } else {
      return '';
    }
  }

  // Restricting few special chars
  validatePasswordCharacters(event: any) {
    if (
      event.keyCode === 219 || // handles { and [
      event.keyCode === 221 || // handles } and ]
      event.keyCode === 187 || // handles + and =
      event.keyCode === 192 || // handles ` and ~
      event.keyCode === 222 || // handles " and '
      event.keyCode === 186 || // handles ; and :
      event.keyCode === 188 || // handles < and ,
      event.keyCode === 190 || // handles > and .
      event.keyCode === 191 || // handles ? and /
      event.keyCode === 220 || // handles | and \
      event.keyCode === 111 || // handles /
      event.keyCode === 110 || // handles .
      event.keyCode === 107 || // handles +
      event.keyCode === 32 || // handles space
      event.key === '(' ||
      event.key === ')'
    ) {
      event.preventDefault();
    }
  }

  isLeapYear(year) {
    var d = new Date(year, 1, 28);
    d.setDate(d.getDate() + 1);
    return d.getMonth() == 1;
  }

  getAge(date) {
    var d = new Date(date),
        now = new Date();
    var years = now.getFullYear() - d.getFullYear();
    d.setFullYear(d.getFullYear() + years);
    if (d > now) {
        years--;
        d.setFullYear(d.getFullYear() - 1);
    }
    var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
    return years + days / (this.isLeapYear(now.getFullYear()) ? 366 : 365);
  }
}
