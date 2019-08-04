import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { RegistrationService } from '@modules/member-registration/services/registration.service';
import * as constants from '@core/constants/app-constants';
import { MemberRegistrationComponent } from '../member-registration/member-registration.component';
import { RoutesConstants } from '@core/constants/route-constants';
import { Router } from '@angular/router';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-member-personalinfo',
  templateUrl: '../member-personalinfo/Member-PersonalInfo.html',
  styleUrls: ['../member-personalinfo/Member-PersonalInfo.scss']
})
export class MemberPersonalInfoComponent implements OnInit {
  @Output() childevent = new EventEmitter();
  @Input() backClicked: boolean;
  public maxDate;
  errorText = '';
  memberPersonalInfo: FormGroup;
  memberIdCheckbox = '0';
  memberIdError = false;
  DOBError = false;
  error: boolean;
  errorMemID: boolean;
  errorfirstName: boolean;
  errorLastName: boolean;
  errorDob: boolean;
  errorZipCode: boolean;
  errorEmail: boolean;
  yearRange: string;
  minYear = '1900';
  isSubmitted: boolean;

  constructor(
    private registerationService: RegistrationService,
    private parentComp: MemberRegistrationComponent,
    private router: Router, private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    this.maxDate = currentDate;
    this.yearRange =
      this.minYear.toString() + ':' + currentDate.getFullYear().toString();
    this.CreatePersonalInfoForm();
    this.LoadFormData();
  }

  CreatePersonalInfoForm() {
    this.memberPersonalInfo = new FormGroup({
      externalId: new FormControl('', [
        Validators.required,
        this.checkMemberIDSpecialCharacterValidator()
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      dob: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, this.validateZipCode]),
      email: new FormControl('', [Validators.required, this.validateEmail]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ])
    });
  }
  LoadFormData() {
    if (this.backClicked) {
      const personalInfoDataObj: any = JSON.parse(
        sessionStorage.getItem('PersonalInfoData')
      );
      this.memberPersonalInfo.patchValue({
        externalId: personalInfoDataObj.externalId,
        firstName: personalInfoDataObj.firstName,
        lastName: personalInfoDataObj.lastName,
        dob: new Date(personalInfoDataObj.dob),
        zipCode: personalInfoDataObj.zipCode,
        PhoneNumber: personalInfoDataObj.PhoneNumber,
        email: personalInfoDataObj.email
      });
    }
  }
  validateNumber(event) {
    return this.parentComp.validateNumber(event);
  }

  validatePhoneNumberEntry(event) {
    return this.parentComp.validateNumber(event);
  }

  checkMemberIDSpecialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      {
        const re = RegexConstants.SpecialChars;
        let valid = true;
        valid = re.test(String(control.value).toLowerCase());
        if (control.value && !valid) {
          return { isUserNameHasSpecialCharacter: true };
        }
        return null;
      }
    };
  }

  onSubmitValidate() {
    const externalId = this.memberPersonalInfo.get('externalId');
    const dob = this.memberPersonalInfo.get('dob');
    if (externalId.value === '') {
      this.errorMemID = true;
      externalId.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorMemID = true;
        } else {
          this.errorMemID = false;
        }
      });
    }
    const firstName = this.memberPersonalInfo.get('firstName');
    if (firstName.value === '') {
      this.errorfirstName = true;
      firstName.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorfirstName = true;
        } else {
          this.errorfirstName = false;
        }
      });
    }

    if (dob.value === '' || dob.value === null) {
      this.errorDob = true;
      dob.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorDob = true;
        } else {
          this.errorDob = false;
        }
      });
    }
    const lastName = this.memberPersonalInfo.get('lastName');
    if (lastName.value === '') {
      this.errorLastName = true;
      lastName.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorLastName = true;
        } else {
          this.errorLastName = false;
        }
      });
    }
    const zipCode = this.memberPersonalInfo.get('zipCode');
    if (zipCode.value === '') {
      this.errorZipCode = true;
      zipCode.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorZipCode = true;
        } else {
          this.errorZipCode = false;
        }
      });
    }
    const email = this.memberPersonalInfo.get('email');
    if (email.value === '') {
      this.errorEmail = true;
      email.valueChanges.subscribe(val => {
        if (val === null) {
          this.errorEmail = true;
        } else {
          this.errorEmail = false;
        }
      });
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    this.onSubmitValidate();
    if (this.errorEmail || this.errorZipCode || this.errorLastName || this.errorDob || this.errorfirstName || this.errorMemID) {
      this.errorText = constants.MANDATORY_FIELDS;
      return;
    } else if (this.memberPersonalInfo.invalid) {
      this.errorText = '';
      return;
    }
    const personalInfoObj = this.memberPersonalInfo.value;
    personalInfoObj.dob = this.convertDate(
      this.memberPersonalInfo.get('dob').value
    );
    this.registerationService.VerifyMember(personalInfoObj).subscribe(res => {
      this.errorText = '';
      switch (res) {
        case 6000: {
          this.errorText = constants.MEMBER_ALREADY_REGISTERED;
          this.memberIdError = true;
          this.DOBError = false;
          break;
        }
        case 6003: {
          this.errorText = constants.MEMBER_INVALID_DETAILS;
          this.memberIdError = true;
          this.DOBError = true;
          break;
        }
        case 6002: {
          this.errorText = constants.INVALID_MEMBERID;
          this.memberIdError = true;
          this.DOBError = false;
          break;
        }
        // Successfully Verified all the fields
        case 6004: {
          this.memberIdError = false;
          this.DOBError = false;
          this.errorText = '';
          sessionStorage.setItem(
            'PersonalInfoData',
            JSON.stringify(personalInfoObj)
          );
          this.CreateObject(true, false, false);
          this.childevent.emit();
          break;
        }
        // InvalidPhoneNumber
        case 8010: {
          this.openConfirmationDialog(res, personalInfoObj);
          break;
        }
        // InvalidEmailId
        case 8011: {
          this.openConfirmationDialog(res, personalInfoObj);
          break;
        }
        //  InvalidEmailIdAndPhoneNumber
        case 8012: {
          this.openConfirmationDialog(res, personalInfoObj);
          break;
        }
        // PhoneNumberNullAndInvalidEmailId
        case 8013: {
          this.openConfirmationDialog(res, personalInfoObj);
          break;
        }
        // EmailIdNullAndInvalidPhoneNumber
        case 8014: {
          this.openConfirmationDialog(res, personalInfoObj);
          break;
        }
        // PhoneNumberNull
        case 8015: {
          this.CreateObject(true, false, true);
          this.memberIdError = false;
          this.DOBError = false;
          this.errorText = '';
          sessionStorage.setItem(
            'PersonalInfoData',
            JSON.stringify(personalInfoObj)
          );
          this.childevent.emit();
          break;
        }
        // EmailIdNull
        case 8016: {
          this.CreateObject(true, true, false);
          this.memberIdError = false;
          this.DOBError = false;
          this.errorText = '';
          sessionStorage.setItem(
            'PersonalInfoData',
            JSON.stringify(personalInfoObj)
          );
          this.childevent.emit();
          break;
        }
        // EmailIdAndPhoneNumberAreNull
        case 8017: {
          this.CreateObject(true, true, true);
          this.memberIdError = false;
          this.DOBError = false;
          this.errorText = '';
          sessionStorage.setItem(
            'PersonalInfoData',
            JSON.stringify(personalInfoObj)
          );
          this.childevent.emit();
          break;
        }
        default: {
          this.CreateObject(true, false, false);
          this.memberIdError = false;
          this.DOBError = false;
          this.errorText = '';
          sessionStorage.setItem(
            'PersonalInfoData',
            JSON.stringify(personalInfoObj)
          );
          break;
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  validateEmail(control: AbstractControl) {
    const re = RegexConstants.EmailId;
    let valid = true;
    valid = re.test(String(control.value).toLowerCase());
    if (!valid) {
      return { Invalid_Email: true };
    }
    return null;
  }
  validateZipCode(control: AbstractControl) {
    const re = RegexConstants.Zipcode;
    let valid = true;
    if (!(control.value.toString().length > 9)) {
      valid = re.test(String(control.value).toLowerCase());
      if (!valid) {
        return { Invalid_ZipCode: true };
      }
    }
    return null;
  }
  LimitZipCode(event: any) {
    event.target.value = event.target.value;
    if (event.target.value.toString().length > 9) {
      event.target.value = parseInt(
        event.target.value.toString().substring(0, 9),
        10
      );
    }
  }
  convertDate(date) {
    date = date.toLocaleDateString('en-US');
    const d = new Date(date),
      mnth = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2);
    return [d.getFullYear(), mnth, day].join('/');
  }

  NavigateT0Login() {
    this.router.navigate(['/' + RoutesConstants.Login]);
  }

  openConfirmationDialog(status, obj) {
    let showMessage: any;
    switch (status) {
      case 8010:
      case 8014: {
        showMessage = 'Input Phone Number does not match with your existing record in system.' +
          'Would you like us to update the record with the new Phone number ?';
        this.callConfirmationService(showMessage, status, obj);
        break;
      }
      case 8011:
      case 8013: {
        showMessage = 'Input Email ID does not match with your existing record in system.' +
          'Would you like us to update the record with the new Email ID ?';
        this.callConfirmationService(showMessage, status, obj);
        break;
      }
      case 8012: {
        showMessage = 'Input Phone Number and Email ID does not match with your existing record in system.' +
          'Would you like us to update the record with the new Phone Number and Email ID ?';
        this.callConfirmationService(showMessage, status, obj);
        break;
      }
      default:
        break;
    }

  }

  callConfirmationService(showMessage, status, obj) {
    this.confirmationService.confirm({
      message: showMessage,
      header: 'Confirmation',
      key: 'ConfirmationForPersonalInfo',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.memberIdError = false;
        this.DOBError = false;
        this.errorText = '';
        sessionStorage.setItem(
          'PersonalInfoData',
          JSON.stringify(obj)
        );
        switch (status) {
          case 8010:
          case 8011:
          case 8012: {
            this.CreateObject(true, false, false);
            break;
          }
          case 8013: {
            this.CreateObject(true, false, true);
            break;
          }
          case 8014: {
            this.CreateObject(true, true, false);
            break;
          }
          default:
            break;
        }
        this.childevent.emit();
      },
      reject: () => {
        this.memberIdError = false;
        this.DOBError = false;
        this.errorText = '';
      }
    });
  }

  CreateObject(isUpdateToAdmin123, isEmailNotFound, isPhoneNumberNotFound) {
    let saveObj: any;

    saveObj = {
      UpdateToAdmin123: isUpdateToAdmin123,
      EmailNotFound: isEmailNotFound,
      PhoneNumberNotFound: isPhoneNumberNotFound,
    };
    sessionStorage.setItem('ConfirmationCall', JSON.stringify(saveObj));
  }
}
