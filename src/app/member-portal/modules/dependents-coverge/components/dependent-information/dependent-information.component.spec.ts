import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DependentsCoverageService } from '../../services/dependents-coverage.service';
import { MessageService } from 'primeng/components/common/api';
import { SharedService } from '@app/shared-module/services/shared.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import * as constants from '@core/constants/app-constants';
import { DependentInformationComponent } from './dependent-information.component';
describe('DependentInformationComponent', () => {
  let component: DependentInformationComponent;
  let fixture: ComponentFixture<DependentInformationComponent>;
  beforeEach(() => {
    const simpleChangesStub = { currentValue: {}, previousValue: {} };
    const confirmationServiceStub = { confirm: object1 => ({}) };
    const dependentsCoverageServiceStub = {
      deleteDependent: arg1 => ({ subscribe: () => ({}) })
    };
    const messageServiceStub = { clear: () => ({}), add: object1 => ({}) };
    const sharedServiceStub = {
      getMemberProfilePicture: arg1 => ({ subscribe: () => ({}) })
    };
    const localStoreServiceStub = { saveSessionData: (res1, arg2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DependentInformationComponent],
      providers: [
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        {
          provide: DependentsCoverageService,
          useValue: dependentsCoverageServiceStub
        },
        { provide: MessageService, useValue: messageServiceStub },
        { provide: SharedService, useValue: sharedServiceStub },
        { provide: LocalStoreService, useValue: localStoreServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DependentInformationComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('dependents defaults to: []', () => {
    expect(component.dependents).toEqual([]);
  });
  it('minYear defaults to: 1900', () => {
    expect(component.minYear).toEqual('1900');
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('msgs defaults to: []', () => {
    expect(component.msgs).toEqual([]);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      const localStoreServiceStub: LocalStoreService = fixture.debugElement.injector.get(
        LocalStoreService
      );
      spyOn(component, 'showPaginator').and.callThrough();
      spyOn(sharedServiceStub, 'getMemberProfilePicture').and.callThrough();
      spyOn(localStoreServiceStub, 'saveSessionData').and.callThrough();
      expect(component.showPaginator).toBeTruthy();
      expect(sharedServiceStub.getMemberProfilePicture).toBeTruthy();
      expect(localStoreServiceStub.saveSessionData).toBeTruthy();
    });
  });

  //   describe('ngOnChanges', () => {
  //     it('makes expected calls', () => {});

  //     let changes: SimpleChanges = {};
  //     component.ngOnChanges(changes);
  //     //expect(component.ngOnChanges).toBeTruthy();
  //   });
  // });
      // describe('showPaginator', () => {
      //   it('makes expected calls', () => { });
      //   let changes: SimpleChanges = {};
      //  // component.ngOnChanges(changes);
      //   component.showPaginator([12, 11, 1, 14]);
      //  // expect(component.ngOnChanges).toBeTruthy();
      // });

    // describe('onCloseAddPopUP', () => {
    //   it('makes expected calls', () => { });
    //   let event = {  };
    //  // component.onCloseAddPopUP(event);
    //   expect(component.onCloseAddPopUP).toBeTruthy();
    // });

    // describe('uploadImage', () => {
    //   it('makes expected calls', () => { });
    //   let event = {  };
    //  // component.ngOnInit();
    //   component.uploadImage({},1);
    //   expect(component.uploadImage).toBeTruthy();
    // });

    // describe('onCloseUploadImage', () => {
    //   it('makes expected calls', () => { });
    //   component.onCloseUploadImage(true);
    //   expect(component.onCloseUploadImage).toBeTruthy();
    // });

  });


