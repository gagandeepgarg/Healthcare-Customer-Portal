import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ClamesFilter } from '../dashboard/Modals/ClamesFilter';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { FetchClaimsByExternalId } from './dashboard.selector';
import { ClaimsRequested } from './dashboard.actions';
import { tap, filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  snapShotOpen = false;
  sliderValue1: any = 25;
  sliderValue2: any = 6;
  sliderValue3: any = 3000;
  sliderValue4: any = 3;
  sliderValue5: any = 600000;
  sliderValue6: any = 5;
  cities = [];
  routerConstants = RoutesConstants;
  constants = constants;
  display: boolean;
  noOfDays: string;
  userId: string;
  claimDetails: any;
  medicalClaims: any[];
  dentalClaims: any[];
  visionClaims: any[];
  cliams: any[];
  columns: any[];
  rows = 5;
  dependentMembers: SelectItem[] = [];
  onMedicalselected: boolean;
  onDentalselected: boolean;
  onVisionselected: boolean;
  selectedDependent: any;
  externalId: any;
  userClaimsReq: ClamesFilter;
  plansCovered: any;
  EOBClickedFlag = false;
  constructor(private dashboardService: DashboardService, private store: Store<AppState>,
    private router: Router) { }
  async ngOnInit() {
    this.createColumns();
    sessionStorage.removeItem('filterFlag');
    sessionStorage.removeItem('dropDownFilter');
    this.userId = sessionStorage.getItem('userId');
    this.dashboardService.getMemberDetailsForDashBoard(this.userId).subscribe((res: any) => {
      this.plansCovered = res.PlansCovered;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
    this.dashboardService.getUserDependentClaimData(this.userId).subscribe((res: any[]) => {
      if (res) {
        this.dependentMembers = res.map(function (elm) {
          return {
            value: elm['ExternalId'],
            label: elm['FullName']
          };
        });
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
    if (sessionStorage.getItem('isShowChangePassword') === null || sessionStorage.getItem('isShowChangePassword') === 'true') {
      setTimeout(() => {
        this.checkPasswordExp();
      }, 1000);
    }
    this.userClaimsReq = {
      externalMemberId: null,
      userId: this.userId,
      pageSize: 100,
      pageNumber: 0,
      filterAttribute: 'lasttwelevemonths',
      sortAttribute: 'ServiceStartDate',
      sortOrder: 'desc'
    };
    await this.dependentMemberData(this.userClaimsReq);
  }
  isMobile() {
    return window.innerWidth <= 640;
  }

  dependentMemberData(clamesFilter: ClamesFilter) {
    // return
    this.store.pipe(
      select(FetchClaimsByExternalId(clamesFilter.externalMemberId)),
      tap(claims => {
        if (!claims) {
          this.store.dispatch(new ClaimsRequested(clamesFilter.externalMemberId));
        }
      }),
      filter(claim => !!claim),
      first()
    );


    this.dashboardService.getClaimDetails(clamesFilter).subscribe((res: any[]) => {
      this.onMedicalselected = true;
      if (res && res.length > 0) {
        this.medicalClaims = res.filter(cl => cl.ClaimTypeID === 1);
        this.dentalClaims = res.filter(cl => cl.ClaimTypeID === 2);
        this.visionClaims = res.filter(cl => cl.ClaimTypeID === 3);
        // take top 5 claims
        if (this.medicalClaims && this.medicalClaims.length > 5) {
          this.medicalClaims = this.medicalClaims.slice(0, 5);
        }
        if (this.dentalClaims && this.dentalClaims.length > 5) {
          this.dentalClaims = this.dentalClaims.slice(0, 5);
        }
        if (this.visionClaims && this.visionClaims.length > 5) {
          this.visionClaims = this.visionClaims.slice(0, 5);
        }
        if (this.medicalClaims.length > 0) {
          this.cliams = this.medicalClaims;
          this.externalId = this.medicalClaims[0].MemberExternalID;
        }
      } else {
        this.cliams = [];
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  later() {
    sessionStorage.setItem('isShowChangePassword', 'false');
    this.display = false;
  }
  onDependentSelected() {
    this.onMedicalselected = true;
    this.onDentalselected = false;
    this.onVisionselected = false;
    sessionStorage.setItem('dropDownFilter', JSON.stringify(this.selectedDependent));
    this.userClaimsReq.externalMemberId = this.selectedDependent.value;
    this.userClaimsReq.userId = this.userId;
    this.dependentMemberData(this.userClaimsReq);
  }

  cancel() {
    sessionStorage.setItem('isShowChangePassword', 'false');
    this.display = false;
  }

  changePassword() {
    sessionStorage.setItem('isShowChangePassword', 'false');
    this.router.navigate([this.routerConstants.Dashboard + '/' + this.routerConstants.ChangePassword]);
  }
  onViewAll() {
    this.router.navigate([this.routerConstants.Dashboard + '/' + this.routerConstants.ClaimsAll]);
  }
  onFilterSelect(name: string) {
    switch (name) {
      case this.constants.MEDICAL:
        this.onMedicalselected = true;
        this.onDentalselected = false;
        this.onVisionselected = false;
        this.cliams = this.medicalClaims;
        sessionStorage.setItem('filterFlag', '1');
        break;
      case this.constants.DENTAL:
        this.onDentalselected = true;
        this.onMedicalselected = false;
        this.onVisionselected = false;
        this.cliams = this.dentalClaims;
        sessionStorage.setItem('filterFlag', '2');
        break;
      case this.constants.VISION:
        this.onVisionselected = true;
        this.onMedicalselected = false;
        this.onDentalselected = false;
        this.cliams = this.visionClaims;
        sessionStorage.setItem('filterFlag', '3');
        break;
    }
  }

  checkPasswordExp() {
    this.dashboardService
      .checkUserPasswordExpire(this.userId)
      .subscribe((res: any) => {
        if (res.item2) {
          sessionStorage.setItem('isShowChangePassword', res.item2);
          this.display = res.item2;
          this.noOfDays = res.item1;
        }
      });
  }
  createColumns() {
    this.columns = [
      { field: 'claimsNumber', header: 'Request Number', width: '9%' },
      { field: 'serviceDate', header: 'Service Start Date', width: '8%' },
      { field: 'serviceEndDate', header: 'Service End Date', width: '8%' },
      { field: 'serviceDescription', header: 'Service Description', width: '17%' },
      { field: 'billedAmount', header: 'Billed Amount', width: '7%' },
      { field: 'planDiscountedRate', header: 'Plan Discounted Rate', width: '8%' },
      { field: 'planPaidAmount', header: 'Plan Paid Amount', width: '7%' },
      { field: 'dueAmount', header: 'Member Owes', width: '7%' },
      { field: 'msraAmount', header: 'Amount Applied to MSRA', width: '13%' },
      { field: 'facilityName', header: 'Facility Name', width: '9%' },
      { field: 'facilityName', header: 'EOB', width: '7%' }
    ];
  }
}
