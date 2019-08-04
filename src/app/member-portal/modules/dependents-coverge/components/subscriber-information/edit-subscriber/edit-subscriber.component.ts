import {
  Component, OnInit, Input, OnChanges,
  SimpleChanges, Output, EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import * as constants from '@core/constants/app-constants';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { DependentsCoverageService } from '../../../services/dependents-coverage.service';
import { isNullOrUndefined } from 'util';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Message, MessageService } from 'primeng/components/common/api';

import { _ } from 'underscore';

@Component({
  selector: 'app-edit-subscriber',
  templateUrl: './edit-subscriber.component.html',
  styleUrls: ['./edit-subscriber.component.scss'],
  providers: [DatePipe]
})
export class EditSubscriberComponent implements OnInit, OnChanges {

  errorText = '';
  constants = constants;
  editSubscriberForm: FormGroup;
  isSubmitted: boolean;
  msgs: Message[] = [];
  convert: any;
  isAddressVerifying = false;
  @Input() openEditSubscriberPopUp: boolean;
  @Input() subscriberInfo: any;
  @Output() cancelEditSubscriberEvent = new EventEmitter<any>();

  @Input() states: SelectItem[] = [];
  selectedStateProvince: any;
  memberAdressObj: any;
  memberDetailsObj: any;
  isAddressVerified: boolean;
  addressObjBeforeUSPS: { address1: any; address2: any; city: any; stateProvince: any; zipCode: any; };
  addressObjAfterUSPS: { address1: any; address2: any; city: any; stateProvince: any; zipCode: any; };

  constructor(private confirmationService: ConfirmationService,
    private dependentService: DependentsCoverageService, private datePipe: DatePipe, private msgSevice: MessageService) { }

  ngOnChanges(changes: SimpleChanges) {
    const subscriberInfoChanges = changes['subscriberInfo'];
    if (subscriberInfoChanges && subscriberInfoChanges.previousValue !== subscriberInfoChanges.currentValue && this.subscriberInfo) {
      this.patchFormValues();
      this.isAddressVerified = false;
    }
  }


  patchFormValues() {
    this.editSubscriberForm.patchValue({
      memberId: this.subscriberInfo.ExternalMemberId,
      groupID: this.subscriberInfo.GroupID,
      subGroupID: this.subscriberInfo.SubGroupID,
      divisionID: this.subscriberInfo.DivisionID,
      paidThroughDate: this.subscriberInfo.PaidThroughDate,
      firstName: this.subscriberInfo.FirstName,
      lastName: this.subscriberInfo.LastName,
      gender: this.subscriberInfo.Gender,
      dateofBirth: this.datePipe.transform(this.subscriberInfo.DateofBirth, 'MM/dd/yyyy'),
      phone: this.subscriberInfo.PhoneNumber,
      email: this.subscriberInfo.Email,
      address1: this.subscriberInfo.Address1,
      address2: this.subscriberInfo.Address2,
      city: this.subscriberInfo.City,
      stateProvince: this.states.find(s =>
        s.value.StateCode.trim().toLowerCase() === this.subscriberInfo.StateProvince.trim().toLowerCase()),
      zipCode: this.subscriberInfo.ZipCode.length === 9 ? this.subscriberInfo.ZipCode.substring(0, 5) + '-'
        + this.subscriberInfo.ZipCode.substring(5, 9) : this.subscriberInfo.ZipCode
    });
  }



  ngOnInit() {
    this.convert = require('xml-js');
    this.editSubscriberForm = new FormGroup(
      {
        memberId: new FormControl({ value: '', disabled: true }),
        groupID: new FormControl({ value: '', disabled: true }),
        subGroupID: new FormControl({ value: '', disabled: true }),
        divisionID: new FormControl({ value: '', disabled: true }),
        paidThroughDate: new FormControl({ value: '', disabled: true }),
        firstName: new FormControl({ value: '', disabled: true }),
        lastName: new FormControl({ value: '', disabled: true }),
        dateofBirth: new FormControl({ value: '', disabled: true }),
        gender: new FormControl({ value: '', disabled: true }),
        email: new FormControl('', [
          Validators.required,
          this.validateSpaces,
          this.validateEmail,
        ]),
        phone: new FormControl('', [
          Validators.required,
          this.validateSpaces,
          this.validatePhoneNumber
        ]),
        address1: new FormControl('', [Validators.required, this.validateSpaces]),
        address2: new FormControl('', []),
        city: new FormControl('', [Validators.required, this.validateSpaces]),
        stateProvince: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, this.validateSpaces, this.validateZipCode])
      },
    );
  }

  validateNumber(event: any) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)
      && (event.keyCode !== 8) && (event.keyCode !== 46) && (event.keyCode !== 39) && (event.keyCode !== 37)
      && (event.keyCode !== 9)) {
      event.preventDefault();
    }
  }


  validatePhoneNumber(control: AbstractControl) {
    if (control.value && control.value.length < 10) {
      return { Invalid_Phone: true };
    }
    return null;
  }


  validateSpaces(control: AbstractControl) {
    if (!isNullOrUndefined(control.value) && !control.value.toString().trim()) {
      return { Invalid_Characters: true };
    }
    return null;
  }

  validateEmail(control: AbstractControl) {
    const re = RegexConstants.EmailId;
    let valid = true;
    valid = re.test(String(control.value).toLowerCase());
    if (!valid) {
      return { Invalid_Email: true };
    }
    return null;
  }

  validateZipCode(control: AbstractControl) {
    const re = RegexConstants.Zipcode;
    let valid = true;
    if (control.value && !(control.value.toString().length > 10)) {
      valid = re.test(String(control.value).toLowerCase());
      if (!valid) {
        return { Invalid_ZipCode: true };
      }
    }
    return null;
  }

  validateForm() {
    const missingRequiredFields: any = [];
    Object.keys(this.editSubscriberForm.controls).forEach(key => {
      if (this.editSubscriberForm.get(key).errors && this.editSubscriberForm.get(key).errors.required) {
        missingRequiredFields.push(key);
        return false;
      }
    });

    if (this.editSubscriberForm.invalid) {
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

  objectCreation() {
    this.memberAdressObj = {
      Id: sessionStorage.getItem('MemberId'),
      AddressType: 0,
      AddressLine1: this.editSubscriberForm.get('address1').value,
      AddressLine2: this.editSubscriberForm.get('address2').value,
      ZipCode: this.editSubscriberForm.get('zipCode').value.split('-').length > 1 ?
        this.editSubscriberForm.get('zipCode').value.split('-')[0] + this.editSubscriberForm.get('zipCode').value.split('-')[1]
        : this.editSubscriberForm.get('zipCode').value,
      StateName: this.editSubscriberForm.get('stateProvince').value.label,
      StateCode: this.editSubscriberForm.get('stateProvince').value.value.StateCode,
      City: this.editSubscriberForm.get('city').value,
      PhoneNumber: this.editSubscriberForm.get('phone').value,
      Email: this.editSubscriberForm.get('email').value,
    };

    this.memberDetailsObj = {
      MemberId: sessionStorage.getItem('MemberId'),
      Name: '',
      Address: '',
      PhoneNumber: this.editSubscriberForm.get('phone').value,
      Email: this.editSubscriberForm.get('email').value,
      Gender: '',
      DateOfBirth: '',
      Age: 0,
      Status: 0,
      CreatedDate: '',
      ActiveDate: '',
      InactiveDate: '',
      HoldDate: '',
      HoldReason: '',
      InactiveReason: '',
      SignatureOnFile: '',
      CancellationReason: '',
      Cancelled: '',
      Broker: '',
      MemerDependents: null,
    };
  }

  saveSubscriberInfo() {
    this.errorText = '';
    this.isSubmitted = true;
    if (!this.isAddressVerified) {
      this.validateAddress();
    } else if (this.validateForm() && this.editSubscriberForm.valid) {
      this.updateSubscriberDataToDB();
    }
  }
  updateSubscriberDataToDB() {
    this.errorText = '';
    this.objectCreation();
    if (this.memberAdressObj && this.memberDetailsObj) {
      this.subscriberInfo.MemberAddress = [];
      this.subscriberInfo.MemberAddress.push(this.memberAdressObj);
      this.subscriberInfo.MemberDetails = this.memberDetailsObj;
      this.subscriberInfo.Address1 = this.memberAdressObj.AddressLine1;
      this.subscriberInfo.Address2 = this.memberAdressObj.AddressLine2;
      this.subscriberInfo.City = this.memberAdressObj.City;
      this.subscriberInfo.StateProvince = this.memberAdressObj.StateCode;
      this.subscriberInfo.ZipCode = this.memberAdressObj.ZipCode;
      this.subscriberInfo.PhoneNumber = this.memberAdressObj.PhoneNumber;
      this.subscriberInfo.Email = this.memberAdressObj.Email;
      this.errorText = '';
      if (!this.AddressObjectComparison()) {
        this.openConfirmationDialog(this.subscriberInfo);
      } else {
        this.submit(this.subscriberInfo);
      }
    }
  }
  onCancel() {
    this.errorText = '';
    this.isSubmitted = false;
    this.patchFormValues();
    this.cancelEditSubscriberEvent.emit(this.subscriberInfo);
  }

  // To validate memeber address
  validateAddress() {
    if (
      !this.editSubscriberForm.value.address1 ||
      !this.editSubscriberForm.value.city ||
      !this.editSubscriberForm.value.stateProvince ||
      !this.editSubscriberForm.value.zipCode
    ) {
      this.errorText = 'Address Required';
      return;
    }
    if (!this.editSubscriberForm.value.address2) {
      this.editSubscriberForm.value.address2 = '';
    }

    this.addressObjBeforeUSPS = {
      address1: this.editSubscriberForm.value.address1,
      address2: this.editSubscriberForm.value.address2,
      city: this.editSubscriberForm.value.city,
      stateProvince: this.editSubscriberForm.value.stateProvince,
      zipCode: this.editSubscriberForm.value.zipCode
    };
    this.verifyAddress();
  }
  verifyAddress() {
    this.errorText = '';
    this.dependentService.verifyAddress(this.editSubscriberForm.value).subscribe(res => {
      const result = this.convert.xml2json(res, { compact: true, spaces: 4 });
      const validAddress = JSON.parse(result);
      if (
        validAddress.AddressValidateResponse.Address.hasOwnProperty('Address1')
      ) {

        this.editSubscriberForm.patchValue({
          address1: validAddress.AddressValidateResponse.Address.Address1._text,
          address2: validAddress.AddressValidateResponse.Address.Address2 ?
            validAddress.AddressValidateResponse.Address.Address2._text : '',
          city: validAddress.AddressValidateResponse.Address.City._text,
          stateProvince: this.states.find(s =>
            s.value.StateCode.trim().toLowerCase() === validAddress.AddressValidateResponse.Address.State._text.trim().toLowerCase()),
          zipCode: Object.keys(validAddress.AddressValidateResponse.Address.Zip4).length > 0 ?
          validAddress.AddressValidateResponse.Address.Zip5._text + '-' + validAddress.AddressValidateResponse.Address.Zip4._text :
          validAddress.AddressValidateResponse.Address.Zip5._text,
        });
        this.isAddressVerified = true;
        this.addressObjAfterUSPS = {
          address1: this.editSubscriberForm.value.address1,
          address2: this.editSubscriberForm.value.address2,
          city: this.editSubscriberForm.value.city,
          stateProvince: this.editSubscriberForm.value.stateProvince,
          zipCode: this.editSubscriberForm.value.zipCode
        };
      } else if (
        !validAddress.AddressValidateResponse.Address.hasOwnProperty('Address1') &&
        validAddress.AddressValidateResponse.Address.hasOwnProperty('Address2')
      ) {
        this.editSubscriberForm.patchValue({
          address1: validAddress.AddressValidateResponse.Address.Address2._text,
          address2: '',
          city: validAddress.AddressValidateResponse.Address.City._text,
          stateProvince: this.states.find(s =>
            s.value.StateCode.trim().toLowerCase() === validAddress.AddressValidateResponse.Address.State._text.trim().toLowerCase()),
          zipCode: Object.keys(validAddress.AddressValidateResponse.Address.Zip4).length > 0 ?
          validAddress.AddressValidateResponse.Address.Zip5._text + '-' + validAddress.AddressValidateResponse.Address.Zip4._text :
          validAddress.AddressValidateResponse.Address.Zip5._text,
        });
        this.isAddressVerified = true;
        this.addressObjAfterUSPS = {
          address1: this.editSubscriberForm.value.address1,
          address2: this.editSubscriberForm.value.address2,
          city: this.editSubscriberForm.value.city,
          stateProvince: this.editSubscriberForm.value.stateProvince,
          zipCode: this.editSubscriberForm.value.zipCode
        };
      } else if (validAddress.AddressValidateResponse.Address.hasOwnProperty('Error')) {
        this.errorText = validAddress.AddressValidateResponse.Address.Error.Description._text;
        this.isAddressVerified = false;
        this.isSubmitted = false;
      }
      if (this.isSubmitted && this.isAddressVerified) {
        if (this.validateForm() && this.editSubscriberForm.valid) {
          this.updateSubscriberDataToDB();
        }
      } else {

      }
    });
  }

  AddressObjectComparison(): boolean {
    return _.isEqual(this.addressObjAfterUSPS, this.addressObjBeforeUSPS) ? true : false;
  }

  openConfirmationDialog(obj) {

    this.confirmationService.confirm({
      message: constants.CONFIRMATION_ON_ADDRESS_CHANGE,
      header: 'Confirmation',
      key: 'ConfirmationForSubscriberDetails',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.submit(obj);
      },
      reject: () => {
        this.isAddressVerified = false;
        this.isSubmitted = false;
        this.msgs = [];
      }
    });
  }

  submit(obj) {
    this.dependentService.updateSubscriberInformation(obj).subscribe((res: number) => {
      if (res === 7014) {
        this.msgSevice.clear();
        this.msgs = [];
        this.isAddressVerified = false;
        this.isSubmitted = false;
        this.cancelEditSubscriberEvent.emit(obj);
        this.msgSevice.add({ severity: 'success', summary: 'Updated Successfully' });
        setTimeout(() => {
          this.msgSevice.clear();
        }, 5000);
      } else if (res === 7013) {
        this.errorText = 'Sorry, Customer Healthcare does not operate in the ' +
          this.editSubscriberForm.get('stateProvince').value.label +
          '. Please get in touch with member services at (844) 834-3456 for any assistance.';
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500 && err.error.ErrorCode === 7010) {
          /* this.errorText = 'Sorry, Customer Healthcare does not operate in the ' +
            this.editSubscriberForm.get('stateProvince').value.label +
             '. Please get in touch with member services at (844) 834-3456 for any assistance.'; */
        } else if (err.status === 500 && err.error.ErrorCode === 7009) {
          /* this.errorText = 'Sorry, Customer Healthcare does not operate in the ' +
            this.editSubscriberForm.get('stateProvince').value.label +
             '. Please get in touch with member services at (844) 834-3456 for any assistance.'; */
        }
      });
  }
}
