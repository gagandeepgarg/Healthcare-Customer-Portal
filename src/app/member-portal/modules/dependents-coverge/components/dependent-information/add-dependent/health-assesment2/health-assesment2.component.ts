import {
  Component, OnInit, Input, OnChanges, SimpleChanges,
  Output, EventEmitter
} from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import * as constants from '@core/constants/app-constants';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Message, MessageService } from 'primeng/components/common/api';
import { DependentsCoverageService } from '../../../../services/dependents-coverage.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

import { ADD_DEPENDENT } from '@app/core/enums/enum';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-health-assesment2',
  templateUrl: './health-assesment2.component.html',
  styleUrls: ['./health-assesment2.component.scss']
})
export class HealthAssesment2Component implements OnInit {

  @Output() childevent = new EventEmitter<any>();
  @Output() backEvent = new EventEmitter<any>();
  @Input() questions: any;

  errorText = '';
  constants = constants;
  healthQuestionnireForm: FormGroup;
  healthConcernsQuestion: any;
  healthConcern: string;
  heightQuestion: any;
  weightQuestion: any;
  smokeQuestion: any;
  smokeTextQuestion: any;
  cancerQuestion: any;
  cancerTextQuestion: any;
  competitiveSportsQuestion: any;
  competitiveSportsTextQuestion: any;
  drinkQuestion: any;
  drinkRadioQuestion: any;
  drinkRadioOptions: any = [];
  isFemale: boolean;
  pregnantQuestion: any;
  pregnantOptions: any = [];
  msgs: Message[] = [];
  isSubmitted: boolean;
  weightUnits: any;
  heightUnits: any;
  healthConcernsTextLength = constants.HEALTH_CONCERNS_TEXT_LENGTH;
  cancerTextLength = constants.OTHER_TEXT_LENGTH;
  smokeTextLength = constants.OTHER_TEXT_LENGTH;
  sportsTextLength = constants.OTHER_TEXT_LENGTH;


  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe, private confirmationService: ConfirmationService,
    private msgSevice: MessageService, private dependentService: DependentsCoverageService,
    private sharedService: SharedService, private utilService: UtilService,
    private localStorageService: LocalStoreService) { }


  createForm() {
    /*  this.healthQuestionnireForm = this.formBuilder.group(
       {
         'healthConcernsQuestion': [''],
         'weightQuestion': ['', [Validators.required, this.validateSpaces]],
         'heightQuestion': ['', [Validators.required, this.validateSpaces]],
         'smoke': ['', Validators.required],
         'smokeText': [''],
         'cancer': ['', Validators.required],
         'cancerText': [''],
         'competitiveSports': ['', Validators.required],
         'competitiveSportsText': [''],
         'drink': ['', [Validators.required]],
         'drinkRadio': ['', { disabled: true }],
         'pregnant': [''],
       },
     ); */

    this.healthQuestionnireForm = new FormGroup(
      {
        healthConcerns: new FormControl('', []),
        weight: new FormControl('', [Validators.required, this.validateSpaces,]),
        weightUnits: new FormControl(1, []),
        height: new FormControl('', [Validators.required, this.validateSpaces,]),
        heightUnits: new FormControl(1, []),
        smoke: new FormControl('', [Validators.required]),
        smokeText: new FormControl({ value: '', disabled: true }),
        cancer: new FormControl('', [Validators.required]),
        cancerText: new FormControl({ value: '', disabled: true }),
        competitiveSports: new FormControl('', [Validators.required]),
        competitiveSportsText: new FormControl({ value: '', disabled: true }),
        drink: new FormControl('', [Validators.required]),
        drinkRadio: new FormControl({ value: '', disabled: true }),
        pregnant: new FormControl('', [])
      });
  }

  ngOnInit() {

    this.weightUnits = [{ label: 'lb', value: 1 }, { label: 'kg', value: 2 }];
    this.heightUnits = [{ label: 'cm', value: 1 }, { label: 'ft', value: 2 }];
    this.createForm();

    if (sessionStorage.getItem('DependentDetails')) {
      const dependentDataObj: any = JSON.parse(
        sessionStorage.getItem('DependentDetails')
      );
      if (JSON.parse(
        sessionStorage.getItem('DependentDetails')).gender === 'female') {
        this.isFemale = true;
        //this.healthQuestionnireForm.get('pregnant').enable();
        this.healthQuestionnireForm.controls['pregnant'].setValidators([Validators.required]);
        this.healthQuestionnireForm.controls['pregnant'].updateValueAndValidity();
      } else {
        this.isFemale = false;
        this.healthQuestionnireForm.controls['pregnant'].clearValidators();
        this.healthQuestionnireForm.controls['pregnant'].updateValueAndValidity();
      }

    }

    this.healthConcernsQuestion = this.questions.find(q => q.MemberQuestionnaireId === 26);
    this.weightQuestion = this.questions.find(q => q.MemberQuestionnaireId === 27);
    this.heightQuestion = this.questions.find(q => q.MemberQuestionnaireId === 28);
    this.smokeQuestion = this.questions.find(q => q.MemberQuestionnaireId === 29);
    this.smokeTextQuestion = this.questions.find(q => q.MemberQuestionnaireId === 30);
    this.cancerQuestion = this.questions.find(q => q.MemberQuestionnaireId === 31);
    this.cancerTextQuestion = this.questions.find(q => q.MemberQuestionnaireId === 32);
    this.competitiveSportsQuestion = this.questions.find(q => q.MemberQuestionnaireId === 33);
    this.competitiveSportsTextQuestion = this.questions.find(q => q.MemberQuestionnaireId === 34);
    this.drinkQuestion = this.questions.find(q => q.MemberQuestionnaireId === 35);
    this.drinkRadioQuestion = this.questions.find(q => q.MemberQuestionnaireId === 36);
    if (this.drinkRadioQuestion) {
      this.drinkRadioOptions = this.drinkRadioQuestion.MemberQuestionAnswer.split(',');
    }

    this.pregnantQuestion = this.questions.find(q => q.MemberQuestionnaireId === 37);
    if (this.pregnantQuestion) {
      this.pregnantOptions = this.pregnantQuestion.MemberQuestionAnswer.split(',');
    }

    this.loadData();
    this.onSmoke(this.healthQuestionnireForm);
    this.onCancer(this.healthQuestionnireForm);
    this.onSports(this.healthQuestionnireForm);
    this.onDrink(this.healthQuestionnireForm);
  }


  loadData() {
    if (sessionStorage.getItem('HealthAssesment2')) {
      const healthAssesment2Obj: any = JSON.parse(
        sessionStorage.getItem('HealthAssesment2')
      );
      this.healthQuestionnireForm.patchValue({
        healthConcerns: healthAssesment2Obj.healthConcerns,
        weight: healthAssesment2Obj.weight,
        weightUnits: healthAssesment2Obj.weightUnits,
        height: healthAssesment2Obj.height,
        heightUnits: healthAssesment2Obj.heightUnits,
        smoke: healthAssesment2Obj.smoke,
        smokeText: healthAssesment2Obj.smokeText,
        cancer: healthAssesment2Obj.cancer,
        cancerText: healthAssesment2Obj.cancerText,
        competitiveSports: healthAssesment2Obj.competitiveSports,
        competitiveSportsText: healthAssesment2Obj.competitiveSportsText,
        drink: healthAssesment2Obj.drink,
        drinkRadio: healthAssesment2Obj.drinkRadio,
        pregnant: healthAssesment2Obj.pregnant
      });
      sessionStorage.removeItem('HealthAssesment2');
    }
  }

  validateSpaces(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Invalid_Answer: true };
    }
    return null;
  }

  onSmoke(frm: FormGroup) {
    if (frm.get('smoke').value === 'yes') {
      frm.get('smokeText').enable();
      frm.controls['smokeText'].setValidators([Validators.required, this.validateSpaces, Validators.maxLength(150)]);
      frm.controls['smokeText'].updateValueAndValidity();
    } else {
      frm.get('smokeText').disable();
      frm.controls['smokeText'].clearValidators();
      frm.controls['smokeText'].updateValueAndValidity();
    }
  }

  onCancer(frm: FormGroup) {
    if (frm.get('cancer').value === 'yes') {
      frm.get('cancerText').enable();
      frm.controls['cancerText'].setValidators([Validators.required, this.validateSpaces, Validators.maxLength(150)]);
      frm.controls['cancerText'].updateValueAndValidity();
    } else {
      frm.get('cancerText').disable();
      frm.controls['cancerText'].clearValidators();
      frm.controls['cancerText'].updateValueAndValidity();
    }
  }

  onSports(frm: FormGroup) {
    if (frm.get('competitiveSports').value === 'yes') {
      frm.get('competitiveSportsText').enable();
      frm.controls['competitiveSportsText'].setValidators([Validators.required, this.validateSpaces, Validators.maxLength(150)]);
      frm.controls['competitiveSportsText'].updateValueAndValidity();
    } else {
      frm.get('competitiveSportsText').disable();
      frm.controls['competitiveSportsText'].clearValidators();
      frm.controls['competitiveSportsText'].updateValueAndValidity();
    }
  }

  onDrink(frm: FormGroup) {
    if (frm.get('drink').value === 'yes') {
      frm.get('drinkRadio').enable();
      frm.controls['drinkRadio'].setValidators([Validators.required]);
      frm.controls['drinkRadio'].updateValueAndValidity();
    } else {
      frm.get('drinkRadio').disable();
      frm.controls['drinkRadio'].clearValidators();
      frm.controls['drinkRadio'].updateValueAndValidity();
    }
  }

  onBack() {
    sessionStorage.setItem('HealthAssesment2', JSON.stringify(this.healthQuestionnireForm.value));
    this.backEvent.emit(ADD_DEPENDENT.healthAssesment1);
  }

  validateForm() {
    this.isSubmitted = true
    const missingRequiredFields: any = [];
    Object.keys(this.healthQuestionnireForm.controls).forEach(key => {
      if (this.healthQuestionnireForm.get(key).errors && this.healthQuestionnireForm.get(key).errors.required) {
        missingRequiredFields.push(key);
        return false;
      }
    });

    if (this.healthQuestionnireForm.invalid) {
      if (missingRequiredFields.length > 0) {
        this.errorText = constants.MANDATORY_FIELDS;
      }
      window.scrollTo(0, 0);
      return false;
    } else {
      this.errorText = '';
      return true;
    }
  }

  openConfirmationDialog(obj) {
    let showMessage: any;
    if (sessionStorage.getItem('Info')) {
      showMessage = ' 1. ' + sessionStorage.getItem('Info') +
        '<br/> 2. New dependent addition will have impact on you premium amount. Are you sure to Add new dependent?';
    } else {
      showMessage = 'New dependent addition will have impact on you premium amount. Are you sure to Add new dependent?';
    }

    this.confirmationService.confirm({
      message: showMessage,
      header: 'Confirmation',
      key: 'addConfirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dependentService.addDependent(obj).subscribe((res: any) => {
          if (res.Item1 === 7000) {
            this.msgSevice.clear();
            this.msgs = [];
            // this.memberDependentId = res.item2;
            this.dependentService.addDependentPopUpNotifier.next(false);

            this.msgSevice.add({ severity: 'success', summary: 'Your request has been submitted for processing' });
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

  onSubmit() {
    if (this.validateForm() && this.healthQuestionnireForm.valid) {
      this.errorText = '';
      let MemberDependentQuestionAnswersBO: any = [];
      if (sessionStorage.getItem('DependentDetails')) {
        const dependentDataObj: any = JSON.parse(
          sessionStorage.getItem('DependentDetails')
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 26,
            DependentAnswer: this.healthQuestionnireForm.get('healthConcerns').value ?
              this.healthQuestionnireForm.get('healthConcerns').value : '',
            CreatedDateTime: new Date()
          }
        )

        if (this.healthQuestionnireForm.get('weight').value) {
          MemberDependentQuestionAnswersBO.push(
            {
              MemberId: sessionStorage.getItem('MemberId'),
              MemberDetailId: 0,
              DependentQuestionnaireId: 27,
              DependentAnswer: this.healthQuestionnireForm.get('weight').value + ' ' +
                this.weightUnits.find(w => w.value === this.healthQuestionnireForm.get('weightUnits').value).label,
              CreatedDateTime: new Date()
            }
          )
        }

        if (this.healthQuestionnireForm.get('height').value) {
          MemberDependentQuestionAnswersBO.push(
            {
              MemberId: sessionStorage.getItem('MemberId'),
              MemberDetailId: 0,
              DependentQuestionnaireId: 28,
              DependentAnswer: this.healthQuestionnireForm.get('height').value + ' ' +
                this.heightUnits.find(h => h.value === this.healthQuestionnireForm.get('heightUnits').value).label,
              CreatedDateTime: new Date()
            }
          );
        }

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 29,
            DependentAnswer: this.healthQuestionnireForm.get('smoke').value,
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 30,
            DependentAnswer: this.healthQuestionnireForm.get('smokeText').value ? this.healthQuestionnireForm.get('smokeText').value : '',
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 31,
            DependentAnswer: this.healthQuestionnireForm.get('cancer').value,
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 32,
            DependentAnswer: this.healthQuestionnireForm.get('cancerText').value ?
              this.healthQuestionnireForm.get('cancerText').value : '',
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 33,
            DependentAnswer: this.healthQuestionnireForm.get('competitiveSports').value,
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 34,
            DependentAnswer: this.healthQuestionnireForm.get('competitiveSportsText').value ?
              this.healthQuestionnireForm.get('competitiveSportsText').value : '',
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 35,
            DependentAnswer: this.healthQuestionnireForm.get('drink').value,
            CreatedDateTime: new Date()
          }
        );

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 36,
            DependentAnswer: this.healthQuestionnireForm.get('drinkRadio').value ?
              this.healthQuestionnireForm.get('drinkRadio').value : '',
            CreatedDateTime: new Date()
          }
        );

        if (this.healthQuestionnireForm.get('pregnant').value) {
          MemberDependentQuestionAnswersBO.push(
            {
              MemberId: sessionStorage.getItem('MemberId'),
              MemberDetailId: 0,
              DependentQuestionnaireId: 37,
              DependentAnswer: this.healthQuestionnireForm.get('pregnant').value,
              CreatedDateTime: new Date()
            }
          );
        }

        MemberDependentQuestionAnswersBO.push(
          {
            MemberId: sessionStorage.getItem('MemberId'),
            MemberDetailId: 0,
            DependentQuestionnaireId: 25,
            DependentAnswer: sessionStorage.getItem('HealthAssesment1') ? sessionStorage.getItem('HealthAssesment1') : '',
            CreatedDateTime: new Date()
          }
        );

        const obj = {
          FirstName: dependentDataObj.firstName,
          LastName: dependentDataObj.lastName,
          Gender: dependentDataObj.gender,
          DOB: this.convertDateInUS(new Date(dependentDataObj.dob)),
          MemberId: sessionStorage.getItem('MemberId'),
          RelationshipId: dependentDataObj.relationShip,
          MemberDependentQuestionAnswersBO: MemberDependentQuestionAnswersBO
        };
        this.openConfirmationDialog(obj);
      }


    }
  }

  convertDateInUS(date) {
    let date1 = date.toLocaleDateString('en-US');
    const d = new Date(date1),
      mnth = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2);
    return [d.getFullYear(), mnth, day].join('/');
  }


  calculateHealthConcernsTextLength(value: string) {
    this.healthConcernsTextLength = (value.length <= constants.HEALTH_CONCERNS_TEXT_LENGTH)
     ? (constants.HEALTH_CONCERNS_TEXT_LENGTH - value.length) : constants.HEALTH_CONCERNS_TEXT_LENGTH;
  }

  calculateSmokeTextLength(value: string){
    this.smokeTextLength = (value.length <= constants.OTHER_TEXT_LENGTH)
    ? (constants.OTHER_TEXT_LENGTH - value.length) : constants.OTHER_TEXT_LENGTH;
  }

  calculateCancerTextLength(value: string){
    this.cancerTextLength = (value.length <= constants.OTHER_TEXT_LENGTH)
    ? (constants.OTHER_TEXT_LENGTH - value.length) : constants.OTHER_TEXT_LENGTH;
  }

  calculateSportsTextLength(value: string){
    this.sportsTextLength = (value.length <= constants.OTHER_TEXT_LENGTH)
    ? (constants.OTHER_TEXT_LENGTH - value.length) : constants.OTHER_TEXT_LENGTH;
  }

}
