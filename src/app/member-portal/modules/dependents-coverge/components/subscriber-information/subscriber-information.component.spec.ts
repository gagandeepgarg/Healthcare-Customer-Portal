import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DependentsCoverageService } from '../../services/dependents-coverage.service';
import { SubscriberInformationComponent } from './subscriber-information.component';
describe('SubscriberInformationComponent', () => {
  let component: SubscriberInformationComponent;
  let fixture: ComponentFixture<SubscriberInformationComponent>;
  beforeEach(() => {
   
    const dependentsCoverageServiceStub = {
      getStates: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SubscriberInformationComponent],
      providers: [
       {
          provide: DependentsCoverageService,
          useValue: dependentsCoverageServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(SubscriberInformationComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('states defaults to: []', () => {
    expect(component.states).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dependentsCoverageServiceStub: DependentsCoverageService = fixture.debugElement.injector.get(
        DependentsCoverageService
      );
      spyOn(dependentsCoverageServiceStub, 'getStates').and.callThrough();
      component.ngOnInit();
      expect(dependentsCoverageServiceStub.getStates).toHaveBeenCalled();
    });
  });
});
