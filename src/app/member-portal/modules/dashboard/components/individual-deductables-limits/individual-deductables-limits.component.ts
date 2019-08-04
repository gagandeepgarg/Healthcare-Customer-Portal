import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DashboardService } from '../../services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-individual-deductables-limits',
  templateUrl: './individual-deductables-limits.component.html',
  styleUrls: ['./individual-deductables-limits.component.scss']
})
export class IndividualDeductablesLimitsComponent implements OnInit {

  dependentMembers: SelectItem[] = [];
  selectedDependent: SelectItem;

  userId: string;
  individualAccumulators: any = [];
  individualDeductables: any = [];
  individualLimits: any = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.dashboardService.getIndividualDeductables(this.userId, '').subscribe(res => {
      if (res) {
        this.individualAccumulators = res;
        if (this.individualAccumulators && this.individualAccumulators.length > 0) {
          let count = 1;

          this.individualDeductables = this.individualAccumulators.filter(d => d.AccumulatorType.toLowerCase().trim() !== 'limit');
          this.individualDeductables.forEach(elm => {
            elm.index = count++;
            if (elm.AccumulatorType.toLowerCase().trim() === 'deductible') {
              elm.AccumulatorType = 'MSRA';
            } else if (elm.AccumulatorType.toLowerCase().trim() === 'oop max' || elm.AccumulatorType.toLowerCase().trim() === 'oop' || elm.AccumulatorType.toLowerCase().trim() === 'out of pocket max' || elm.AccumulatorType.toLowerCase().trim() === 'out of pocket') {
              elm.AccumulatorType = 'Out Of Pocket Max';
            }
          });
          this.individualLimits = this.individualAccumulators.filter(d => d.AccumulatorType.toLowerCase().trim() === 'limit');
          this.individualLimits.forEach(elm => elm.index = count++);
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });

    this.dashboardService.getUserDependentClaimData(this.userId).subscribe(res => {
      const quest: any = res;
      this.dependentMembers = quest.map(function (elm) {
        return {
          value: elm['MemberDetailId'],
          label: elm['FullName']
        };
      });
      this.selectedDependent = this.dependentMembers[0];
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

  onDependentSelected() {
    this.dashboardService.getIndividualDeductables('', this.selectedDependent.value).subscribe(res => {
      this.individualDeductables = [];
      this.individualLimits = [];
      if (res) {
        this.individualAccumulators = res;
        if (this.individualAccumulators && this.individualAccumulators.length > 0) {
          let count = 1;
          this.individualDeductables = this.individualAccumulators.filter(d => d.AccumulatorType.toLowerCase().trim() === 'deductible');
          this.individualDeductables.forEach(elm => elm.index = count++);
          this.individualLimits = this.individualAccumulators.filter(d => d.AccumulatorType.toLowerCase().trim() === 'limit');
          this.individualLimits.forEach(elm => elm.index = count++);
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

}
