import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthRouteService } from '@core/services/auth.service';
import { LoginService } from '@modules/login/services/login.service';
import { CoreDataService } from '@core/services/core-data.service';
import { UtilService } from '@core/services/util.service';
import * as constants from '@core/constants/app-constants';
import { PasswordResetComponent } from './password-reset.component';
describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  beforeEach(() => {
    const formGroupStub = { get: string1 => ({ value: {} }) };
    const activatedRouteStub = {
      data: { subscribe: () => ({}) },
      snapshot: { data: {} }
    };
    const routerStub = { navigate: (array1, navigationExtras2) => ({}) };
    const authRouteServiceStub = {
      Resetpassword: (arg1, arg2, guid3) => ({ subscribe: () => ({}) })
    };
    const loginServiceStub = {
      sendResetPasswordConformation: (arg1, currentdate2) => ({
        subscribe: () => ({})
      })
    };
    const coreDataServiceStub = {};
    const utilServiceStub = {
      displayProgressbar: password1 => ({}),
      checkPasswordValidation: arg1 => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PasswordResetComponent],
      providers: [
        { provide: FormGroup, useValue: formGroupStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub },
        { provide: LoginService, useValue: loginServiceStub },
        { provide: CoreDataService, useValue: coreDataServiceStub },
        { provide: UtilService, useValue: utilServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
  });
  it('isPasswordValid defaults to: true', () => {
    expect(component.isPasswordValid).toEqual(true);
  });
  it('iconName defaults to: constants.ICON_PASSWORD', () => {
    expect(component.iconName).toEqual(constants.ICON_PASSWORD);
  });
  it('headerHtml defaults to:  Password Reset Page', () => {
    expect(component.headerHtml).toEqual(' Password Reset Page');
  });
  describe('passwordValidator', () => {
    it('makes expected calls', () => {
      const formGroupStub: FormGroup = fixture.debugElement.injector.get(
        FormGroup
      );
      spyOn(formGroupStub, 'get').and.callThrough();
      component.passwordValidator(formGroupStub);
      expect(formGroupStub.get).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initForm').and.callThrough();
      component.ngOnInit();
      expect(component.initForm).toHaveBeenCalled();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const authRouteServiceStub: AuthRouteService = fixture.debugElement.injector.get(
        AuthRouteService
      );
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      const utilServiceStub: UtilService = fixture.debugElement.injector.get(
        UtilService
      );
      spyOn(component, 'NavigateToSuccessPage').and.callThrough();
      spyOn(authRouteServiceStub, 'Resetpassword').and.callThrough();
      spyOn(
        loginServiceStub,
        'sendResetPasswordConformation'
      ).and.callThrough();
      spyOn(utilServiceStub, 'checkPasswordValidation').and.callThrough();
      component.onSubmit();
      expect(component.NavigateToSuccessPage).toHaveBeenCalled();
      expect(authRouteServiceStub.Resetpassword).toHaveBeenCalled();
      expect(loginServiceStub.sendResetPasswordConformation).toHaveBeenCalled();
      expect(utilServiceStub.checkPasswordValidation).toHaveBeenCalled();
    });
  });
  describe('NavigateToSuccessPage', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToSuccessPage();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('NavigateToLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToLogin();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
