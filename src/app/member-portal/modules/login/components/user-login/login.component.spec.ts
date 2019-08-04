import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStoreService } from '@core/services/local-storage.service';
import { AuthRouteService } from '@core/services/auth.service';
import { UtilService } from '@core/services/util.service';
import { LoginService } from '@modules/login/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '@app/app.component';
import { UserIdleService } from 'angular-user-idle';
import * as constants from '@core/constants/app-constants';
import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    const formBuilderStub = { group: object1 => ({}) };
    const routerStub = { navigate: array1 => ({}) };
    const localStoreServiceStub = { saveSessionData: (arg1, string2) => ({}) };
    const authRouteServiceStub = {
      CheckUsername: arg1 => ({ subscribe: () => ({}) }),
      userLogin: data1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = { decodeJwt: arg1 => ({}) };
    const loginServiceStub = {
      sendAccountLockedMail: arg1 => ({ subscribe: () => ({}) })
    };
    const translateServiceStub = {
      addLangs: array1 => ({}),
      setDefaultLang: string1 => ({}),
      getBrowserLang: () => ({ match: () => ({}) }),
      use: arg1 => ({})
    };
    const appComponentStub = {
      hideOverlayMenu: () => ({}),
      sessionTimeoutPopUp: {}
    };
    const userIdleServiceStub = { stopWatching: () => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: Router, useValue: routerStub },
        { provide: LocalStoreService, useValue: localStoreServiceStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: LoginService, useValue: loginServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: AppComponent, useValue: appComponentStub },
        { provide: UserIdleService, useValue: userIdleServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('submitted defaults to: false', () => {
    expect(component.submitted).toEqual(false);
  });
  it('forgotpassword defaults to: false', () => {
    expect(component.forgotpassword).toEqual(false);
  });
  it('pastenotallowed defaults to: false', () => {
    expect(component.pastenotallowed).toEqual(false);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('invaliduser defaults to: false', () => {
    expect(component.invaliduser).toEqual(false);
  });
  it('attemptError defaults to: false', () => {
    expect(component.attemptError).toEqual(false);
  });
  it('errLoginstatus defaults to: false', () => {
    expect(component.errLoginstatus).toEqual(false);
  });
  it('passwordUpdate defaults to: false', () => {
    expect(component.passwordUpdate).toEqual(false);
  });
  it('isBrowserCompatible defaults to: true', () => {
    expect(component.isBrowserCompatible).toEqual(true);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const appComponentStub: AppComponent = fixture.debugElement.injector.get(
        AppComponent
      );
      const userIdleServiceStub: UserIdleService = fixture.debugElement.injector.get(
        UserIdleService
      );
      spyOn(component, 'findBrowser').and.callThrough();
      spyOn(component, 'initForm').and.callThrough();
      spyOn(component, 'onFormChange').and.callThrough();
      spyOn(appComponentStub, 'hideOverlayMenu').and.callThrough();
      spyOn(userIdleServiceStub, 'stopWatching').and.callThrough();
      component.ngOnInit();
      expect(component.findBrowser).toHaveBeenCalled();
      expect(component.initForm).toHaveBeenCalled();
      expect(component.onFormChange).toHaveBeenCalled();
      expect(appComponentStub.hideOverlayMenu).toHaveBeenCalled();
      expect(userIdleServiceStub.stopWatching).toHaveBeenCalled();
    });
  });
  describe('initForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.initForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('forgotPassword', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authRouteServiceStub: AuthRouteService = fixture.debugElement.injector.get(
        AuthRouteService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authRouteServiceStub, 'CheckUsername').and.callThrough();
      component.forgotPassword();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authRouteServiceStub.CheckUsername).toHaveBeenCalled();
    });
  });
  describe('NavigateToRegistration', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToRegistration();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
