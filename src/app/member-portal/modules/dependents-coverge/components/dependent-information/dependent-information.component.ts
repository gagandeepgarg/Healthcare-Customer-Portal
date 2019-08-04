import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DependentsCoverageService } from '../../services/dependents-coverage.service';
import { Message, MessageService } from 'primeng/components/common/api';
import * as constants from '@core/constants/app-constants';
import { SharedService } from '@app/shared-module/services/shared.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dependent-information',
  templateUrl: './dependent-information.component.html',
  styleUrls: ['./dependent-information.component.scss']
})
export class DependentInformationComponent implements OnInit, OnChanges {
  cols: any[];

  @Output() callServiceEvent = new EventEmitter<any>();
  @Input() dependents: any[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  isSpouseExits: boolean;
  yearRange: string;
  minYear = '1900';
  maxDate;
  isToBeMadeInactive: boolean;
  isAdded: boolean;
  constants = constants;

  openAddDependentPopUp: boolean;
  msgs: Message[] = [];
  url: any;
  uploadImageDialog: boolean;
  dependentImageRow: any;
  isPaginator: boolean;
  rows: number;
  constructor(private confirmationService: ConfirmationService,
    private dependentService: DependentsCoverageService, private msgSevice: MessageService,
    private sharedService: SharedService,
    private localStorageService: LocalStoreService) { }

  ngOnInit() {
    const currentDate = new Date();
    this.maxDate = currentDate;
    this.yearRange =
      this.minYear.toString() + ':' + currentDate.getFullYear().toString();

    this.cols = [
      { field: '', header: '', width: '8%' },
      { field: 'firstName', header: 'First Name', width: '12%' },
      { field: 'lastName', header: 'Last Name', width: '12%' },
      { field: 'memberType', header: 'Relationship', width: '12%' },
      { field: 'dob', header: 'Date of Birth', width: '15%' },
      { field: '', header: 'Status', width: '15%' },
      { field: 'ptd', header: 'Paid Through Date', width: '18%' },
      { field: '', header: '', width: '8%' },
    ];

    this.dependentService.addDependentPopUpNotifier.subscribe(status => {
      if (!status) {
        /* sessionStorage.removeItem('DependentDetails');
        sessionStorage.removeItem('Info');
        sessionStorage.removeItem('HealthAssesment1');
        sessionStorage.removeItem('HealthAssesment2'); */
        this.callServiceEvent.emit();
      }
    });
    sessionStorage.removeItem('DependentDetails');
    sessionStorage.removeItem('Info');
    sessionStorage.removeItem('HealthAssesment1');
    sessionStorage.removeItem('HealthAssesment2');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.dependents && this.dependents.length > 0 && changes['dependents'] &&
      changes['dependents'].currentValue !== changes['dependents'].previousValue) {
      this.dependents = this.dependents.filter(d => d.DependentRelationship.toLowerCase() !== 'self');
      this.isSpouseExits = this.dependents.find(d => d.DependentRelationship.toLowerCase() === 'spouse' &&
        d.DependentStatus.toLowerCase() !== 'inactive') ? true : false;
      /* this.dependents.forEach(element => {
        if (element.avatarImageId) {
          this.sharedService.getMemberProfilePicture(element.avatarImageId).subscribe((res) => {
            if (res) {
              this.localStorageService.saveSessionData(res, 'image_' + element.avatarImageId);
              element.url = `data:image/jpeg;base64,` + res;
            }
          });
        }
      }); */
      const dep = this.dependents.filter(dp => dp.DependentStatus.toLowerCase() === 'inactive');
      this.dependents = this.dependents.filter(dp => dp.DependentStatus.toLowerCase() !== 'inactive');
      dep.forEach(d => {
        this.dependents.push(d);
      });
      this.showPaginator(this.dependents);

    }
  }

  showPaginator(depArray) {
    if (depArray && depArray.length > 5) {
      this.isPaginator = true;
      this.rows = 5;
    } else {
      this.isPaginator = false;
      this.rows = depArray.length;
    }
  }

  deleteDependent(dependent) {
    this.confirmationService.confirm({
      message: this.constants.INACTIVATE_DEPENDENT +
        dependent.FirstName + ' ' + dependent.LastName + ' </b> .',
      key: 'deleteConfirmation',
      header: this.constants.CONFORM_INACTIVE,
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.dependentService.deleteDependent(dependent.DependentDetailId).subscribe(res => {
          if (res === 7002) {
            this.msgs = [];
            this.isToBeMadeInactive = true;
            this.msgSevice.clear();
            this.msgSevice.add({ severity: 'success', summary: this.constants.REQUEST_SUBMITTED });
            this.deleteEvent.emit(dependent.DependentDetailId);
            setTimeout(() => {
              this.msgSevice.clear();
            }, 5000);
          }
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
            } else if (err.status === 500) {
            }
          });
      },
      reject: () => {
        this.msgs = [];
      }
    });

  }

  onCloseAddPopUP() {
    this.openAddDependentPopUp = false;
    this.dependentService.addDependentPopUpNotifier.subscribe(status => {
      if (!status) {
        this.callServiceEvent.emit();
      }
    })
  }

  getColor(status: string) {
    if (status) {
      switch (status.trim()) {
        case 'Inactive':
          return 'red';
        default: return;
      }
    }
  }

  openDependentPopUp() {
    this.openAddDependentPopUp = true;
    this.dependentService.addDependentWindowStatus(true);
  }

  /*  uploadImage(dependent) {
     this.uploadImageDialog = true;
     this.dependentImageRow = dependent;
   } */


  onCloseUploadImage(isNewImageUpdated) {
    this.uploadImageDialog = false;
    if (isNewImageUpdated) {
      this.callServiceEvent.emit();
    }
  }

}
