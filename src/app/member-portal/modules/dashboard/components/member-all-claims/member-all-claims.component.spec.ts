import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { ConfirmationService } from 'primeng/api';
import { ClamesFilter } from '../../Modals/ClamesFilter';
import { RoutesConstants } from '@core/constants/route-constants';
import { MemberAllClaimsComponent } from './member-all-claims.component';
import { COMMON_MODULES } from '@app/core/commonModules';

describe('MemberAllClaimsComponent', () => {
  let component: MemberAllClaimsComponent;
  let fixture: ComponentFixture<MemberAllClaimsComponent>;
  beforeEach(() => {
    const dashboardServiceStub = {
      getMemberDetailsForDashBoard: arg1 => ({ subscribe: () => ({}) }),
      getUserDependentClaimData: arg1 => ({ subscribe: () => ({}) }),
      getClaimDetails: clamesFilter1 => ({ subscribe: () => ({}) }),
      downloadEOBpdf: arg1 => ({ subscribe: () => ({}) })
    };
    const confirmationServiceStub = { confirm: object1 => ({}) };
    const clamesFilterStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
      declarations: [MemberAllClaimsComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceStub },
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        { provide: ClamesFilter, useValue: clamesFilterStub }
      ]
    });
    fixture = TestBed.createComponent(MemberAllClaimsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('routerConstants defaults to: RoutesConstants', () => {
    expect(component.routerConstants).toEqual(RoutesConstants);
  });
  it('defaultPaginator defaults to: false', () => {
    expect(component.defaultPaginator).toEqual(false);
  });
  it('eobIdentifier defaults to: 0', () => {
    expect(component.eobIdentifier).toEqual(0);
  });
  it('columns defaults to: [, , , , , , , , , , ,]', () => {
    expect(component.columns).toEqual([, , , , , , , , , ,,]);
  });
  it('filesPerPage defaults to: 10', () => {
    expect(component.filesPerPage).toEqual(11);
  });
  it('dependentMembers defaults to: []', () => {
    expect(component.dependentMembers).toEqual([]);
  });
  it('sortOrder defaults to: desc', () => {
    expect(component.sortOrder).toEqual('desc');
  });
  it('sortField defaults to: serviceStartDate', () => {
    expect(component.sortField).toEqual('serviceStartDate');
  });
  it('pageNumber defaults to: 0', () => {
    expect(component.pageNumber).toEqual(0);
  });
  it('filterAttribute defaults to: yeartodate', () => {
    expect(component.filterAttribute).toEqual('yeartodate');
  });
  it('within defaults to: [, , , ]', () => {
    expect(component.within).toEqual([, , ,]);
  });
  it('claimTypeId defaults to: 1', () => {
    expect(component.claimTypeId).toEqual(1);
  });
  describe('dependeentMemberData', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      const clamesFilterStub: ClamesFilter = fixture.debugElement.injector.get(
        ClamesFilter
      );
      spyOn(dashboardServiceStub, 'getClaimDetails').and.callThrough();
      component.dependeentMemberData(clamesFilterStub);
      expect(dashboardServiceStub.getClaimDetails).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      spyOn(component, 'dependeentMemberData').and.callThrough();
      spyOn(component, 'onFilterSelect').and.callThrough();
      spyOn(
        dashboardServiceStub,
        'getMemberDetailsForDashBoard'
      ).and.callThrough();
      spyOn(
        dashboardServiceStub,
        'getUserDependentClaimData'
      ).and.callThrough();
      component.ngOnInit();
      expect(component.dependeentMemberData).toHaveBeenCalled();
      expect(component.onFilterSelect).toHaveBeenCalled();
      expect(
        dashboardServiceStub.getMemberDetailsForDashBoard
      ).toHaveBeenCalled();
      expect(dashboardServiceStub.getUserDependentClaimData).toHaveBeenCalled();
    });
  });
  describe('OpenEOB', () => {
    it('makes expected calls', () => {
      const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
        DashboardService
      );
      spyOn(dashboardServiceStub, 'downloadEOBpdf').and.callThrough();
      component.OpenEOB();
      expect(dashboardServiceStub.downloadEOBpdf).toHaveBeenCalled();
    });
  });
  describe('onDependentSelected', () => {
    it('makes expected calls', () => {
      spyOn(component, 'dependeentMemberData').and.callThrough();
      component.onDependentSelected();
      expect(component.dependeentMemberData).toHaveBeenCalled();
    });
  });
  describe('onWithinSelected', () => {
    it('makes expected calls', () => {
      spyOn(component, 'dependeentMemberData').and.callThrough();
      component.onWithinSelected();
      expect(component.dependeentMemberData).toHaveBeenCalled();
    });
  });
});
