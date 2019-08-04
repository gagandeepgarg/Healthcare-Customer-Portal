import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent implements OnInit {
  dataLocalUrl: any;
  constructor(private plansService: PlansService,
    private domSanitizer: DomSanitizer) { }
    iconName = constants.ICON_PLAN_DETAILS;
    headerHtml = 'Plan Details';
    planName: any;
  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    this.plansService.GetPlanDetailsBasedOnUserId(userId).subscribe((plan: any)  => {
      this.planName = plan.PlanName;
      const guideBookId = plan.ProductGuideBookId;
      // call dms server with this guidebook id
      if (guideBookId !== 0) {
        this.plansService.GetUserPlanDetailsFile(guideBookId).subscribe(file => {
          const planDetailFile = new Blob([file], { type: 'application/pdf' });
          this.dataLocalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(planDetailFile));
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
          }
      });
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }

}
