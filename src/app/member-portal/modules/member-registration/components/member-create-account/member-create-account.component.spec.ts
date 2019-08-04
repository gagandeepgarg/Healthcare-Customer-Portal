import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { RegistrationService } from '@modules/member-registration/services/registration.service';
import { UtilService } from '@core/services/util.service';
import { MemberRegistrationComponent } from '../member-registration/member-registration.component';
import { AuthRouteService } from '@core/services/auth.service';
import * as constants from '@core/constants/app-constants';
import { MemberCreateAccountComponent } from './member-create-account.component';
describe('MemberCreateAccountComponent', () => {
  let component: MemberCreateAccountComponent;
  let fixture: ComponentFixture<MemberCreateAccountComponent>;
  beforeEach(() => {
    const formGroupStub = { get: string1 => ({ value: {} }) };
    const abstractControlStub = { value: { trim: () => ({}) } };
    const registrationServiceStub = {
      GetSecurityQuestions: () => ({ subscribe: () => ({}) }),
      VerifyOTP: (arg1, otp2) => ({ subscribe: () => ({}) }),
      SendOTP: otpObj1 => ({ subscribe: () => ({}) }),
      RegisterMember: arg1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = {
      displayProgressbar: password1 => ({}),
      checkPasswordValidation: arg1 => ({})
    };
    const memberRegistrationComponentStub = { validateNumber: event1 => ({}) };
    const authRouteServiceStub = {
      CheckUsername: arg1 => ({ subscribe: () => ({}) }),
      RegisterUser: arg1 => ({ subscribe: () => ({}) }),
      DeleteUser: arg1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MemberCreateAccountComponent],
      providers: [
        { provide: FormGroup, useValue: formGroupStub },
        { provide: AbstractControl, useValue: abstractControlStub },
        { provide: RegistrationService, useValue: registrationServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        {
          provide: MemberRegistrationComponent,
          useValue: memberRegistrationComponentStub
        },
        { provide: AuthRouteService, useValue: authRouteServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MemberCreateAccountComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('isPasswordValid defaults to: true', () => {
    expect(component.isPasswordValid).toEqual(true);
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
  });
  it('isUserNameAvailable defaults to: false', () => {
    expect(component.isUserNameAvailable).toEqual(false);
  });
  it('isCheckAvailabilityClicked defaults to: false', () => {
    expect(component.isCheckAvailabilityClicked).toEqual(false);
  });
  it('isUserNameEntred defaults to: true', () => {
    expect(component.isUserNameEntred).toEqual(true);
  });
  it('timeLeft defaults to: 60', () => {
    expect(component.timeLeft).toEqual(60);
  });
  it('otpLabelTimer defaults to: 60', () => {
    expect(component.otpLabelTimer).toEqual(60);
  });
  it('otpButtonLabel defaults to: Send OTP for Verification', () => {
    expect(component.otpButtonLabel).toEqual('Send OTP for Verification');
  });
  it('iAgreeCheckedMessage defaults to: false', () => {
    expect(component.iAgreeCheckedMessage).toEqual(false);
  });
  it('iAgreeChecked defaults to: false', () => {
    expect(component.iAgreeChecked).toEqual(false);
  });
  it('otpVerfied defaults to: false', () => {
    expect(component.otpVerfied).toEqual(false);
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
  describe('sendOTP', () => {
    it('makes expected calls', () => {
      const formGroupStub: FormGroup = fixture.debugElement.injector.get(
        FormGroup
      );
      const registrationServiceStub: RegistrationService = fixture.debugElement.injector.get(
        RegistrationService
      );
      spyOn(component, 'otpCountDownTimer').and.callThrough();
      spyOn(formGroupStub, 'get').and.callThrough();
      spyOn(registrationServiceStub, 'SendOTP').and.callThrough();
      component.sendOTP(formGroupStub);
      expect(component.otpCountDownTimer).toHaveBeenCalled();
      expect(formGroupStub.get).toHaveBeenCalled();
      expect(registrationServiceStub.SendOTP).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const registrationServiceStub: RegistrationService = fixture.debugElement.injector.get(
        RegistrationService
      );
      spyOn(
        component,
        'checkUserNameSpecialCharacterValidator'
      ).and.callThrough();
      spyOn(component, 'loadFilledData').and.callThrough();
      spyOn(registrationServiceStub, 'GetSecurityQuestions').and.callThrough();
      component.ngOnInit();
      expect(
        component.checkUserNameSpecialCharacterValidator
      ).toHaveBeenCalled();
      expect(component.loadFilledData).toHaveBeenCalled();
      expect(registrationServiceStub.GetSecurityQuestions).toHaveBeenCalled();
    });
  });
  describe('loadFilledData', () => {
    it('makes expected calls', () => {
      spyOn(component, 'otpCountDownTimer').and.callThrough();
      component.loadFilledData();
      expect(component.otpCountDownTimer).toHaveBeenCalled();
    });
  });
  describe('CheckOTP', () => {
    it('makes expected calls', () => {
      const registrationServiceStub: RegistrationService = fixture.debugElement.injector.get(
        RegistrationService
      );
      spyOn(registrationServiceStub, 'VerifyOTP').and.callThrough();
      component.CheckOTP();
      expect(registrationServiceStub.VerifyOTP).toHaveBeenCalled();
    });
  });
  describe('checkUserNameAvailability', () => {
    it('makes expected calls', () => {
      const authRouteServiceStub: AuthRouteService = fixture.debugElement.injector.get(
        AuthRouteService
      );
      spyOn(authRouteServiceStub, 'CheckUsername').and.callThrough();
      component.checkUserNameAvailability();
      expect(authRouteServiceStub.CheckUsername).toHaveBeenCalled();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const registrationServiceStub: RegistrationService = fixture.debugElement.injector.get(
        RegistrationService
      );
      const utilServiceStub: UtilService = fixture.debugElement.injector.get(
        UtilService
      );
      const authRouteServiceStub: AuthRouteService = fixture.debugElement.injector.get(
        AuthRouteService
      );
      spyOn(component, 'validateForm').and.callThrough();
      spyOn(component, 'createUserObj').and.callThrough();
      spyOn(component, 'createSequrityQuestionObj').and.callThrough();
      spyOn(registrationServiceStub, 'RegisterMember').and.callThrough();
      spyOn(utilServiceStub, 'checkPasswordValidation').and.callThrough();
      spyOn(authRouteServiceStub, 'CheckUsername').and.callThrough();
      spyOn(authRouteServiceStub, 'RegisterUser').and.callThrough();
      spyOn(authRouteServiceStub, 'DeleteUser').and.callThrough();
      component.onSubmit();
      expect(component.validateForm).toHaveBeenCalled();
      expect(component.createUserObj).toHaveBeenCalled();
      expect(component.createSequrityQuestionObj).toHaveBeenCalled();
      expect(registrationServiceStub.RegisterMember).toHaveBeenCalled();
      expect(utilServiceStub.checkPasswordValidation).toHaveBeenCalled();
      expect(authRouteServiceStub.CheckUsername).toHaveBeenCalled();
      expect(authRouteServiceStub.RegisterUser).toHaveBeenCalled();
      expect(authRouteServiceStub.DeleteUser).toHaveBeenCalled();
    });
  });
});
