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
import { UploadDocument } from '@app/shared-module/models/UploadDocument';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dependent-details',
  templateUrl: './dependent-details.component.html',
  styleUrls: ['./dependent-details.component.scss']
})
export class DependentDetailsComponent implements OnInit {

  @Input() display: boolean;
  @Input() isSpouseExits: boolean;
  @Input() dependentsInfo: any;
  @Output() childevent = new EventEmitter<any>();

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
  infoText: string;


  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe, private confirmationService: ConfirmationService,
    private msgSevice: MessageService, private dependentService: DependentsCoverageService,
    private sharedService: SharedService, private utilService: UtilService,
    private localStorageService: LocalStoreService) {
    this.createForm();
  }

  createForm() {
    this.addDependentForm = this.formBuilder.group(
      {
        'firstName': ['', [Validators.required, Validators.maxLength(50), this.validateSpaces]],

        'lastName': ['', [Validators.required, Validators.maxLength(50), this.validateSpaces]],
        'gender': ['', [Validators.required]],
        'dob': ['', [Validators.required]],
        'relationShip': ['', [Validators.required]],
        //'tobaccoUse': ['', [Validators.required]],
      },
    );
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.isSpouseExits) {
      this.relationShipOptions = [
        { label: 'Child', value: 3 }
      ];
    } else {
      this.relationShipOptions = [
        { label: 'Spouse', value: 2 },
        { label: 'Child', value: 3 }
      ];
    }

    if (this.dependentsInfo && this.dependentsInfo.length > 0) {
      this.dependentArray = this.dependentsInfo.filter(d => d.DependentStatus.toLowerCase().trim() !== 'inactive');
    }

  }

  ngOnInit() {
    this.getYearRange();
    this.getDropDownValues();
    this.LoadFormData();
  }


  LoadFormData() {
    if (sessionStorage.getItem('DependentDetails')) {
      const dependentDataObj: any = JSON.parse(
        sessionStorage.getItem('DependentDetails')
      );
      this.addDependentForm.patchValue({
        firstName: dependentDataObj.firstName,
        lastName: dependentDataObj.lastName,
        gender: dependentDataObj.gender,
        dob: new Date(dependentDataObj.dob),
        relationShip: dependentDataObj.relationShip,
        //tobaccoUse: dependentDataObj.tobaccoUse
      });
      sessionStorage.removeItem('DependentDetails');
    }
  }
  getYearRange() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    this.maxDate = currentDate;
    this.yearRange =
      this.minYear.toString() + ':' + currentDate.getFullYear().toString();
  }

  getDropDownValues() {
    this.genderOptions = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ];

    this.tobaccoOptions = [
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ];
  }

  convertDate(date) {
    const d = new Date(date),
      mnth = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2);
    return [d.getFullYear(), mnth, day].join('/');
  }

  convertDateInUS(date) {
    date = date.toLocaleDateString('en-US');
    const d = new Date(date),
      mnth = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2);
    return [d.getFullYear(), mnth, day].join('/');
  }

  validateSpaces(control: AbstractControl) {
    if (!control.value.trim()) {
      return { Invalid_Answer: true };
    }
    return null;
  }


  getAge(dob: any) {
    // const currentDate = new Date();
    // const currentDateTime = currentDate.getTime();
    // dob = new Date(dob);

    // const yearsDiff = currentDate.getFullYear() - dob.getFullYear();
    // const months = (currentDate.getMonth() + 12 * currentDate.getFullYear()) -
    //   (dob.getMonth() + 12 * dob.getFullYear());
    // const remainingMonths = (yearsDiff * 12) - months;

    // const diff = Math.abs(currentDateTime - dob.getTime()); // Time Difference
    // const diffDays: any = (diff / (1000 * 3600 * 24)).toFixed(3); // Days Difference
    // const weeks: any = diffDays / 7;                              // weeks Difference
    // const age: any = +(diffDays / 365).toFixed(1);             // Age from DOB

    // return age;
    return this.utilService.getAge(dob);
  }


  validateSpouseAge(): boolean {
    this.errorText = '';
    const relationShipId = this.addDependentForm.value.relationShip;
    const dob = this.addDependentForm.value.dob;
    if (this.getAge(dob) < 18.0 && relationShipId === 2) {
      this.errorText = this.addDependentForm.value.firstName + ' ' + this.addDependentForm.value.lastName + constants.BELOW_18_YEARS;
      this.infoText = '';
      return true;
    } else if (this.getAge(dob) >= 64.0 && relationShipId === 2) {
      this.errorText = this.addDependentForm.value.firstName + ' ' + this.addDependentForm.value.lastName + constants.ABOVE_64_YEARS;
      this.infoText = '';
      return true;
    } else if (this.getAge(dob) > 63.5 && this.getAge(dob) < 64.0) {
      this.errorText = '';
      this.infoText = this.addDependentForm.value.firstName + ' ' +
        this.addDependentForm.value.lastName + ' is eligible for healthcare sharing until ' +
        dob.getDate() + '/' + (+dob.getMonth() + 1) + '/' + new Date().getFullYear() +
        '. Applicants over the age of 64  are not eligible for healthcare sharing plans.';
      return false;
    } else {
      this.infoText = '';
      return false;
    }
  }


  validateChildAge(): boolean {
    this.errorText = '';
    const relationShipId = this.addDependentForm.value.relationShip;
    const dob = this.addDependentForm.value.dob;
    if (this.getAge(dob) >= 26.0 && (relationShipId === 3)) {
      this.errorText = this.addDependentForm.value.firstName + ' ' + this.addDependentForm.value.lastName + constants.ABOVE_26_YEARS;
      return true;
    } else {
      return false;
    }
  }

  validateDuplicateDependents(): boolean {
    this.errorText = '';
    const firstName = this.addDependentForm.value.firstName;
    const lastName = this.addDependentForm.value.lastName;
    const relationShip = this.relationShipOptions.find(f => f.value === this.addDependentForm.value.relationShip).label;
    const dob = this.addDependentForm.value.dob;
    if (this.dependentArray && this.dependentArray.length > 0) {
      this.dependentArray.forEach(dep => {
        if (dep.FirstName.trim() === firstName.trim() && dep.LastName.trim() === lastName.trim() &&
          dep.DependentRelationship.trim() === relationShip.trim() && this.convertDate(dep.DateOfBirth) === this.convertDateInUS(dob)) {
          this.errorText = 'This Dependent is already available in record';
          return true;
        }
      });
    }
    if (this.errorText) {
      return true;
    } else {
      return false;
    }
  }

  validateForm() {
    const missingRequiredFields: any = [];
    Object.keys(this.addDependentForm.controls).forEach(key => {
      if (this.addDependentForm.get(key).errors && this.addDependentForm.get(key).errors.required) {
        missingRequiredFields.push(key);
        return false;
      }
    });
    if (this.addDependentForm.invalid) {
      if (missingRequiredFields.length > 0) {
        this.errorText = constants.MANDATORY_FIELDS;
      }
      return false;
    } else {
      this.errorText = '';
      return true;
    }
  }

  openConfirmationDialog(obj) {
    let showMessage: any;
    if (this.infoText) {
      showMessage = ' 1. ' + this.infoText + '<br/> 2. New dependent addition will have impact on you premium amount. Are you sure to Add new dependent?'
    }
    else {
      showMessage = 'New dependent addition will have impact on you premium amount. Are you sure to Add new dependent?';
    }
    this.confirmationService.confirm({
      message: showMessage,
      header: 'Confirmation',
      key: 'addConfirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.childevent.emit();
        /* this.dependentService.addDependent(obj).subscribe((res: any) => {
          if (res.Item1 === 7000) {
            this.msgSevice.clear();
            this.msgs = [];
            this.memberDependentId = res.item2;
            // if (this.fileNme) {
            //   this.uploadTOServer(this.fileNme, this.base64, obj);
            // } else {
            //   this.display = false;
            //   this.closePopUpEvent.emit(obj);
            // }
            this.display = false;
            //this.closePopUpEvent.emit(obj);
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
          }); */
      },
      reject: () => {
        this.msgs = [];
      }
    });
  }



  onSubmit() {
    this.errorText = '';
    this.isSubmitted = true;
    this.addDependentForm.updateValueAndValidity();

    if (this.validateForm() && this.addDependentForm.valid) {

      if (this.validateDuplicateDependents() || this.validateSpouseAge() || this.validateChildAge()) {
        return;
      } else {

        const obj = {
          FirstName: this.addDependentForm.get('firstName').value,
          LastName: this.addDependentForm.get('lastName').value,
          Gender: this.addDependentForm.get('gender').value,
          DOB: this.convertDateInUS(this.addDependentForm.get('dob').value),
          MemberId: sessionStorage.getItem('MemberId'),
          //isTobaccoUser: this.addDependentForm.get('tobaccoUse').value,
          RelationshipId: this.addDependentForm.get('relationShip').value,
        };

        sessionStorage.setItem('DependentDetails', JSON.stringify(this.addDependentForm.value));
        sessionStorage.setItem('Info', this.infoText);
        this.childevent.emit();
        //this.openConfirmationDialog(obj);
      }
    }
  }


  onCancel() {
    this.errorText = '';
    this.isSubmitted = false;
    sessionStorage.removeItem('DependentDetails');
    sessionStorage.removeItem('Info');
    sessionStorage.removeItem('HealthAssesment1');
    this.dependentService.addDependentPopUpNotifier.next(false);
    // this.closePopUpEvent.emit();
  }

  // processFile(event) {
  //   this.errorTextImg = '';
  //   const mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.errorTextImg = constants.INVALID_FORMAT;
  //     return;
  //   }

  //   if (event.target.files[0].size > 2000000) {
  //     this.errorTextImg = constants.BIGGER_IMAGE;
  //     return;
  //   }
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = e => {
  //       this.url = reader.result;
  //       this.base64 = this.url.replace('data:image/jpeg;base64,', '').replace('data:image/png;base64,', '');
  //       this.fileNme = event.target.files[0].name;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  uploadTOServer(filename, base64, obj: any) {
    this.uploadDoc = [{
      fileContent: base64,
      fileName: filename,
      documentId: 0,
      fileType: 'Image',
      description: 'Image',
      notes: 'Image',
      documentTypeId: 0,
      documentStatusId: 0,
      ownerTypeId: 2,
      ownerId: 2,
      createdBy: 2,
      createdOn: new Date(),
      isSecuredDocument: true,
      documentCreatedDate: new Date(),
      documentId123: '',
      url123: '',
      isUploadedS3123: true

    }];
    // this.sharedService.uploadUserPictureForDMS(this.uploadDoc).subscribe((res) => {
    //   if (res) {
    //     this.scuccessTest = constants.IMAGE_SUCCESS;
    //     setTimeout((e) => { this.scuccessTest = ''; }, 2000);
    //     const upateAvatharToPM = {
    //       documentType: 'avatarimage',
    //       documentId: res[0].documentId,
    //       identifier: this.memberDependentId,
    //       memberType: 'dependent'
    //     };
    //     this.sharedService.uploadUserPictureForMP(upateAvatharToPM).subscribe((res1) => {
    //       if (res1) {
    //         this.localStorageService.saveSessionData(this.base64, 'image_' + upateAvatharToPM.documentId);
    //         this.display = false;
    //         this.closePopUpEvent.emit(obj);
    //         this.utilService.picUploadNotifier.next(true);
    //       }
    //     });
    //   }
    // });
  }
}