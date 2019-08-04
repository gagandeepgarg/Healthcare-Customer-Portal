import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CoreDataService } from '@core/services/core-data.service';
import * as constants from '@core/constants/app-constants';
import { MemberRegistrationComponent } from './member-registration.component';
const REGISTER_ACTIVE = {
  personalInfo: 0,
  createAccount: 1
};
describe('MemberRegistrationComponent', () => {
  let component: MemberRegistrationComponent;
  let fixture: ComponentFixture<MemberRegistrationComponent>;
  beforeEach(() => {
    const routerStub = { navigate: (array1, navigationExtras2) => ({}) };
    const coreDataServiceStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MemberRegistrationComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: CoreDataService, useValue: coreDataServiceStub }
      ]
    });
    spyOn(MemberRegistrationComponent.prototype, 'Init');
    fixture = TestBed.createComponent(MemberRegistrationComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('activeIndex defaults to: REGISTER_ACTIVE.personalInfo', () => {
    expect(component.activeIndex).toEqual(REGISTER_ACTIVE.personalInfo);
  });
  it('counter defaults to: 10', () => {
    expect(component.counter).toEqual(10);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('iconName defaults to: constants.ICON_ACTIVATE', () => {
    expect(component.iconName).toEqual(constants.ICON_ACTIVATE);
  });
  it('headerHtml defaults to:  Activate your <b>Aliera Healthcare</b> account', () => {
    expect(component.headerHtml).toEqual(
      ' Activate your <b>Aliera Healthcare</b> account'
    );
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(MemberRegistrationComponent.prototype.Init).toHaveBeenCalled();
    });
  });
  describe('ngAfterViewInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'setCompletedTabStyling').and.callThrough();
      component.ngAfterViewInit();
      expect(component.setCompletedTabStyling).toHaveBeenCalled();
    });
  });
});
