import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-family-deductables',
  templateUrl: './family-deductables.component.html',
  styleUrls: ['./family-deductables.component.scss']
})
export class FamilyDeductablesComponent implements OnInit {

  userId: string;
  familyDeductables: any;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.dashboardService.getFamilyDeductables(this.userId).subscribe((res: any) => {
      let count = 1;
      res.forEach(elm => {
        elm.index = count++;
        if (elm.AccumulatorType.toLowerCase().trim() === 'deductible') {
          elm.AccumulatorType = 'MSRA';
        } else if (elm.AccumulatorType.toLowerCase().trim() === 'oop max' || elm.AccumulatorType.toLowerCase().trim() === 'oop' || elm.AccumulatorType.toLowerCase().trim() === 'out of pocket max' || elm.AccumulatorType.toLowerCase().trim() === 'out of pocket') {
          elm.AccumulatorType = 'Out Of Pocket Max';
        }
      });
      this.familyDeductables = res;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

}
