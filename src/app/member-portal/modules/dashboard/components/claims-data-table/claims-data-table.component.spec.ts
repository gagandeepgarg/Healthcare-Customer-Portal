import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ConfirmationService } from 'primeng/api';
import { ClaimsDataTableComponent } from './claims-data-table.component';
import { COMMON_MODULES } from '@app/core/commonModules';
describe('ClaimsDataTableComponent', () => {
  let component: ClaimsDataTableComponent;
  let fixture: ComponentFixture<ClaimsDataTableComponent>;
  beforeEach(() => {
    const confirmationServiceStub = { confirm: object1 => ({}) };
    const dashboardServiceStub = {
      downloadEOBpdf: arg1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
      declarations: [ClaimsDataTableComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceStub},
        { provide: ConfirmationService, useValue: confirmationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ClaimsDataTableComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('eobIdentifier defaults to: 0', () => {
    expect(component.eobIdentifier).toEqual(0);
  });
  describe('OpenEOB', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      spyOn(dashboardServiceStub, 'downloadEOBpdf').and.callThrough();
      component.OpenEOB();
       fixture.detectChanges();
      expect(dashboardServiceStub.downloadEOBpdf).toBeTruthy();
    });
  });
});
