import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as constants from '@core/constants/app-constants';
import { AuthRouteService } from '@core/services/auth.service';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { UtilService } from '@core/services/util.service';
import { CoreDataService } from '@core/services/core-data.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { Router, NavigationExtras } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  headerHtml = 'Change Password';
  iconName = constants.ICON_PASSWORD;
  errorText = '';
  successText = '';
  constants = constants;
  errorPassword: boolean;
  isincorrectCurrentPassword = false;
  userId: string;
  isSubmitted = false;
  passwordStrengthInfo: any = {
    strongRegex: '',
    mediumRegex: '',
    passwordStrength: '',
    strenthbar: '',
    progressval: ''
  };
  isPasswordValid = true;
  constructor(
    private authRouteService: AuthRouteService,
    private dashboardService: DashboardService,
    public utilService: UtilService,
    private coreDataService: CoreDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.initForm();
  }

  // @param password
  displayProgressbar(password: string) {
    this.passwordStrengthInfo = this.utilService.displayProgressbar(password);
  }
  initForm() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    }, this.passwordValidator);
    this.changePasswordForm.valueChanges.subscribe(() => {
      this.isSubmitted = false;
      this.isincorrectCurrentPassword = false;
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

  paste(e: any) {
    e.preventDefault();
    this.errorText = this.constants.COPYPASTENOTALLOED;
  }
  onSubmit() {
    this.errorText = '';
    this.isSubmitted = true;
    if (this.changePasswordForm.invalid && (this.changePasswordForm.get('currentPassword').hasError('required') ||
      this.changePasswordForm.get('newPassword').hasError('required') ||
      this.changePasswordForm.get('confirmpassword').hasError('required'))) {
      this.errorText = this.constants.FILL_REQUIRED_FIELDS;
      return;
    } else {
      if (this.changePasswordForm.value.newPassword) {
        this.isPasswordValid = this.utilService.checkPasswordValidation(
          this.changePasswordForm.value.newPassword
        );
      }
      if (!this.isPasswordValid) {
        this.errorText = constants.PASSWORD_POLICY_INFO_ERROR;
        return;
      } else if (this.changePasswordForm.get('newPassword').value !==
        this.changePasswordForm.get('confirmpassword').value) {
        this.errorText = constants.CONFIRM_PASSWORD_NOT_MATCHED;
        return;
      }
      this.errorText = '';
      const currentPassword = this.changePasswordForm.get('currentPassword')
        .value;
      const newPassword = this.changePasswordForm.get('newPassword').value;
      const userPassword = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        UserId: this.userId,
        userName: JSON.parse(sessionStorage.getItem('currentUsername'))
      };
      this.authRouteService.changepassword(userPassword).subscribe(res => {
        switch (res) {
          /* case 6012:
            this.errorText = constants.CURRENT_PASSWORD_INCORRECT;
            this.isincorrectCurrentPassword = true;
            break; */
          case 6011:
            const currentdate = new Date().toLocaleString();
            this.dashboardService
              .sendResetPasswordConformation(JSON.parse(sessionStorage.getItem('currentUsername')), currentdate)
              .subscribe();
            this.NavigateToSuccessTimer();
            break;
         /*  case 6007:
            this.errorText = constants.PASSWORD_ALREADY_USED;
            break; */
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
            switch (err.error.ErrorCode) {
              case 6012:
                this.errorText = constants.CURRENT_PASSWORD_INCORRECT;
                this.isincorrectCurrentPassword = true;
                break;
              case 6007:
                this.errorText = constants.PASSWORD_ALREADY_USED;
                break;
            }
          }
        });
    }
  }
  NavigateToSuccessTimer() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        leftIcon: constants.ICON_CONGRATS_LEFT,
        upperText: 'Congratulations!',
        rightIcon: constants.ICON_CONGRATS_RIGHT,
        belowText: constants.PASSWORD_CHANGED_SUCCESS,
        bodyText: ''
      }
    };
    this.router.navigate(['/' + RoutesConstants.Shared + '/' + RoutesConstants.successtimer], navigationExtras);
  }
}
