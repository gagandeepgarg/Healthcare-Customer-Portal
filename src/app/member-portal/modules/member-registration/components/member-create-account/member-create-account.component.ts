import {
  Component,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { RegistrationService } from '@modules/member-registration/services/registration.service';
import * as constants from '@core/constants/app-constants';
import { LocalStoreService } from '@core/services/local-storage.service';
import { UtilService } from '@core/services/util.service';
import { timer } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { MemberRegistrationComponent } from '../member-registration/member-registration.component';
import { AuthRouteService } from '@core/services/auth.service';
import { OTPModeValues } from '@app/core/enums/enum';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-member-create-account',
  templateUrl: './member-create-account.component.html',
  styleUrls: ['./member-create-account.component.scss']
})
export class MemberCreateAccountComponent implements OnInit {
  @Output() childevent = new EventEmitter();
  @Output() backEvent = new EventEmitter();
  errorText = '';
  constants = constants;
  memberCreateAcountInfo: FormGroup;
  memberCreateAcountInfo2: FormGroup;
  isPasswordValid = true;
  isSubmitted = false;
  isUserNameAvailable = false;
  isCheckAvailabilityClicked = false;
  isUserNameEntred = true;
  timeLeft = 60;
  otpLabelTimer = 60;
  otpButtonLabel = 'Send OTP for Verification';
  questions: SelectItem[];
  questions1: SelectItem[];
  questions2: SelectItem[];
  questions3: SelectItem[];
  pastenotallowed: boolean;
  personalInfoDataObj: any;
  userObj: any;
  customErrors: any;
  passwordStrengthInfo: any = {
    strongRegex: '',
    mediumRegex: '',
    passwordStrength: '',
    strenthbar: '',
    progressval: ''
  };
  iAgreeCheckedMessage = false;
  iAgreeChecked = false;
  sentforOTP: boolean;
  otpText: string;
  otpVerfied = false;
  otpTextSuccess: string;
  OtperrorText: string;
  otpTimerSubscription: any;

  constructor(
    private registerationService: RegistrationService,
    private authService: AuthRouteService,
    public utilService: UtilService,
    private parentComp: MemberRegistrationComponent
  ) { }

  ngOnInit() {
    this.personalInfoDataObj = JSON.parse(
      sessionStorage.getItem('PersonalInfoData')
    );
    this.registerationService.GetSecurityQuestions().subscribe(res => {
      const quest: any = res;
      if (quest && quest.length > 0) {
        this.questions = quest.map(function (elm) {
          return {
            value: elm['SecurityQuestionId'],
            label: elm['SecurityQuestion']
          };
        });
        this.questions1 = this.questions.slice();
        this.questions2 = this.questions.slice();
        this.questions3 = this.questions.slice();
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });

    this.memberCreateAcountInfo = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.maxLength(80),
          this.checkUserNameSpecialCharacterValidator()
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),

        emailId: new FormControl({ value: this.personalInfoDataObj.email, disabled: true }, [
          Validators.required,
          this.validateEmail
        ]),

        phoneNo: new FormControl({ value: this.personalInfoDataObj.PhoneNumber, disabled: true }, [
          Validators.required,
          Validators.pattern('[0-9]{10}')
        ]),
        otpControl: new FormControl('email', [Validators.required]),
        otpText: new FormControl('', [
          Validators.required,
        ]),
        question1: new FormControl('', [Validators.required]),
        answer1: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ]),
        question2: new FormControl('', [Validators.required]),
        answer2: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ]),
        question3: new FormControl('', [Validators.required]),
        answer3: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ]),
        iAgreeCheckBox: new FormControl('', [Validators.required])
      },
      this.passwordValidator
    );
    this.loadFilledData();
  }

  loadFilledData() {
    const createAccountObj = JSON.parse(
      sessionStorage.getItem('createAccountData')
    );

    if (
      createAccountObj &&
      this.personalInfoDataObj.externalId ===
      sessionStorage.getItem('externalId')
    ) {
      this.memberCreateAcountInfo.patchValue({
        userName: createAccountObj.userName.trim(),
        password: createAccountObj.password.trim(),
        confirmPassword: createAccountObj.confirmPassword.trim(),
        phoneNo: createAccountObj.phoneNo.trim(),
        question1: createAccountObj.question1,
        answer1: createAccountObj.answer1.trim(),
        question2: createAccountObj.question2,
        answer2: createAccountObj.answer2.trim(),
        question3: createAccountObj.question3,
        answer3: createAccountObj.answer3.trim(),
        iAgreeCheckBox: createAccountObj.iAgreeCheckBox,
        otpText: createAccountObj.otpText.trim(),
        otpControl: createAccountObj.otpControl,
      });
      this.iAgreeChecked = createAccountObj.iAgreeCheckBox;

      if (sessionStorage.getItem('otpVerfied') === 'false') {
        this.memberCreateAcountInfo.patchValue({
          otpText: '',
        });
        this.otpVerfied = false;
      } else {
        this.otpVerfied = true;
        this.otpTextSuccess = constants.OTP_VALID;
      }
    }
    sessionStorage.setItem('externalId', this.personalInfoDataObj.externalId);

    if (sessionStorage.getItem('OTPTimer')) {
      this.timeLeft = +sessionStorage.getItem('OTPTimer');
      this.otpLabelTimer = this.timeLeft;
      this.otpCountDownTimer();
    }

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

  validatePhoneNumber(control: AbstractControl) {
    const re = /^\+\d{11,13}$/;
    let valid = true;
    valid = re.test(String(control.value).toLowerCase());
    if (!valid) {
      return { Invalid_Phone: true };
    }
    return null;
  }

  validateSpaces(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Invalid_Answer: true };
    }
    return null;
  }


  validateAnswer(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Invalid_Answer: true };
    }
    return null;
  }

  validateNumber(event: any) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)
      && (event.keyCode !== 8) && (event.keyCode !== 46) && (event.keyCode !== 39) && (event.keyCode !== 37)
      && (event.keyCode !== 9) && (event.keyCode !== 17)) {
      event.preventDefault();
    }
  }

  validatePhoneNumberEntry(event) {
    return this.parentComp.validateNumber(event);
  }

  CheckOTP() {
    this.OtperrorText = '';
    let otp = this.memberCreateAcountInfo.get('otpText').value;
    switch (this.memberCreateAcountInfo.get('otpText').value.length) {
      case 6: {
        this.registerationService
          .VerifyOTP(sessionStorage.getItem('externalId'), otp)
          .subscribe((res: boolean) => {
            if (res) {
              this.otpVerfied = true;
              this.OtperrorText = '';
              this.otpTextSuccess = constants.OTP_VALID;
              return;
            } else {
              this.otpVerfied = false;
              this.OtperrorText = constants.OTP_INVALID;
              return;
            }
          });
      }
        break;
      default: {
        otp = otp;
        this.memberCreateAcountInfo.patchValue({ otpText: otp });
      }
        break;
    }
  }

  checkUserNameSpecialCharacterValidator(): ValidatorFn {
    this.isUserNameAvailable = false;
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
  /**
   * Display progress bar
   // @param password
   */
  displayProgressbar(password: string) {
    this.passwordStrengthInfo = this.utilService.displayProgressbar(password);
  }

  /**
   * Prevent copy paste
   // @param e
   */
  paste(e: any) {
    e.preventDefault();
    this.pastenotallowed = true;
    this.isSubmitted = false;
  }

  passwordValidator(frm: FormGroup) {
    const userName = frm.get('userName').value;
    const password = frm.get('password').value;
    const confirmPassword = frm.get('confirmPassword').value;
    if (userName && password && password === userName) {
      return { isUserNamePasswordMatched: true };
    } else if (confirmPassword && password && confirmPassword !== password) {
      return { isConfirmPasswordNotMatched: true };
    } else {
      return null;
    }
  }

  checkUserNameAvailability() {
    const user = this.memberCreateAcountInfo.get('userName').value;
    if (user) {
      this.isCheckAvailabilityClicked = true;
      this.isUserNameEntred = true;

      this.authService.CheckUsername(user.trim()).subscribe(
        (res: boolean) => {
          if (!res) {
            this.isUserNameAvailable = res;
          } else {
            this.isUserNameAvailable = res;
          }
        }
      );
    } else {
      this.isUserNameEntred = false;
    }
  }

  sendOTP(frm: FormGroup) {
    let mode: any;
    let modeValue: any
    if (frm.get('otpControl').value === 'email') {
      mode = OTPModeValues.email;
      modeValue = frm.get('emailId').value;
    } else {
      mode = OTPModeValues.phone;
      modeValue = frm.get('phoneNo').value;
    }

    sessionStorage.removeItem('OTPTimer');
    this.timeLeft = 60;
    this.otpLabelTimer = 60;

    const otpObj = {
      externalId: sessionStorage.getItem('externalId'),
      mode: mode,
      modeValue: modeValue
    };
    this.registerationService.SendOTP(otpObj).subscribe(res => {
      if (res === 6005) {
        this.otpText = 'OTP sent sucessfully to your ' + modeValue;
        this.otpCountDownTimer();
      } else {
        switch (mode) {
          case 1:
            this.errorText = constants.INVALID_EMAILID;
            break;

          default:
            this.errorText = constants.INVALID_PHONE;
            break;
        }
        window.scrollTo(0, 0);
        return;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

  otpCountDownTimer() {
    this.sentforOTP = true;
    this.otpTimerSubscription = timer(1000, 1000).subscribe(val => {
      this.otpLabelTimer = this.otpVerfied ? 0 : this.timeLeft - val;
      if (this.timeLeft === val) {
        this.otpButtonLabel = 'Resend OTP for verification';
        this.otpTimerSubscription.unsubscribe();
        this.sentforOTP = false;
        this.otpText = '';
      }
    });
  }

  filterQuestions1() {
    this.questions2 = this.questions.slice(0);
    this.questions2 = this.questions2.filter(q => {
      if (
        q.value !== this.memberCreateAcountInfo.get('question1').value &&
        q.value !== this.memberCreateAcountInfo.get('question3').value
      ) {
        return true;
      }
    });
    this.questions3 = this.questions.slice(0);
    this.questions3 = this.questions3.filter(
      q =>
        q.value !== this.memberCreateAcountInfo.get('question1').value &&
        q.value !== this.memberCreateAcountInfo.get('question2').value
    );
  }

  filterQuestions2() {
    this.questions1 = this.questions.slice(0);
    this.questions1 = this.questions1.filter(
      q =>
        q.value !== this.memberCreateAcountInfo.get('question2').value &&
        q.value !== this.memberCreateAcountInfo.get('question3').value
    );
    this.questions3 = this.questions.slice(0);
    this.questions3 = this.questions3.filter(
      q =>
        q.value !== this.memberCreateAcountInfo.get('question1').value &&
        q.value !== this.memberCreateAcountInfo.get('question2').value
    );
  }

  filterQuestions3() {
    this.questions2 = this.questions.slice(0);
    this.questions2 = this.questions2.filter(
      q =>
        q.value !== this.memberCreateAcountInfo.get('question1').value &&
        q.value !== this.memberCreateAcountInfo.get('question3').value
    );
    this.questions1 = this.questions.slice(0);
    this.questions1 = this.questions1.filter(
      q =>
        q.value !== this.memberCreateAcountInfo.get('question3').value &&
        q.value !== this.memberCreateAcountInfo.get('question2').value
    );
  }

  onBack() {
    if (
      this.memberCreateAcountInfo.get('emailId').value &&
      this.personalInfoDataObj.email !==
      this.memberCreateAcountInfo.get('emailId').value
    ) {
      this.personalInfoDataObj.email = this.memberCreateAcountInfo.get(
        'emailId'
      ).value;
      sessionStorage.setItem(
        'PersonalInfoData',
        JSON.stringify(this.personalInfoDataObj)
      );
    }
    sessionStorage.setItem(
      'createAccountData',
      JSON.stringify(this.memberCreateAcountInfo.value)
    );

    if (this.sentforOTP) {
      sessionStorage.setItem('OTPTimer', this.otpLabelTimer.toString());
      this.otpTimerSubscription.unsubscribe();
    }
    if (this.otpVerfied) {
      sessionStorage.setItem('otpVerfied', 'true');
    } else {
      sessionStorage.setItem('otpVerfied', 'false');
    }
    this.backEvent.emit();
  }

  checkIAgree(isChecked: boolean) {
    if (isChecked) {
      this.iAgreeChecked = true;
      this.iAgreeCheckedMessage = false;
    } else {
      this.iAgreeChecked = false;
    }
  }

  validateForm() {
    const missingRequiredFields: any = [];
    Object.keys(this.memberCreateAcountInfo.controls).forEach(key => {
      if (this.memberCreateAcountInfo.get(key).errors && this.memberCreateAcountInfo.get(key).errors.required) {
        missingRequiredFields.push(key);
        return false;
      }
    });
    if (this.memberCreateAcountInfo.invalid) {
      if (missingRequiredFields.length > 1) {
        this.errorText = constants.MANDATORY_FIELDS;
      } else if (missingRequiredFields.length === 1 && missingRequiredFields[0] === 'iAgreeCheckBox') {
        this.iAgreeCheckedMessage = true;
      } else if (missingRequiredFields.length === 1 && missingRequiredFields[0] !== 'iAgreeCheckBox') {
        this.errorText = constants.MANDATORY_FIELDS;
      } else if (missingRequiredFields.length === 1 && missingRequiredFields[0] !== 'otpText') {

      }
      if (missingRequiredFields.length >= 1 && missingRequiredFields.filter(k => k === 'userName').length > 0) {
        this.isUserNameEntred = false;
      }
      window.scrollTo(0, 0);
      return false;
    } else if (!this.iAgreeChecked) {
      this.iAgreeCheckedMessage = true;
      return false;
    } else if (!this.isPasswordValid) {
      window.scrollTo(0, 0);
      return false;
    } else if (!this.otpVerfied) {
      this.otpTextSuccess = '';
      this.OtperrorText = constants.OTP_INVALID;
      window.scrollTo(0, 0);
      return false;
    } else {
      this.errorText = '';
      this.OtperrorText = '';
      return true;
    }
  }


  createUserObj() {
    this.userObj = {
      UserName: this.memberCreateAcountInfo
        .get('userName')
        .value.trim(),
      Email: this.memberCreateAcountInfo.get('emailId').value.trim(),
      Password: this.memberCreateAcountInfo
        .get('password')
        .value.trim(),
      PortalId: 2,
      PhoneNumber: this.memberCreateAcountInfo
        .get('phoneNo')
        .value.trim(),
      Zip: this.personalInfoDataObj.zipCode,
      dob: this.personalInfoDataObj.dob,
      PhoneNumberNotFound: JSON.parse(sessionStorage.getItem('ConfirmationCall')).PhoneNumberNotFound,
      EmailNotFound: JSON.parse(sessionStorage.getItem('ConfirmationCall')).EmailNotFound,
      UpdateToAdmin123: JSON.parse(sessionStorage.getItem('ConfirmationCall')).UpdateToAdmin123,
    };
  }

  createSequrityQuestionObj(userId) {
    this.userObj.SecurityQuestionAnswer = [
      {
        UserId: userId,
        SecurityQuestionId: this.memberCreateAcountInfo.get(
          'question1'
        ).value,
        Answer: this.memberCreateAcountInfo
          .get('answer1')
          .value.trim(),
        CreatedBy: userId,
        ModifiedBy: userId
      },
      {
        UserId: userId,
        SecurityQuestionId: this.memberCreateAcountInfo.get(
          'question2'
        ).value,
        Answer: this.memberCreateAcountInfo
          .get('answer2')
          .value.trim(),
        CreatedBy: userId,
        ModifiedBy: userId
      },
      {
        UserId: userId,
        SecurityQuestionId: this.memberCreateAcountInfo.get(
          'question3'
        ).value,
        Answer: this.memberCreateAcountInfo
          .get('answer3')
          .value.trim(),
        CreatedBy: userId,
        ModifiedBy: userId
      }];
  }

  onSubmit() {
    this.errorText = '';
    this.iAgreeCheckedMessage = false;
    this.isSubmitted = true;
    this.memberCreateAcountInfo.updateValueAndValidity();
    if (this.memberCreateAcountInfo.value.password) {
      this.isPasswordValid = this.utilService.checkPasswordValidation(
        this.memberCreateAcountInfo.value.password
      );
    }

    if (this.validateForm() && this.memberCreateAcountInfo.valid) {
      this.authService
        .CheckUsername(this.memberCreateAcountInfo.get('userName').value)
        .subscribe((res: boolean) => {
          this.isUserNameAvailable = res;
          if (!this.isUserNameAvailable) {
            this.createUserObj();
            this.authService
              .RegisterUser(this.userObj)
              .subscribe(userId => {
                this.userObj.userID = userId;
                this.userObj.externalId = this.personalInfoDataObj.externalId.trim();
                this.userObj.FirstName = this.personalInfoDataObj.firstName.trim();
                this.userObj.LastName = this.personalInfoDataObj.lastName.trim();
                this.createSequrityQuestionObj(this.userObj.userID);
                this.registerationService
                  .RegisterMember(this.userObj)
                  .subscribe(
                    resCode => {
                      if (resCode === 6004) {
                        this.childevent.emit();
                      } else {
                        this.authService
                          .DeleteUser(this.userObj.userID)
                          .subscribe();
                        if (resCode === 6000) {
                          this.errorText = constants.MEMBER_ALREADY_REGISTERED;
                        } else if (resCode === 6003) {
                          this.errorText = constants.MEMBER_INVALID_DETAILS;
                        } else if (resCode === 6002) {
                          this.errorText = constants.INVALID_MEMBERID;
                        }
                      }
                    },
                    (err: HttpErrorResponse) => {
                      if (err.error instanceof Error) {
                      } else if (err.status === 500) {
                        this.authService
                          .DeleteUser(this.userObj.userID)
                          .subscribe();
                      }
                    });
              });
          } else {
            this.isCheckAvailabilityClicked = true;
          }
        });
    }
  }
}
