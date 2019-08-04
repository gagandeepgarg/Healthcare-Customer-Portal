import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreDataService } from '@core/services/core-data.service';
import { RoutesConstants } from '@app/core/constants/route-constants';
import * as constants from '@core/constants/app-constants';
@Component({
  selector: 'app-success-timer',
  templateUrl: './success-timer.component.html',
  styleUrls: ['./success-timer.component.scss']
})
export class SuccessTimerComponent implements OnInit {
  constants = constants;
  counter = 10;
  timerStarLeftIconName = '';
  timerUpperText = '';
  timerStartRightIconName = '';
  timerBelowText = '';
  timerBodyText = '';
  redirectPath = '';
  buttonLabel = '';
  constructor(private router: Router, private coreDataService: CoreDataService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.timerStarLeftIconName = params['leftIcon'];
      this.timerUpperText = params['upperText'];
      this.timerStartRightIconName = params['rightIcon'];
      this.timerBelowText = params['belowText'];
      this.timerBodyText = params['bodyText'];
      this.redirectPath = params['redirectPath'];
    });
  }
  ngOnInit() {
    if (this.redirectPath && this.redirectPath === 'Dashboard') {
      this.buttonLabel = 'Home';
    } else {
      this.buttonLabel = 'Login';
    }
    this.counter = 10;
    this.timer();
  }


  timer() {
    const that = this;
    setTimeout(function () {
      if (that.counter > 0) {
        that.counter--;
        that.timer();
      } else {
        that.LoginRedirectClicked();
      }
    }, 1000);
  }
  LoginRedirectClicked() {
    this.clearValues();
    this.counter = 0;
    if (this.redirectPath && this.redirectPath === 'Dashboard') {
      this.router.navigate(['/' + RoutesConstants.Dashboard]);
    } else {
      this.router.navigate(['/' + RoutesConstants.Login]);
    }
  }
  clearValues() {
    this.coreDataService.timerStarLeftIconName = '';
    this.coreDataService.timerUpperText = '';
    this.coreDataService.timerStartRightIconName = '';
    this.coreDataService.timerBelowText = '';
    this.coreDataService.timerBodyText = '';
  }
}
