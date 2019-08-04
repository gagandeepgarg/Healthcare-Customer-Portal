import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginService } from '@modules/login/services/login.service';
import { Router } from '@angular/router';
import * as constants from '@core/constants/app-constants';
import { ForgetPasswordComponent } from './forget-password.component';
describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  beforeEach(() => {
    const loginServiceStub = {
      GetUserSecurityQuestions: arg1 => ({ subscribe: () => ({}) }),
      IsvalidUserSecurityAnswers: arg1 => ({ subscribe: () => ({}) })
    };
    const routerStub = { navigate: (array1, navigationExtras2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ForgetPasswordComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('questions defaults to: []', () => {
    expect(component.questions).toEqual([]);
  });
  it('unsucessfullCount defaults to: 0', () => {
    expect(component.unsucessfullCount).toEqual(0);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
  });
  it('iconName defaults to: constants.ICON_UNLOCK', () => {
    expect(component.iconName).toEqual(constants.ICON_UNLOCK);
  });
  it('headerHtml defaults to:  Please answer the below security questions', () => {
    expect(component.headerHtml).toEqual(
      ' Please answer the below security questions'
    );
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      spyOn(loginServiceStub, 'GetUserSecurityQuestions').and.callThrough();
      component.ngOnInit();
      expect(loginServiceStub.GetUserSecurityQuestions).toHaveBeenCalled();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const loginServiceStub: LoginService = fixture.debugElement.injector.get(
        LoginService
      );
      spyOn(component, 'NavigateToSuccessPage').and.callThrough();
      spyOn(loginServiceStub, 'IsvalidUserSecurityAnswers').and.callThrough();
      component.onSubmit();
      expect(component.NavigateToSuccessPage).toHaveBeenCalled();
      expect(loginServiceStub.IsvalidUserSecurityAnswers).toHaveBeenCalled();
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
