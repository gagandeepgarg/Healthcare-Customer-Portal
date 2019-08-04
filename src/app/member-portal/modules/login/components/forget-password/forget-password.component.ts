import { Component, OnInit } from '@angular/core';
import * as constants from '@core/constants/app-constants';
import { LoginService } from '@modules/login/services/login.service';
import { CoreDataService } from '@core/services/core-data.service';
import { Router, NavigationExtras } from '@angular/router';
import { RoutesConstants } from '@core/constants/route-constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  questions: any = [];
  errorText = '';
  successText = '';
  unsucessfullCount = 0;
  constants = constants;
  userName: string;
  isSubmitted = false;
  iconName = constants.ICON_UNLOCK;
  headerHtml = ' Please answer the below security questions';
  infoText: string;
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username');

    if (sessionStorage.getItem('unsucessfullCount')) {
      this.unsucessfullCount = sessionStorage.getItem('unsucessfullCount') ? +sessionStorage.getItem('unsucessfullCount') : 0;
    }

    if (this.unsucessfullCount >= 3) {
      this.infoText = constants.FORGOT_PASSWORD_UNCESSFULL;
    }

    // check if user came through forgot password link
    if (!this.userName) {
      this.errorText = constants.FORGOT_PASSWORD_ACTIVATE_ERROR;
      return;
    }
    // load user security questions
    this.loginService.GetUserSecurityQuestions(this.userName.trim()).subscribe(res => {
      if (res) {
        this.questions = res;
        this.questions.forEach(quest => {
          quest.Answer = '';
          quest.error = false;
        });
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }

  onSubmit() {
    this.errorText = '';
    this.isSubmitted = true;
    // check if all questions are answered
    const unanswered = this.questions.filter(q => q.Answer.trim() === '');
    if (unanswered && unanswered.length > 0) {
      unanswered.forEach(un => un.error = true);
      this.errorText = constants.FILL_REQUIRED_FIELDS;
    } else {
      // validate answers for security questions
      this.questions.forEach(ques => ques.Answer = ques.Answer.trim());
      this.errorText = '';
      this.loginService
        .IsvalidUserSecurityAnswers(this.questions)
        .subscribe(res => {
          if (res) {
            sessionStorage.setItem('username', null);
            this.infoText = '';
            this.NavigateToSuccessPage();
          } /* else {
            this.errorText = constants.WRONG_ANSWERS;
            this.unsucessfullCount++;
            sessionStorage.setItem('unsucessfullCount', (this.unsucessfullCount).toLocaleString());
            if (this.unsucessfullCount >= 3) {
              this.infoText = constants.FORGOT_PASSWORD_UNCESSFULL;
            }
          } */
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500 && err.error.ErrorCode === 7041) {
            this.errorText =  constants.WRONG_ANSWERS;
            this.unsucessfullCount++;
            sessionStorage.setItem('unsucessfullCount', (this.unsucessfullCount).toLocaleString());
            if (this.unsucessfullCount >= 3) {
              this.infoText = constants.FORGOT_PASSWORD_UNCESSFULL;
            }
          }
          else {
          }
        });
    }
  }
  NavigateToSuccessPage() {
    // navigate to timer Page
    const navigationExtras: NavigationExtras = {
      queryParams: {
        leftIcon: constants.ICON_CONGRATS_LEFT,
        upperText: 'Congratulations!',
        rightIcon: constants.ICON_CONGRATS_RIGHT,
        belowText: constants.PASSWORD_RESET_SUCCESS,
        bodyText: ''
      }
    };
    this.router.navigate(['/' + RoutesConstants.Shared + '/' + RoutesConstants.successtimer], navigationExtras);
  }
  NavigateToLogin() {
    this.router.navigate(['/' + RoutesConstants.Login]);
  }
  validateField(event, securityQuestionId) {
    const currentQuest = this.questions.filter(q => q.SecurityQuestionId === securityQuestionId);

    if (currentQuest && currentQuest[0].Answer.trim() !== '') {
      currentQuest[0].error = false;
    }
  }
}
