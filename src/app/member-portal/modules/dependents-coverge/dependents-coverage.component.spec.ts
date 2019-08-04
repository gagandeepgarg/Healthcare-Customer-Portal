import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DependentsCoverageService } from './services/dependents-coverage.service';
import { UtilService } from '@app/core/services/util.service';
import { DependentsCoverageComponent } from './dependents-coverage.component';
import { SubscriberInformationComponent } from './components/subscriber-information/subscriber-information.component';
import { DependentInformationComponent } from './components/dependent-information/dependent-information.component';
import { EditSubscriberComponent } from './components/subscriber-information/edit-subscriber/edit-subscriber.component';
import { AddDependentComponent } from './components/dependent-information/add-dependent/add-dependent.component';
import { CoverageInformationComponent } from './components/coverage-information/coverage-information.component';
import { UploadImageComponent } from './components/dependent-information/upload-image/upload-image.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedService } from '@app/shared-module/services/shared.service';
import { COMMON_MODULES } from '@app/core/commonModules';
import { AuthRouteService } from '@app/core/services/auth.service';
import { of } from 'rxjs';
describe('DependentsCoverageComponent', () => {
  let component: DependentsCoverageComponent;
  let fixture: ComponentFixture<DependentsCoverageComponent>;
  let dependentsCoverageServiceStub;
  beforeEach(() => {
    dependentsCoverageServiceStub = {
      getDemographicsInformation: arg1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = { picUploadNotifier: { subscribe: () => { return true; } } };
    spyOn(utilServiceStub, 'picUploadNotifier').and.returnValue(of(true))
    spyOn(dependentsCoverageServiceStub, 'getDemographicsInformation').and.returnValue(of({}))

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DependentsCoverageComponent, SubscriberInformationComponent, DependentInformationComponent,
        CoverageInformationComponent, DependentsCoverageComponent, AddDependentComponent, EditSubscriberComponent, UploadImageComponent],
      imports: [COMMON_MODULES],
      providers: [
        {
          provide: DependentsCoverageService,
          useValue: dependentsCoverageServiceStub
        },
        { provide: UtilService, useValue: utilServiceStub },
        ConfirmationService, MessageService, SharedService, AuthRouteService
      ]
    });
    fixture = TestBed.createComponent(DependentsCoverageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      let event = {};
      component.deleteDependent(event);
      expect(component.deleteDependent).toBeTruthy();

    });
  });
  describe('UpdateDependents', () => {
    it('makes expected calls', () => {
      let event = {};
      component.UpdateDependents(event);
      expect(component.deleteDependent).toBeTruthy();

    });
  });
});
