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
import { DependentsCoverageService } from '../../../services/dependents-coverage.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { UploadDocument } from '@app/shared-module/models/UploadDocument';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';

import { ADD_DEPENDENT } from '@app/core/enums/enum';

@Component({
  selector: 'app-add-dependent',
  templateUrl: './add-dependent.component.html',
  styleUrls: ['./add-dependent.component.scss'],
  providers: [DatePipe]
})
export class AddDependentComponent implements OnInit {

  @Input() display: boolean;
  @Input() isSpouseExits: boolean;
  @Input() dependentsInfo: any;
  /*
    @Output() closePopUpEvent = new EventEmitter<any>();

    errorText = '';
    constants = constants;
    addDependentForm: any;
    isSubmitted: boolean;
    tobaccoOptions: SelectItem[];
    genderOptions: SelectItem[];
    relationShipOptions: SelectItem[];
    diffDays: number;
    maxDate: any;
    yearRange: any;
    minYear = '1900';
    msgs: Message[] = [];
    dependentArray: any[];
    uploadDoc: UploadDocument[];
    url: any;
    scuccessTest: string;
    errorTextImg: string;
    userId: string;
    fileNme: any;
    base64: any;
    memberDependentId: any;
    imageUploaded: boolean;
    infoText: string; */

  items: MenuItem[];
  constants = constants;
  backBtnClicked: boolean;
  questions: any = [];
  errorText: string;
  isSubmitted: boolean;
  activeIndex: number;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe, private confirmationService: ConfirmationService,
    private msgSevice: MessageService, private dependentService: DependentsCoverageService,
    private sharedService: SharedService, private utilService: UtilService,
    private localStorageService: LocalStoreService) {
    this.Init();
  }





  Init() {
    this.dependentService.addDependentPopUpNotifier.subscribe(status => {
      this.display = status;
    });
    this.items = [
      {
        label: 'Dependent Details',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Health Assesment 1/2',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      },
      {
        label: 'Health Assesment 2/2',
        command: (event: any) => {
          this.activeIndex = 2;
        }
      }
    ];
  }

  ngOnInit() {
    this.activeIndex = ADD_DEPENDENT.dependentDetails;
    this.dependentService.getQuestionire().subscribe(ques => {
      this.questions = ques;
    });
  };
  // making green check at personal info step header
  setCompletedTabStyling(tabIndex: number) {

    switch (tabIndex) {
      case ADD_DEPENDENT.dependentDetails:
        const element0 = $('.steps-custom.ui-steps ul li:nth-of-type(1) a span.ui-steps-number');
        if (element0) {
          element0.html('<i class="fa fa-check"></i>');
          element0.css({ 'background-color': '#6BA43A', color: 'white', 'padding': '1%' });
          // $('.ui-steps-item:nth-of-type(0)').css('opacity', '1');
        }
        break;
      case ADD_DEPENDENT.healthAssesment1:
        const element1 = $('.steps-custom.ui-steps ul li:nth-of-type(2) a span.ui-steps-number');
        if (element1) {
          element1.html('<i class="fa fa-check"></i>');
          element1.css({ 'background-color': '#6BA43A', color: 'white', 'padding': '1%' });
          // $('.ui-steps-item:nth-of-type(1)').css('opacity', '1');
        }
        break;

      default:
        break;
    }
  }
  // making 1 number again at personal info step header and removing green check symbol
  setUnCompletedTabStyling(tabIndex: number) {
    switch (tabIndex) {
      case ADD_DEPENDENT.dependentDetails:
        const element = $('.steps-custom.ui-steps ul li:nth-of-type(1) a span.ui-steps-number');
        if (element) {
          element.html('1');
          element.css({ 'background-color': '#F18A00', color: 'white', 'padding-left': '2%' });
          $('.ui-steps-item:nth-of-type(0)').css('opacity', '1');
        }
        break;
      case ADD_DEPENDENT.healthAssesment1:
        const element1 = $('.steps-custom.ui-steps ul li:nth-of-type(2) a span.ui-steps-number');
        if (element1) {
          element1.html('2');
          element1.css({ 'background-color': '#F18A00', color: 'white', 'padding-left': '2%' });
          $('.ui-steps-item:nth-of-type(1)').css('opacity', '1');
        }
        break;

      default:
        break;
    }
  }

  // move to Health Assesment page1
  DependentDetails(e) {
    this.activeIndex = ADD_DEPENDENT.healthAssesment1;
    this.setCompletedTabStyling(ADD_DEPENDENT.dependentDetails);
  }

  HealthAssesment1() {
    this.activeIndex = ADD_DEPENDENT.healthAssesment2;
    this.setCompletedTabStyling(ADD_DEPENDENT.healthAssesment1);
  }

  backTo(e) {
    this.backBtnClicked = true;

    switch (e) {
      case ADD_DEPENDENT.dependentDetails:
        this.activeIndex = ADD_DEPENDENT.dependentDetails;
        this.setUnCompletedTabStyling(ADD_DEPENDENT.dependentDetails);
        break;

      case ADD_DEPENDENT.healthAssesment1:
        this.activeIndex = ADD_DEPENDENT.healthAssesment1;
        this.setUnCompletedTabStyling(ADD_DEPENDENT.healthAssesment1);
        break;
    }
  }

  onCancel() {
    this.errorText = '';
    this.isSubmitted = false;
    this.activeIndex = ADD_DEPENDENT.dependentDetails;
    this.dependentService.addDependentPopUpNotifier.next(false);
  }

  // handling header tab click events
  stepsdisplay(e) {
    const target = e.target.innerHTML;
    if (
      (target &&
        this.activeIndex === 1 &&
        (target.toString().indexOf('1') >= 0 || target.toString().indexOf('fa-check') >= 0 ||
          target.toString().indexOf('Dependent Details') >= 0)) || (!target && e.target.className.toString().indexOf('fa-check') >= 0)
    ) {
      const pbutton = $('#createAccount')[0];
      $(pbutton).trigger('click');
    } else if (
      target &&
      this.activeIndex === 2 &&
      (target.toString().indexOf('>2<') >= 0 || target.toString() === '2' ||
        target.toString().indexOf('HealthAssesment 1/2') >= 0)
    ) {
      const pbutton = $('#personalInfo')[0];
      $(pbutton)
        .find(':button')
        .trigger('click');
    } else if (
      target &&
      this.activeIndex === 3 &&
      (target.toString().indexOf('>2<') >= 0 || target.toString() === '3' ||
        target.toString().indexOf('HealthAssesment 2/2') >= 0)
    ) {
      const pbutton = $('#personalInfo')[0];
      $(pbutton)
        .find(':button')
        .trigger('click');
    }

    
    e.preventDefault();
    return false;
  }
}


