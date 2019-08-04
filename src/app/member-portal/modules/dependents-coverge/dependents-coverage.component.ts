import { Component, OnInit } from '@angular/core';
import { DependentsCoverageService } from './services/dependents-coverage.service';
import { MessageService } from 'primeng/api';
import { UtilService } from '@app/core/services/util.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dependents-coverage',
  templateUrl: './dependents-coverage.component.html',
  styleUrls: ['./dependents-coverage.component.scss']
})
export class DependentsCoverageComponent implements OnInit {
  dependents: any[];
  details: any;
  msgs: any;
  snapShotOpen = false;
  constructor(private dependentsCoverageService: DependentsCoverageService, private utilService: UtilService) { }

  ngOnInit() {
    this.utilService.picUploadNotifier.subscribe(r => {
      if (r) {
        this.dependentsCoverageService.getDemographicsInformation(sessionStorage.getItem('userId')).subscribe(res => {
          if (res) {
            this.details = res;
            this.dependents = this.details['CoverageInformation'];
          }
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
            } else if (err.status === 500) {
            }
          });
      } else {
        this.dependentsCoverageService.getDemographicsInformation(sessionStorage.getItem('userId')).subscribe(res => {
          if (res) {
            this.details = res;
            this.dependents = this.details['CoverageInformation'];
            sessionStorage.setItem('MemberId', this.details.MemberID);
          }
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
            } else if (err.status === 500) {
            }
          });
      }
    });
  }

  deleteDependent(event) {
    this.dependentsCoverageService.getDemographicsInformation(sessionStorage.getItem('userId')).subscribe(res => {
      if (res) {
        this.details = res;
        this.dependents = this.details['CoverageInformation'];
        window.scrollTo(0, 0);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  isMobile() {
    return window.innerWidth <= 640;
  }
  UpdateDependents(event) {
    this.dependentsCoverageService.getDemographicsInformation(sessionStorage.getItem('userId')).subscribe(res => {
      if (res) {
        this.details = res;
        this.dependents = this.details['CoverageInformation'];
        window.scrollTo(0, 0);
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
}
