import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { ClamesFilter } from '../../Modals/ClamesFilter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-member-all-claims',
  templateUrl: './member-all-claims.component.html',
  styleUrls: ['./member-all-claims.component.scss']
})
export class MemberAllClaimsComponent implements OnInit {
  routerConstants = RoutesConstants;
  display: boolean;
  noOfDays: string;
  userId: string;
  claimDetails: any;
  medicalClaims: any[];
  dentalClaims: any[];
  visionClaims: any[];
  cliams: any[];
  plansCovered: any;
  defaultPaginator = false;
  eobIdentifier = 0;
  columns: any[] = [
    // { field: 'claimsTypeDescription', header: 'Claim Type', width: '6em' },
    { field: 'claimsNumber', header: 'Request Number', width: '12%', sortIdentifier: 'claimsNumber' },
    { field: 'serviceDate', header: 'Service Start Date', width: '8%', sortIdentifier: 'serviceStartDate' }, //
    { field: 'serviceEndDate', header: 'Service End Date', width: '8%', sortIdentifier: 'serviceEndDate' },
    { field: 'serviceDescription', header: 'Service Description', width: '18%' },
    { field: 'billedAmount', header: 'Billed Amount', width: '7%' },
    { field: 'planDiscountedRate', header: 'Plan Discounted Rate', width: '8%' },
    { field: 'planPaidAmount', header: 'Plan Paid Amount', width: '7%' },
    { field: 'dueAmount', header: 'Member Owes', width: '7%' },
    { field: 'msraAmount', header: 'Amount Applied to MSRA', width: '11%' },
    { field: 'facilityName', header: 'Facility Name', width: '9%', sortIdentifier: 'facilityName' },
    { field: 'facilityName', header: 'EOB', width: '5%' }
  ];
  filesPerPage = 10;
  totalFilesCount: any;
  dependentMembers: SelectItem[] = [];
  onMedicalselected: boolean;
  onDentalselected: boolean;
  onVisionselected: boolean;
  selectedDependent: SelectItem;
  withinValue: SelectItem;
  sortByValue: SelectItem;
  externalId: any;
  userClaimsReq: ClamesFilter;
  sortOrder = 'desc';
  sortField = 'serviceStartDate';
  pageNumber = 1;
  totalNumberOfRecords: number;
  filterAttribute = 'yeartodate';
  within: SelectItem[] = [
    { label: 'Year to Date', value: 'yeartodate' },
    { label: 'Last 3 months', value: 'lastthreemonths' },
    { label: 'Last 6 months', value: 'lastsixmonths' },
    { label: 'Last 12 months', value: 'lasttwelevemonths' }
  ];
  testData: string;
  claimTypeId = 1;
  initialLoad = false;
  constructor(private dashboardService: DashboardService, private confirmationService: ConfirmationService) { }
  ngOnInit() {
    this.initialLoad = true;
    this.userId = sessionStorage.getItem('userId');
    this.FetchPlansCoveredDetails();
    this.LoadClaimData();
    const filterFlag = sessionStorage.getItem('filterFlag');
    if (filterFlag) {
      this.onFilterSelect(parseInt(filterFlag, 10));
    } else {
      this.onFilterSelect(0);
    }
  }
  FetchPlansCoveredDetails() {
    this.dashboardService.getMemberDetailsForDashBoard(this.userId).subscribe((res: any) => {
      this.plansCovered = res.PlansCovered;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  LoadClaimData() {
    this.dashboardService.getUserDependentClaimData(this.userId).subscribe((res: any[]) => {
      if (res) {
        /* const dependentddlvalues = [];
        res.forEach(re => {
          dependentddlvalues.push({ label: re.fullName, value: re.externalId });
        }); */
        // this.dependentMembers = dependentddlvalues;
        // this.dependentMembers = res.map(function (elm) {
        this.dependentMembers = res.map(function (elm) {
          return {
            label: elm['FullName'],
            value: elm['ExternalId']
          };
        });
        const dropDownFilter = JSON.parse(sessionStorage.getItem('dropDownFilter'));
        this.userClaimsReq = {
          externalMemberId: null,
          userId: this.userId,
          pageSize: 10,
          pageNumber: this.pageNumber,
          filterAttribute: 'yeartodate',
          sortAttribute: 'ServiceStartDate',
          sortOrder: 'desc',
          claimsType: this.claimTypeId
        };
        if (dropDownFilter) {
          this.selectedDependent = this.dependentMembers.find(dm => dm.value === dropDownFilter.value);
          this.userClaimsReq.externalMemberId = dropDownFilter.value;
          this.dependeentMemberData(this.userClaimsReq);
        } else {
          this.selectedDependent = this.dependentMembers[0].value;
          this.dependeentMemberData(this.userClaimsReq);
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  dependeentMemberData(clamesFilter: ClamesFilter) {
    this.dashboardService.getClaimDetails(clamesFilter).subscribe((res: any[]) => {
      if (res) {
        switch (this.claimTypeId) {
          case 1:
            this.medicalClaims = res.filter(cl => cl.ClaimTypeID === 1);
            this.cliams = this.medicalClaims;
            break;
          case 2:
            this.dentalClaims = res.filter(cl => cl.ClaimTypeID === 2);
            this.cliams = this.dentalClaims;
            break;
          case 3:
            this.visionClaims = res.filter(cl => cl.ClaimTypeID === 3);
            this.cliams = this.visionClaims;
            break;
          default:
            this.medicalClaims = res.filter(cl => cl.ClaimTypeID === 1);
            this.cliams = this.medicalClaims;
            break;
        }
        if (this.cliams && this.cliams.length > 0) {
          this.totalNumberOfRecords = this.cliams[0].TotalNoOfItems;
          if (this.totalNumberOfRecords > 10) {
            this.defaultPaginator = true;
          } else {
            this.defaultPaginator = false;
          }
        } else {
          this.totalNumberOfRecords = 0;
          this.defaultPaginator = false;
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

  OpenEOB() {
    if (this.eobIdentifier !== 0) {
      this.dashboardService.downloadEOBpdf(this.eobIdentifier).subscribe((fileData: any) => {
        if (fileData) {
          const fileURL = URL.createObjectURL(
            new Blob([fileData], { type: 'application/pdf' }));
          window.open(fileURL, '_blank');
        }
      });
    }
  }
  downloadEOB(eobIdentifier) {
    this.confirmationService.confirm({
      message: 'You will be directed to new browser window for EOB document',
      header: 'Confirmation',
      key: 'eobConfirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eobIdentifier = eobIdentifier;
        this.OpenEOB();
      },
      reject: () => {
        this.eobIdentifier = 0;
      }
    });
  }
  onDependentSelected() {
    this.userClaimsReq = {
      externalMemberId: this.selectedDependent ? this.selectedDependent.value : this.dependentMembers[0].value,
      userId: this.userId,
      pageSize: this.filesPerPage,
      pageNumber: this.pageNumber,
      filterAttribute: this.withinValue ? this.withinValue.value : this.filterAttribute,
      sortAttribute: this.sortByValue ? this.sortByValue.value : this.sortField,
      sortOrder: 'desc',
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);

  }
  onWithinSelected() {
    this.userClaimsReq = {
      externalMemberId: this.selectedDependent ? this.selectedDependent.value : this.dependentMembers[0].value,
      userId: this.userId,
      pageSize: this.filesPerPage,
      pageNumber: this.pageNumber,
      filterAttribute: this.withinValue ? this.withinValue.value : this.filterAttribute,
      sortAttribute: this.sortByValue ? this.sortByValue.value : this.sortField,
      sortOrder: 'desc',
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);

  }

  onFilterSelect(claimType: number) {
    this.claimTypeId = claimType;
    this.onMedicalselected = false;
    this.onDentalselected = false;
    this.onVisionselected = false;
    switch (claimType) {
      case 1:
        this.onMedicalselected = true;
        this.FilterBasedonClainType();
        break;
      case 2:
        this.onDentalselected = true;
        this.FilterBasedonClainType();
        break;
      case 3:
        this.onVisionselected = true;
        this.FilterBasedonClainType();
        break;
      default:
        this.claimTypeId = 1;
        this.onMedicalselected = true;
        this.DefaultFilterData();
        break;
    }
  }
  DefaultFilterData() {
    this.userClaimsReq = {
      externalMemberId: '',
      userId: this.userId,
      pageSize: 10,
      pageNumber: this.pageNumber,
      filterAttribute: 'yeartodate',
      sortAttribute: 'ServiceStartDate',
      sortOrder: 'desc',
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);
  }
  FilterBasedonClainType() {
    this.userClaimsReq = {
      externalMemberId:
       this.selectedDependent ? this.selectedDependent.value : this.dependentMembers[0] ? this.dependentMembers[0].value : null,
      userId: this.userId,
      pageSize: this.filesPerPage,
      pageNumber: this.pageNumber,
      filterAttribute: this.withinValue ? this.withinValue.value : this.filterAttribute,
      sortAttribute: this.sortByValue ? this.sortByValue.value : this.sortField,
      sortOrder: 'desc',
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);
  }
  sortData(sortBy: any) {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortField = sortBy;
    this.userClaimsReq = {
      externalMemberId: this.selectedDependent ? this.selectedDependent.value : this.dependentMembers[0].value,
      userId: this.userId,
      pageSize: this.filesPerPage,
      pageNumber: this.pageNumber,
      filterAttribute: this.withinValue ? this.withinValue.value : this.filterAttribute,
      sortAttribute: this.sortByValue ? this.sortByValue.value : this.sortField,
      sortOrder: this.sortOrder,
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);
  }
  getPaginatedClaims(event) {
    if (event.first !== undefined) {
      this.pageNumber = event.first;
      this.filesPerPage = event.rows;
    }
    if (this.initialLoad) {
      this.initialLoad = false;
      return;
    }
    let pageNumber = 1;
    if (this.pageNumber > 1) {
      pageNumber = (this.pageNumber + this.filesPerPage) / this.filesPerPage;
    }
    this.userClaimsReq = {
      externalMemberId: this.selectedDependent ? this.selectedDependent.value : this.dependentMembers[0].value,
      userId: this.userId,
      pageSize: this.filesPerPage,
      pageNumber: pageNumber,
      filterAttribute: this.withinValue ? this.withinValue.value : this.filterAttribute,
      sortAttribute: this.sortByValue ? this.sortByValue.value : this.sortField,
      sortOrder: 'desc',
      claimsType: this.claimTypeId
    };
    this.dependeentMemberData(this.userClaimsReq);
  }
}
