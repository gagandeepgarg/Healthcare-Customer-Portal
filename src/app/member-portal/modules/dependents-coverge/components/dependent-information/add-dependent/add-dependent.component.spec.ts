import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA,   } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/components/common/api';
import { DependentsCoverageService } from '../../../services/dependents-coverage.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import * as constants from '@core/constants/app-constants';
import { AddDependentComponent } from './add-dependent.component';
describe('AddDependentComponent', () => {
  let component: AddDependentComponent;
  let fixture: ComponentFixture<AddDependentComponent>;
  beforeEach(() => {
    const simpleChangesStub = {};
    const abstractControlStub = { value: { trim: () => ({}) } };
    const formBuilderStub = { group: object1 => ({}) };
    const confirmationServiceStub = { confirm: object1 => ({}) };
    const datePipeStub = {};
    const messageServiceStub = { clear: () => ({}), add: object1 => ({}) };
    const dependentsCoverageServiceStub = {
      addDependent: obj1 => ({ subscribe: () => ({}) })
    };
    const sharedServiceStub = {
      uploadUserPictureForDMS: arg1 => ({ subscribe: () => ({}) }),
      uploadUserPictureForMP: upateAvatharToPM1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = { picUploadNotifier: { next: () => ({}) } };
    const localStoreServiceStub = { saveSessionData: (arg1, arg2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddDependentComponent],
      providers: [
        // { provide: SimpleChanges, useValue: simpleChangesStub },
        { provide: AbstractControl, useValue: abstractControlStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        { provide: DatePipe, useValue: datePipeStub },
        { provide: MessageService, useValue: messageServiceStub },
        {
          provide: DependentsCoverageService,
          useValue: dependentsCoverageServiceStub
        },
        { provide: SharedService, useValue: sharedServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: LocalStoreService, useValue: localStoreServiceStub }
      ]
    });
    spyOn(AddDependentComponent.prototype, 'createForm');
    fixture = TestBed.createComponent(AddDependentComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('minYear defaults to: 1900', () => {
    expect(component.minYear).toEqual('1900');
  });
  it('msgs defaults to: []', () => {
    expect(component.msgs).toEqual([]);
  });
  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(AddDependentComponent.prototype.createForm).toHaveBeenCalled();
    });
  });
  describe('createForm', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder
      );
      spyOn(formBuilderStub, 'group').and.callThrough();
      (<jasmine.Spy>component.createForm).and.callThrough();
      component.createForm();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getYearRange').and.callThrough();
      spyOn(component, 'getDropDownValues').and.callThrough();
      component.ngOnInit();
      expect(component.getYearRange).toHaveBeenCalled();
      expect(component.getDropDownValues).toHaveBeenCalled();
    });
  });
  describe('validateSpouseAge', () => {
    it('makes expected calls', () => {
      // component.ngOnInit();
       spyOn(component, 'getAge').and.returnValue(true);
      component.validateSpouseAge();
      expect(component.validateSpouseAge).toHaveBeenCalled();
    });
  });
  describe('validateChildAge', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAge').and.callThrough();
      component.validateChildAge();
      expect(component.getAge).toHaveBeenCalled();
    });
  });
  // describe('validateDupicateDependents', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'convertDate').and.callThrough();
  //     spyOn(component, 'convertDateInUS').and.callThrough();
  //     component.validateDupicateDependents();
  //     expect(component.convertDate).toHaveBeenCalled();
  //     expect(component.convertDateInUS).toHaveBeenCalled();
  //   });
  // });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const confirmationServiceStub: ConfirmationService = fixture.debugElement.injector.get(
        ConfirmationService
      );
      const messageServiceStub: MessageService = fixture.debugElement.injector.get(
        MessageService
      );
      const dependentsCoverageServiceStub: DependentsCoverageService = fixture.debugElement.injector.get(
        DependentsCoverageService
      );
      // spyOn(component, 'validateDupicateDependents').and.callThrough();
      spyOn(component, 'validateSpouseAge').and.callThrough();
      spyOn(component, 'validateChildAge').and.callThrough();
      spyOn(component, 'convertDateInUS').and.callThrough();
      spyOn(component, 'uploadTOServer').and.callThrough();
      spyOn(confirmationServiceStub, 'confirm').and.callThrough();
      spyOn(messageServiceStub, 'clear').and.callThrough();
      spyOn(messageServiceStub, 'add').and.callThrough();
      spyOn(dependentsCoverageServiceStub, 'addDependent').and.callThrough();
      component.onSubmit();
      // expect(component.validateDupicateDependents).toHaveBeenCalled();
      expect(component.validateSpouseAge).toHaveBeenCalled();
      expect(component.validateChildAge).toHaveBeenCalled();
      expect(component.convertDateInUS).toHaveBeenCalled();
      expect(component.uploadTOServer).toHaveBeenCalled();
      expect(confirmationServiceStub.confirm).toHaveBeenCalled();
      expect(messageServiceStub.clear).toHaveBeenCalled();
      expect(messageServiceStub.add).toHaveBeenCalled();
      expect(dependentsCoverageServiceStub.addDependent).toHaveBeenCalled();
    });
  });
});
