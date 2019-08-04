import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRouteService } from '@core/services/auth.service';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { UtilService } from '@core/services/util.service';
import { CoreDataService } from '@core/services/core-data.service';
import { Router } from '@angular/router';
import * as  constants  from '@core/constants/app-constants';
import { ChangePasswordComponent } from './change-password.component';
import { COMMON_MODULES } from '@app/core/commonModules';
describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  beforeEach(() => {
    const formGroupStub = { get: string1 => ({ value: {} }) };
    const authRouteServiceStub = {
      changepassword: userPassword1 => ({ subscribe: () => ({}) })
    };
    const dashboardServiceStub = {
      sendResetPasswordConformation: arg1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = {
      displayProgressbar: password1 => ({}),
      checkPasswordValidation: arg1 => ({})
    };
    const coreDataServiceStub = {};
    const routerStub = { navigate: (array1, navigationExtras2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
      declarations: [ChangePasswordComponent],
      providers: [
        { provide: FormGroup, useValue: formGroupStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub },
        { provide: DashboardService, useValue: dashboardServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: CoreDataService, useValue: coreDataServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('headerHtml defaults to: Change Password', () => {
    expect(component.headerHtml).toEqual('Change Password');
  });
  it('iconName defaults to: constants.ICON_PASSWORD', () => {
    expect(component.iconName).toEqual(constants.ICON_PASSWORD);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('isincorrectCurrentPassword defaults to: false', () => {
    expect(component.isincorrectCurrentPassword).toEqual(false);
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
  });
  it('isPasswordValid defaults to: true', () => {
    expect(component.isPasswordValid).toEqual(true);
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
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      const utilServiceStub: UtilService = fixture.debugElement.injector.get(
        UtilService
      );
      component.ngOnInit();
      spyOn(component, 'NavigateToSuccessTimer').and.callThrough();
      spyOn(authRouteServiceStub, 'changepassword').and.callThrough();
      // spyOn(
      //   dashboardServiceStub,
      //   'sendResetPasswordConformation'
      // ).and.callThrough();
      spyOn(utilServiceStub, 'checkPasswordValidation').and.callThrough();
      component.onSubmit();
      expect(component.NavigateToSuccessTimer).toBeTruthy();
      expect(authRouteServiceStub.changepassword).toBeTruthy();
      // expect(
      //   dashboardServiceStub.sendResetPasswordConformation
      // ).toHaveBeenCalled();
      expect(utilServiceStub.checkPasswordValidation).toBeTruthy();
    });
  });
  describe('NavigateToSuccessTimer', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToSuccessTimer();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
