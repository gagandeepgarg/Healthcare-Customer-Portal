import {
  Component, OnInit, Input, OnChanges, SimpleChanges,
  Output, EventEmitter
} from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormBuilder
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

@Component({
  selector: 'app-health-assesment1',
  templateUrl: './health-assesment1.component.html',
  styleUrls: ['./health-assesment1.component.scss']
})
export class HealthAssesment1Component implements OnInit {

  @Output() childevent = new EventEmitter<any>();
  @Output() backEvent = new EventEmitter<any>();
  @Input() questions: any;
  question: any;

  errorText = '';
  constants = constants;
  healthAssesment1Form: any;
  items: string[];
  selecteditems: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe, private confirmationService: ConfirmationService,
    private msgSevice: MessageService, private dependentService: DependentsCoverageService,
    private sharedService: SharedService, private utilService: UtilService,
    private localStorageService: LocalStoreService) { }

  ngOnInit() {
    this.question = this.questions.find(q=>q.MemberQuestionnaireId === 25)
    this.items = this.question.MemberQuestionAnswer.split(',');

    if (sessionStorage.getItem('HealthAssesment1')) {
      this.selecteditems = sessionStorage.getItem('HealthAssesment1').split(',');
      sessionStorage.removeItem('HealthAssesment1');
    }
  }

  createForm() {
    this.healthAssesment1Form = this.formBuilder.group(
      {
        'firstName': ['', [Validators.required, Validators.maxLength(50)]],

        'lastName': ['', [Validators.required, Validators.maxLength(50)]],
        'gender': ['', [Validators.required]],
        'dob': ['', [Validators.required]],
        'relationShip': ['', [Validators.required]],
        'tobaccoUse': ['', [Validators.required]],
      },
    );
  }

  onBack() {
    if (this.selecteditems && this.selecteditems.length > 0) {
      sessionStorage.setItem('HealthAssesment1', this.selecteditems.toString());
    }
    this.backEvent.emit(ADD_DEPENDENT.dependentDetails);
  }

  onNext() {
    if (this.selecteditems && this.selecteditems.length > 0) {
      sessionStorage.setItem('HealthAssesment1', this.selecteditems.toString());
    }
    this.childevent.emit();

  }

}
