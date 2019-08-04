import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStoreService } from '@core/services/local-storage.service';
import { AuthRouteService } from '@core/services/auth.service';
import { UtilService } from '@core/services/util.service';
import * as constants from '@core/constants/app-constants';
import { RoutesConstants } from '@core/constants/route-constants';
import { LoginStatus } from '@core/enums/enum';
import { LoginService } from '@modules/login/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '@app/app.component';
import { environment } from '@env/environment';
import { UserIdleService } from 'angular-user-idle';

import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { Login } from '../../auth.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showUserNameInfo = false;
  submitted = false;
  forgotpassword = false;
  pastenotallowed = false;
  token: string;
  username: string;
  constants = constants;
  invaliduser: any = false;
  attemptError = false;
  attempErrorValue: any;
  errLoginstatus = false;
  errorText: any;
  passwordUpdateMessage = '';
  passwordUpdate = false;
  isBrowserCompatible = true;
  errorPassword: boolean;
  errorUserName: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStoreService: LocalStoreService,
    private utilService: UtilService,
    private authRouteService: AuthRouteService,
    private loginService: LoginService,
    public translate: TranslateService,
    public app: AppComponent,
    private userIdle: UserIdleService,
    private store: Store<AppState>) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.findBrowser();
    this.userIdle.stopWatching();
    this.app.hideOverlayMenu();
    this.app.sessionTimeoutPopUp = false;
    sessionStorage.clear();
    this.initForm();
    this.onFormChange();
  }
  findBrowser() {
    // to find desktop browser
    const isEdge = /edge\//i.test(window.navigator.userAgent)
    if (
      window.navigator.vendor === 'Google Inc.' ||
      navigator.userAgent.indexOf('Firefox') !== -1
      || isEdge
    ) {
      this.isBrowserCompatible = true;
    } else {
      this.isBrowserCompatible = false;
    }
    // to find iphone browser
    if (
      /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) &&
      navigator.userAgent.indexOf('Safari') !== -1 &&
      navigator.userAgent.indexOf('CriOS') === -1
    ) {
      this.isBrowserCompatible = false;
    } else if (
      /(iPad|iPhone|iPod)/gi.test(navigator.userAgent) &&
      navigator.userAgent.indexOf('OPiOS') !== -1
    ) {
      this.isBrowserCompatible = false;
    } else if (/(iPad|iPhone|iPod)/gi.test(navigator.userAgent)) {
      this.isBrowserCompatible = true;
    }
    // to find android browser
    if (
      (navigator.userAgent.indexOf('OPR') !== -1 ||
        navigator.userAgent.indexOf('EdgA') !== -1) &&
      navigator.userAgent.indexOf('Android') !== -1
    ) {
      this.isBrowserCompatible = false;
    } else if (navigator.userAgent.indexOf('Android') !== -1) {
      this.isBrowserCompatible = true;
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onFormChange() {
    this.errLoginstatus = false;
    this.attemptError = false;
    this.loginForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  /**
   * User Forgot password
   */
  forgotPassword() {
    this.submitted = false;
    this.attemptError = false;
    this.username = this.loginForm.controls['username'].value;
    // check if username is entered
    if (this.username === '') {
      this.errLoginstatus = true;
      this.errorText = this.constants.USERNAMEMUST;
    } else {
      // validate username
      this.authRouteService.CheckUsername(this.username).subscribe(resp => {
        if (resp) {
          // if valid save username in session and redirect to forgot password page
          sessionStorage.setItem('username', this.username);
          this.router.navigate([('/' + RoutesConstants.ForgetPassword)]);
        } else {
          this.errLoginstatus = true;
          this.errorText = this.constants.INVALID_USERNAME;
        }
      });
    }
  }
  // prevent paste in fields
  paste(e: any) {
    e.preventDefault();
    this.errLoginstatus = true;
    this.errorText = this.constants.COPYPASTENOTALLOED;
  }

  validateUserName(userName: any) {
    if (userName.target.value === '') {
      this.errorUserName = true;
      this.errLoginstatus = true;
      this.errorText = this.constants.FILL_REQUIRED_FIELDS;
    } else {
      this.errorUserName = false;
      this.errLoginstatus = false;
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

  loginSubmit() {
    if (this.loginForm.invalid) {
      this.errorUserName = !this.loginForm.get('username').value ? true : false;
      this.errorPassword = !this.loginForm.get('password').value ? true : false;
      this.errLoginstatus = true;
      this.errorText = this.constants.FILL_REQUIRED_FIELDS;
      return;
    }
    this.loginUser();
  }

  private loginUser() {

    const data = {
      UserName: this.loginForm.controls['username'].value,
      Password: this.loginForm.controls['password'].value,
      GrantType: environment.grantType,
      ClientId: environment.client_id,
      ClientSecret: environment.clientSecret,
      Scope: environment.clientScope,
      PortalId: 2
    };
    this.authRouteService.userLogin(data).subscribe(
      (res: any) => {
        this.HandleLoginSuccessRes(res);
      },
      (error: HttpErrorResponse) => {
        this.errLoginstatus = true;
        if (error.status === 500 && error.error.ErrorCode === 5004.1) {
          this.errorText = 'You have 4 attempt(s) left';
        } else if (error.status === 500 && error.error.ErrorCode === 5004.2) {
          this.errorText = 'You have 3 attempt(s) left';
        } else if (error.status === 500 && error.error.ErrorCode === 5004.3) {
          this.errorText = 'You have 2 attempt(s) left';
        } else if (error.status === 500 && error.error.ErrorCode === 5003) {
          this.errorText = 'You have 1 attempt left, after which your account will be locked';
        } else if (error.status === 500 && error.error.ErrorCode === 5001) {
          this.errorText = constants.INVALIDUSER;
        } else if (error.status === 500 && error.error.ErrorCode === 6004) {
          this.errorText = 'Your account is already locked';
        } else if (error.status === 500 && error.error.ErrorCode === 6009) {
          this.errorText = constants.ACCOUNT_LOCKED_OUT;
          this.loginService.sendAccountLockedMail(this.loginForm.controls['username'].value.trim()).subscribe();
        } else if (error.status === 500 && error.error.ErrorCode === LoginStatus.PASSWORD_EXPIRED) {
          this.errorText = constants.PASSWORD_EXPIRED;
        }
        return;

        // this.errorText = JSON.stringify(error.error.message);
        // this.errLoginstatus = true;
        // this.invaliduser = false;
      }
    );
  }

  HandleLoginSuccessRes(res) {
    /* if (res.customHttpStatusCode === LoginStatus.INVALID_CREDENTIALS) {
      this.errLoginstatus = true;
      this.errorText = constants.INVALIDUSER;
      // check for unsuccessfull attemps count and show message accordingly
      if (res.loginFailedCount < 4 && res.loginFailedCount > 0) {
        this.errorText = 'You have ' + (5 - res.loginFailedCount) + ' attempt(s) left';
      } else if (res.loginFailedCount === 4) {
        this.errorText = 'You have 1 attempt left, after which your account will be locked';
      }
      return;
    } else if (res.customHttpStatusCode === LoginStatus.ACCOUNT_LOCKED) {
      this.errLoginstatus = true;
      this.errorText = constants.ACCOUNT_LOCKED_OUT;
      if (res.loginFailedCount === 5) {
        this.loginService.sendAccountLockedMail(res.userId).subscribe();
      }
      return;
    } else if (res.customHttpStatusCode === LoginStatus.PASSWORD_EXPIRED) {
      this.errLoginstatus = true;
      this.errorText = constants.PASSWORD_EXPIRED;
      return;
    } else if (res.customHttpStatusCode === LoginStatus.LOGIN_SUCCESS) {
      this.validatedUser(res);
    } */
    if (res.customHttpStatusCode === LoginStatus.LOGIN_SUCCESS) {
      this.errLoginstatus = false;
      this.validatedUser(res);
    }
  }

  validatedUser(res: any) {
    this.store.dispatch(new Login({ user: res }));
    this.localStoreService.saveSessionData(res.userId, 'userId');
    this.localStoreService.saveSessionData(res.accessToken, 'accessToken');
    this.localStoreService.saveSessionData(
      this.loginForm.value.username,
      'currentUsername'
    );
    this.localStoreService.saveSessionData(res.expiresIn, 'expiresIn');
    this.localStoreService.saveSessionData(res.refreshToken, 'refreshToken');
    const decodedToken = this.utilService.decodeJwt(res.accessToken);
    this.localStoreService.saveSessionData(decodedToken, 'loggedInUser');
    this.router.navigate(['/' + RoutesConstants.Dashboard]);
  }
  NavigateToRegistration() {
    this.router.navigate(['/' + RoutesConstants.Registration]);
  }
  ngOnDestroy() {
  }
}

