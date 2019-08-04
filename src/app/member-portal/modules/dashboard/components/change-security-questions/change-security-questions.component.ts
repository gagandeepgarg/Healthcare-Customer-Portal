import { Component, OnInit } from '@angular/core';
import * as constants from '@core/constants/app-constants';
import { SelectItem } from 'primeng/api';
import { CoreDataService } from '@app/core/services/core-data.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { NavigationExtras, Router } from '@angular/router';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-change-security-questions',
  templateUrl: './change-security-questions.component.html',
  styleUrls: ['./change-security-questions.component.scss']
})
export class ChangeSecurityQuestionsComponent implements OnInit {
  iconName = constants.ICON_UNLOCK;
  headerHtml = ' Change Security Questions';
  constructor(private coreDataService: CoreDataService,
    private dashboradService: DashboardService,
    private router: Router) { }
  securityQuestionForm: FormGroup;
  questions: SelectItem[];
  questions1: SelectItem[];
  questions2: SelectItem[];
  questions3: SelectItem[];
  errorText = '';
  isSubmitted = false;
  userId: any;
  answer1Error = false;
  answer2Error = false;
  answer3Error = false;
  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.fetchAllSequirtyQuestions();
    // creating form
    this.securityQuestionForm = new FormGroup(
      {
        question1: new FormControl('', [Validators.required]),
        answer1: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ]),
        question2: new FormControl('', [Validators.required]),
        answer2: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ]),
        question3: new FormControl('', [Validators.required]),
        answer3: new FormControl('', [
          Validators.required,
          this.validateSpaces
        ])
      });
  }
  fetchAllSequirtyQuestions() {
    this.coreDataService.GetSecurityQuestions().subscribe(res => {
      const quest: any = res;
      if (quest && quest.length > 0) {
        this.questions = quest.map(function (elm) {
          return {
            value: elm['SecurityQuestionId'],
            label: elm['SecurityQuestion']
          };
        });
        this.questions1 = this.questions.slice();
        this.questions2 = this.questions.slice();
        this.questions3 = this.questions.slice();
        this.settingSelctedFormValues();
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  settingSelctedFormValues() {
    this.dashboradService.GetUserSecurityQuestions(this.userId).subscribe(res => {
      if (res) {
        const questions = res;
        // patch form values with selected questions
        this.securityQuestionForm.patchValue({question1: questions[0].SecurityQuestionId});
        this.filterQuestions1();
        this.securityQuestionForm.patchValue({question2: questions[1].SecurityQuestionId});
        this.filterQuestions2();
        this.securityQuestionForm.patchValue({question3: questions[2].SecurityQuestionId});
        this.filterQuestions3();
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  validateSpaces(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Invalid_Answer: true };
    }
    return null;
  }
  onSubmit() {
    this.errorText = '';
    this.isSubmitted = true;
    // check if all questions are answered
    if (this.securityQuestionForm.get('answer1').value.trim() === '') {
      this.answer1Error = true;
    }
    if (this.securityQuestionForm.get('answer2').value.trim() === '') {
      this.answer2Error = true;
    }
    if (this.securityQuestionForm.get('answer3').value.trim() === '') {
      this.answer3Error = true;
    }
    if (this.answer1Error || this.answer2Error || this.answer3Error) {
      this.errorText = constants.FILL_REQUIRED_FIELDS;
    } else {
      // upadte security questions and answers
      this.errorText = '';
      const obj = [
        { SecurityQuestionId: this.securityQuestionForm.get('question1').value,
        Answer: this.securityQuestionForm.get('answer1').value.trim(), UserId : this.userId },
        { SecurityQuestionId: this.securityQuestionForm.get('question2').value,
        Answer: this.securityQuestionForm.get('answer2').value.trim(), UserId : this.userId },
        { SecurityQuestionId: this.securityQuestionForm.get('question3').value,
        Answer: this.securityQuestionForm.get('answer3').value.trim(), UserId : this.userId }
      ];
      this.dashboradService.UpdateSecurityQuestions(obj).subscribe(res => {
        if (res) {
          this.NavigateToSuccessPage();
        } else {
          // some error happened while updating in API
          this.errorText = '';
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
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
        belowText: constants.QUESTIONS_UPDATE_SUCCESS,
        bodyText: '',
        redirectPath: 'Dashboard'
      }
    };
    this.router.navigate(['/' + RoutesConstants.Shared + '/' + RoutesConstants.successtimer], navigationExtras);
  }

  validateField(e, questionNo) {
    switch (questionNo) {
      case 1:
      this.securityQuestionForm.get('answer1').value.trim() === '' ? this.answer1Error = true : this.answer1Error = false;
        break;
      case 2:
      this.securityQuestionForm.get('answer2').value.trim() === '' ? this.answer2Error = true : this.answer2Error = false;
        break;
      case 3:
      this.securityQuestionForm.get('answer3').value.trim() === '' ? this.answer3Error = true : this.answer3Error = false;
        break;
    }
  }
  filterQuestions1() {
    this.questions2 = this.questions.slice(0);
    this.questions2 = this.questions2.filter(q => {
      if (
        q.value !== this.securityQuestionForm.get('question1').value &&
        q.value !== this.securityQuestionForm.get('question3').value
      ) {
        return true;
      }
    });
    this.questions3 = this.questions.slice(0);
    this.questions3 = this.questions3.filter(
      q =>
        q.value !== this.securityQuestionForm.get('question1').value &&
        q.value !== this.securityQuestionForm.get('question2').value
    );
  }

  filterQuestions2() {
    this.questions1 = this.questions.slice(0);
    this.questions1 = this.questions1.filter(
      q =>
        q.value !== this.securityQuestionForm.get('question2').value &&
        q.value !== this.securityQuestionForm.get('question3').value
    );
    this.questions3 = this.questions.slice(0);
    this.questions3 = this.questions3.filter(
      q =>
        q.value !== this.securityQuestionForm.get('question1').value &&
        q.value !== this.securityQuestionForm.get('question2').value
    );
  }

  filterQuestions3() {
    this.questions2 = this.questions.slice(0);
    this.questions2 = this.questions2.filter(
      q =>
        q.value !== this.securityQuestionForm.get('question1').value &&
        q.value !== this.securityQuestionForm.get('question3').value
    );
    this.questions1 = this.questions.slice(0);
    this.questions1 = this.questions1.filter(
      q =>
        q.value !== this.securityQuestionForm.get('question3').value &&
        q.value !== this.securityQuestionForm.get('question2').value
    );
  }
  NavigateToDashboard() {
    this.router.navigate(['/' + RoutesConstants.Dashboard]);
  }
}
