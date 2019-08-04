import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { SharedService } from '@app/shared-module/services/shared.service';

@Component({
  selector: 'app-coverage-information',
  templateUrl: './coverage-information.component.html',
  styleUrls: ['./coverage-information.component.scss']
})
export class CoverageInformationComponent implements OnInit, OnChanges {
  cols: any[];
  @Input() dependents: any[];
  url: any;
  isPaginator: boolean;
  rows: number;
  constructor(private sharedService: SharedService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dependents && this.dependents.length >= 1) {
      this.dependents = this.dependents.filter(dp => dp.DependentStatus && ((dp.DependentStatus.toLowerCase() === 'active') ||
        (dp.DependentStatus.toLowerCase() === 'pendinginactivation')));
      this.dependents.forEach(element => {
        element.plans = [];
        for (let j = 0; j < element.PlanName.length; j++) {
          element.plans.push({ planName: element.PlanName[j], productName: element.Product[j] });
        }
        /* if (element.avatarImageId) {
          this.sharedService.getMemberProfilePicture(element.avatarImageId).subscribe((res) => {
            if (res) {
              element.url = `data:image/jpeg;base64,` + res;
            }
          });
        } */
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

  ngOnInit() {
    this.cols = [
      { field: '', header: '', width: '4%' },
      { field: 'memberNameName', header: 'Member Name', width: '6%' },
      { field: 'memberType', header: 'Member Type', width: '6%' },
      { field: 'planName', header: 'Plan Name', width: '12%' },
      { field: 'product', header: 'Product', width: '9%' },
      { field: 'levelOfCoverage', header: 'Level Of Services', width: '6%' },
      { field: 'ptd', header: 'Paid Through Date', width: '6%' },
    ];
  }
}
