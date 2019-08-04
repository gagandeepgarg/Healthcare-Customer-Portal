import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as constants from '@core/constants/app-constants';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AuthRouteService } from '@core/services/auth.service';
import { LoginService } from '@modules/login/services/login.service';
import { CoreDataService } from '@core/services/core-data.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { PasswordReset } from '@core/enums/enum';
import { UtilService } from '@core/services/util.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: 'password-reset.component.html',
  styleUrls: ['password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errLoginstatus: boolean;
  errorText = '';
  successText = '';
  constants = constants;
  userId: string;
  guid: string;
  errorPassword: boolean;
  isOldPassword: boolean;
  isLinkValid: boolean;
  isSubmitted = false;
  isPasswordValid = true;
  iconName = constants.ICON_PASSWORD;
  headerHtml = ' Password Reset Page';
  passwordStrengthInfo: any = {
    strongRegex: '',
    mediumRegex: '',
    passwordStrength: '',
    strenthbar: '',
    progressval: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authRouteService: AuthRouteService,
    private coreDataService: CoreDataService,
    public utilService: UtilService,
    private loginService: LoginService,
    private router: Router) {
    this.activatedRoute.data.subscribe(() => {
      this.isLinkValid = this.activatedRoute.snapshot.data['data'];
    });

  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.initForm();
  }
  initForm() {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required])
    },
      this.passwordValidator);
    this.resetPasswordForm.valueChanges.subscribe(() => {
      this.isSubmitted = false;
    });
  }

  passwordValidator(frm: FormGroup) {
    const password = frm.get('newPassword').value;
    const confirmPassword = frm.get('confirmpassword').value;
    if (confirmPassword && password && confirmPassword !== password) {
      return { isConfirmPasswordNotMatched: true };
    } else {
      return null;
    }
  }
  validatePassword(password: any) {
    if (password.target.value === '') {
      this.errorPassword = true;
      this.errLoginstatus = true;
      this.errorText = this.constants.FILL_REQUIRED_FIELDS;
    } else {
      this.errorPassword = false;
      this.errLoginstatus = false;
    }
  }
  /**
   * Display progress bar
   // @param password
   */
  displayProgressbar(password: string) {
    this.passwordStrengthInfo = this.utilService.displayProgressbar(password);
  }
  onSubmit() {
    this.errorText = '';
    this.isSubmitted = true;
    // check for required fields
    if (this.resetPasswordForm.get('newPassword').hasError('required') ||
      this.resetPasswordForm.get('confirmpassword').hasError('required')) {
      this.errLoginstatus = true;
      this.errorText = this.constants.FILL_REQUIRED_FIELDS;
      return;
    } else {
      this.errorText = '';
      if (this.resetPasswordForm.value.newPassword) {
        this.isPasswordValid = this.utilService.checkPasswordValidation(
          this.resetPasswordForm.value.newPassword
        );
      }
      if (!this.isPasswordValid) {
        this.errorText = constants.PASSWORD_POLICY_INFO_ERROR;
        return;
      } else if (this.resetPasswordForm.get('newPassword').value !==
        this.resetPasswordForm.get('confirmpassword').value) {
        this.errorText = constants.CONFIRM_PASSWORD_NOT_MATCHED;
        return;
      }
    }
    this.errLoginstatus = false;
    // reset Password if form is valid
    const guid = sessionStorage.getItem('guid');
    this.authRouteService.Resetpassword(
      sessionStorage.getItem('username'),
      this.resetPasswordForm.get('newPassword').value,
      guid
    )
      .subscribe(res => {
        if (res) {
          switch (res) {
            // case PasswordReset.RESET_PASSWORD_SUCCESSFULL: // success
            case PasswordReset.CHANGE_PASSWORD_SUCCESSFULL:
              this.successText = this.constants.RESET_PASSWORD_SUCCESSFULL;
              const currentdate = new Date().toLocaleString();
              this.loginService
                // .sendResetPasswordConformation(this.userId, currentdate)
                .sendResetPasswordConformation(sessionStorage.getItem('username'), currentdate)
                .subscribe(resp => {
                  if (resp) {
                    this.successText = this.constants.RESET_PASSWORD_SUCCESSFULL;
                  }
                },
                  (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                    } else if (err.status === 500) {
                    }
                  });
              this.NavigateToSuccessPage();
              break;
            /* case PasswordReset.PASSWORD_ALREADY_USED: // API validating for similar consecutive passwords
              this.errorText = this.constants.PASSWORD_ALREADY_USED;
              this.isOldPassword = true;
              break;
            case PasswordReset.PASSWORD_USERNAME_SAME:
              this.errorText = this.constants.USERNAME_PASSWORD_MATCHED;
              break;
            case PasswordReset.PASSWORD_EXPIRED:
              this.isLinkValid = false;
              break;
            case PasswordReset.RESET_SERVER_ERROR:
              // Exception handeling for bad request
              break; */
          }
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
            switch (err.error.ErrorCode) {
              case PasswordReset.PASSWORD_ALREADY_USED: // API validating for similar consecutive passwords
                this.errorText = this.constants.PASSWORD_ALREADY_USED;
                this.isOldPassword = true;
                break;
              case PasswordReset.PASSWORD_USERNAME_SAME:
                this.errorText = this.constants.USERNAME_PASSWORD_MATCHED;
                break;
              case PasswordReset.PASSWORD_EXPIRED:
                this.isLinkValid = false;
                break;
              case PasswordReset.RESET_SERVER_ERROR:
                // Exception handeling for bad request
                break;
            }
          }
        });
  }
  // preventing copy-paste in password fileds
  paste(e: any) {
    e.preventDefault();
    this.errLoginstatus = true;
    this.errorText = this.constants.COPYPASTENOTALLOED;
  }
  // navigate to timer Page
  NavigateToSuccessPage() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        leftIcon: constants.ICON_CONGRATS_LEFT,
        upperText: 'Congratulations!',
        rightIcon: constants.ICON_CONGRATS_RIGHT,
        belowText: constants.RESET_PASSWORD_SUCCESSFULL,
        bodyText: ''
      }
    };
    this.router.navigate(['/' + RoutesConstants.Shared + '/' + RoutesConstants.successtimer], navigationExtras);
  }
  // naviaging to login page
  NavigateToLogin() {
    this.router.navigate(['/' + RoutesConstants.Login]);
  }
}
