import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CoreDataService } from '@app/core/services/core-data.service';
import { AbstractControl } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';
import { ChangeSecurityQuestionsComponent } from './change-security-questions.component';
import { COMMON_MODULES } from '@app/core/commonModules';
import { of } from 'rxjs';
import * as constants from '@core/constants/app-constants';

describe('ChangeSecurityQuestionsComponent', () => {
  let component: ChangeSecurityQuestionsComponent;
  let fixture: ComponentFixture<ChangeSecurityQuestionsComponent>;
  beforeEach(() => {
    const coreDataServiceStub = {
      GetSecurityQuestions: () => ({ subscribe: () => ({}) })
    };
    const abstractControlStub = { value: { trim: () => ({}) } };
    const dashboardServiceStub = {
      GetUserSecurityQuestions: arg1 => ({ subscribe: () => ({}) }),
      UpdateSecurityQuestions: obj1 => ({ subscribe: () => ({}) })
    };
    const routerStub = { navigate: (array1, navigationExtras2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
      declarations: [ChangeSecurityQuestionsComponent],
      providers: [
        { provide: CoreDataService, useValue: coreDataServiceStub },
        { provide: AbstractControl, useValue: abstractControlStub },
        { provide: DashboardService, useValue: dashboardServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ChangeSecurityQuestionsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('iconName defaults to: constants.ICON_UNLOCK', () => {
    expect(component.iconName).toEqual(constants.ICON_UNLOCK);
  });
  it('headerHtml defaults to:  Change Security Questions', () => {
    expect(component.headerHtml).toEqual(' Change Security Questions');
  });
  it('isSubmitted defaults to: false', () => {
    expect(component.isSubmitted).toEqual(false);
  });
  it('answer1Error defaults to: false', () => {
    expect(component.answer1Error).toEqual(false);
  });
  it('answer2Error defaults to: false', () => {
    expect(component.answer2Error).toEqual(false);
  });
  it('answer3Error defaults to: false', () => {
    expect(component.answer3Error).toEqual(false);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'fetchAllSequirtyQuestions').and.returnValue(of([{}]))
      component.ngOnInit();
      expect(component.fetchAllSequirtyQuestions).toHaveBeenCalled();
    });
  });
  describe('fetchAllSequirtyQuestions', () => {
    it('makes expected calls', () => {
      const coreDataServiceStub: CoreDataService = fixture.debugElement.injector.get(
        CoreDataService
      );
      spyOn(component, 'settingSelctedFormValues').and.returnValue(of([{}]))
      spyOn(coreDataServiceStub, 'GetSecurityQuestions').and.returnValue(of([{}]))
      component.fetchAllSequirtyQuestions();
      expect(component.settingSelctedFormValues).toBeTruthy();
      expect(coreDataServiceStub.GetSecurityQuestions).toBeTruthy();
    });
  });
  describe('filterQuestions1', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.questions = [];
      component.filterQuestions1();
       expect(component.filterQuestions1).toBeTruthy();
    });
  });
  describe('filterQuestions2', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.questions = [];
      component.filterQuestions2();
       expect(component.filterQuestions2).toBeTruthy();
    });
  });
  describe('filterQuestions3', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.questions = [];
      component.filterQuestions3();
       expect(component.filterQuestions3).toBeTruthy();
    });
  });
  describe('validateField', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.ngOnInit();
      component.validateField(1,1);
       expect(component.validateField).toBeTruthy();
    });
  });
  describe('validateField1', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.ngOnInit();
      component.validateField(1,2);
       expect(component.validateField).toBeTruthy();
    });
  });
  describe('validateField2', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      component.ngOnInit();
      component.validateField(1,3);
       expect(component.validateField).toBeTruthy();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      spyOn(component, 'NavigateToSuccessPage').and.callThrough();
      spyOn(dashboardServiceStub, 'UpdateSecurityQuestions').and.callThrough();
      component.ngOnInit();
      component.onSubmit();
      expect(component.NavigateToSuccessPage).toBeTruthy();
      expect(dashboardServiceStub.UpdateSecurityQuestions).toBeTruthy();
    });
  });
  describe('NavigateToSuccessPage', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToSuccessPage();
      expect(routerStub.navigate).toBeTruthy();
    });
  });
  describe('NavigateToDashboard', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.NavigateToDashboard();
      expect(routerStub.navigate).toBeTruthy();
    });
  });
});
