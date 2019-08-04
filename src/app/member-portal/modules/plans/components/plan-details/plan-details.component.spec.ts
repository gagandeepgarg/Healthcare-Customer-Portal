import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlansService } from '../../services/plans.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PlanDetailsComponent } from './plan-details.component';
import * as constants from '@core/constants/app-constants';
import { of } from 'rxjs';

describe('PlanDetailsComponent', () => {
  let component: PlanDetailsComponent;
  let fixture: ComponentFixture<PlanDetailsComponent>;
  let plansServiceStub;
  beforeEach(() => {

    plansServiceStub = {
      GetPlanDetailsBasedOnUserId: userId1 => ({
        subscribe: () => {
        }
      }),
      GetUserPlanDetailsFile: guideBookId1 => ({ subscribe: () => { } })
    };
    const domSanitizerStub = { bypassSecurityTrustResourceUrl: arg1 => ({}) };
    spyOn(plansServiceStub, 'GetPlanDetailsBasedOnUserId').and.returnValue(of({}));
    spyOn(plansServiceStub, 'GetUserPlanDetailsFile').and.returnValue(of({}));
    spyOn(
      domSanitizerStub,
      'bypassSecurityTrustResourceUrl'
    ).and.callThrough();
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PlanDetailsComponent],
      providers: [
        { provide: PlansService, useValue: plansServiceStub },
        { provide: DomSanitizer, useValue: domSanitizerStub }
      ]
    });
    fixture = TestBed.createComponent(PlanDetailsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('iconName defaults to: constants.ICON_PLAN_DETAILS', () => {
    expect(component.iconName).toEqual(constants.ICON_PLAN_DETAILS);
  });
  it('headerHtml defaults to: Plan Details', () => {
    expect(component.headerHtml).toEqual('Plan Details');
  });
});
