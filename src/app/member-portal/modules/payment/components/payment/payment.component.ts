import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../../service/payment.service';
import * as constants from '@core/constants/app-constants';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import { SelectItem } from 'primeng/api';
import { PaymentDetail } from '../../Modals/paymentDetail';
import { validateBlankSpace } from '@core/validators/blank-space.validator';
import { RegexConstants } from '@app/core/constants/regex-constants';
import { MonthData } from '@app/core/constants/data-constants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constants = constants;
  months: SelectItem[] = MonthData;
  accountType: SelectItem[] = [
    { label: 'Checking', value: 'Checking' },
    { label: 'Savings', value: 'Savings' }];
  paymentCardForm: FormGroup;
  paymentACHForm: FormGroup;
  isSubmitted: boolean;
  userId: string;
  preSelectedMethod: any = 'Credit Card';
  iconName = constants.ICON_PAYMENT;
  headerHtml = 'Payment Method Details';
  errorText = '';
  show: boolean;
  states: SelectItem[];
  paymentDetail: PaymentDetail;
  confirmationDialogue: boolean;
  wrongCardYear = false;
  wrongCardMonth = false;
  successText = '';
  dialogHeader = '';
  invalidCardNumber = false;
  invalidZipCode = false;
  constructor(private paymentService: PaymentService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.createCardForm();
    this.createACHForm();
    this.userId = sessionStorage.getItem('userId');
    this.paymentService.getMemberPaymentDetails(this.userId).subscribe((res: PaymentDetail) => {
      if (res) {
        this.paymentDetail = res;
        if (this.paymentDetail.Last4Digits) {
          this.paymentDetail.Last4Digits = this.getMaskedNumber(this.paymentDetail.Last4Digits);
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
    this.dashboardService.getStates().subscribe(res => {
      const usStates: any = res;
      if (usStates && usStates.length > 0) {
        this.states = usStates.map(function (elm) {
          return {
            value: { stateCode: elm['StateCode'], timeZone: elm['TimeZone'] },
            label: elm['StateName']
          };
        });
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  onValidateYear(event: any) {
    if (event.target.value.toString().length > 4) {
      event.target.value = parseInt(event.target.value.toString().substring(0, 4), 10);
    }
  }
  PaymentMethodRadioClick(event: any) {
    this.isSubmitted = false;
    this.errorText = '';
  }


  onAutoFill(event: any) {
    if (event) {
      this.paymentCardForm.patchValue({
        FirstName: this.paymentDetail.FirstName,
        LastName: this.paymentDetail.LastName,
        Address: this.paymentDetail.Address,
        City: this.paymentDetail.City,
        State: this.states.find(c => c.value.stateCode === this.paymentDetail.State),
        ZipCode: this.paymentDetail.ZipCode
      });
    } else {
      this.paymentCardForm.
        patchValue({
          FirstName: '',
          LastName: '',
          Address: '',
          City: '',
          State: '',
          ZipCode: ''
        });
    }

  }
  createCardForm() {
    this.paymentCardForm = new FormGroup({
      CardNumber: new FormControl('', [Validators.required, validateBlankSpace]),
      Month: new FormControl('', [Validators.required]),
      Year: new FormControl('', [Validators.required]),
      Cvv: new FormControl('', [Validators.required, validateBlankSpace]),
      AutoFill: new FormControl(''),
      FirstName: new FormControl('', [Validators.required, validateBlankSpace]),
      LastName: new FormControl('', [Validators.required, validateBlankSpace]),
      Address: new FormControl('', [Validators.required, validateBlankSpace]),
      City: new FormControl('', [Validators.required, validateBlankSpace]),
      State: new FormControl('', [Validators.required]),
      ZipCode: new FormControl('', [Validators.required, validateBlankSpace])
    });
  }
  limitYear(event: any) {
    this.wrongCardYear = false;
    if (event.target.value.toString().length > 4) {
      event.target.value = parseInt(event.target.value.toString().substring(0, 4), 10);
    }
  }
  limitZipCode(event: any) {
    if (event.target.value.toString().length > 9) {
      event.target.value = parseInt(event.target.value.toString().substring(0, 9), 10);
    }
  }
  onAddNewPayment() {
    this.preSelectedMethod = 'Credit Card';
    this.show = true;
  }

  onCancel(event: any) {
    this.dialogHeader = constants.Payment_Cancel_Confirmation;
    this.confirmationDialogue = true;
  }
  validateNumber(event: any): number {
    event.target.value = event.target.value.toString().trim();
    if (isNaN(event.target.value)) {
      event.target.value = event.target.value.replace(RegexConstants.PhoneNumber, '');
      return event.target.value;
    }
  }
  createACHForm() {
    this.paymentACHForm = new FormGroup({
      RoutingNumber: new FormControl('', [Validators.required, validateBlankSpace]),
      AccountNumber: new FormControl('', [Validators.required, validateBlankSpace]),
      BankName: new FormControl('', [Validators.required, validateBlankSpace]),
      AccountType: new FormControl('', [Validators.required]),
      FirstName: new FormControl('', [Validators.required, validateBlankSpace]),
      LastName: new FormControl('', [Validators.required, validateBlankSpace])
    });
  }
  cancel() {
    this.confirmationDialogue = false;
  }
  onNo() {
    this.confirmationDialogue = false;
  }
  onConform() {
    if (this.dialogHeader === constants.Payment_Cancel_Confirmation) {
      this.show = false;
      this.isSubmitted = false;
      this.errorText = '';
      this.successText = '';
      this.clearPaymrntFormControls();
      this.confirmationDialogue = false;
    } else {
      if (this.preSelectedMethod === 'Credit Card') {
        this.updateCreditCardInformation();
      }
      if (this.preSelectedMethod === 'ACH Bank Draft') {
        this.updateBankAccountInformation();
      }
    }
  }
  updateCreditCardInformation() {
    this.paymentDetail = this.paymentCardForm.value;
    this.paymentDetail.UserId = this.userId;
    const stateValue: any = this.paymentDetail.State;
    if (stateValue.value) {
      this.paymentDetail.State = stateValue.value.stateCode;
    }
    const obj = {
      paymentMethodType: this.preSelectedMethod === 'Credit Card' ? 'CC' : 'ACH',
      creditCardNumber: this.getMaskedNumber(this.paymentCardForm.get('CardNumber').value.toString()),
      userId: this.userId,
      IsCardUpdate: true
    };
    this.paymentService.updatePaymentInformation(obj).subscribe((res) => {
      if (res) {
        this.confirmationDialogue = false;
        this.isSubmitted = false;
        if (res === 7005) {
          this.errorText = '';
          this.clearPaymrntFormControls();
          this.successText = constants.PAYMENT_UPDATE_SUCCESS;
          this.show = false;
          this.HideSuccessText();
          this.updateDisplayedData();
        } else if (res === 7006) {
          this.errorText = constants.Payment_update_Error;
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  updateBankAccountInformation() {
    // this.paymentDetail = this.paymentCardForm.value;
    // this.paymentDetail.UserId = this.userId;
    // const stateValue: any = this.paymentDetail.State;
    // if (stateValue.value) {
    //   this.paymentDetail.State = stateValue.value.stateCode;
    // }
    const obj = {
      paymentMethodType: this.preSelectedMethod === 'Credit Card' ? 'CC' : 'ACH',
      bankRoutingNumber: this.getMaskedNumber(this.paymentACHForm.get('RoutingNumber').value.toString()),
      bankAccountNumber: this.getMaskedNumber(this.paymentACHForm.get('AccountNumber').value.toString()),
      userId: this.userId,
      IsACHUpdate: true
    };
    this.paymentService.updatePaymentInformation(obj).subscribe((res) => {
      if (res) {
        this.isSubmitted = false;
        this.confirmationDialogue = false;
        if (res === 7005) {
          this.errorText = '';
          this.clearPaymrntFormControls();
          this.successText = constants.PAYMENT_UPDATE_SUCCESS;
          this.show = false;
          this.HideSuccessText();
          this.updateDisplayedData();
        } else if (res === 7006) {
          this.errorText = constants.Payment_update_Error;
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  updateDisplayedData() {
    this.paymentService.getMemberPaymentDetails(this.userId).subscribe((res: PaymentDetail) => {
      if (res) {
        this.paymentDetail = res;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  HideSuccessText() {
    const that = this;
    setTimeout(function () {
      that.successText = '';
    }, 10000);
  }
  getMaskedNumber(number) {
    let maskNumber = '';
    for (let index = 0; index < number.length; index++) {
      if (index < number.length - 4) {
        maskNumber += 'X';
      } else {
        maskNumber += number[index];
      }
    }
    return maskNumber;
  }
  clearPaymrntFormControls() {
    this.paymentCardForm.patchValue({
      CardNumber: '',
      Month: undefined,
      Year: '',
      Cvv: '',
      AutoFill: '',
      FirstName: '',
      LastName: '',
      Address: '',
      City: '',
      State: '',
      ZipCode: ''
    });
    this.paymentACHForm.patchValue({
      RoutingNumber: '',
      AccountNumber: '',
      BankName: '',
      AccountType: '',
      FirstName: '',
      LastName: ''
    });
  }

  onSubmit() {
    if (this.preSelectedMethod === 'Credit Card') {
      if (this.paymentCardForm.invalid) {
        this.isSubmitted = true;
        this.errorText = this.constants.FILL_REQUIRED_FIELDS;
        return;
      } else if (this.validateCardDetails(this.paymentCardForm.get('CardNumber').value.toString())) {
        this.validateDate();
        if (this.errorText === '') {
          // check for zip code
          const zipcode = this.paymentCardForm.get('ZipCode').value;
          if (zipcode.toString().length === 5 || zipcode.toString().length === 9) {
            this.invalidZipCode = false;
            this.dialogHeader = constants.Payment_Change_Confirmation_CC;
            this.confirmationDialogue = true;
          } else {
            this.invalidZipCode = true;
            this.errorText = constants.INVALID_ZIP;
          }
        }
      } else {
        this.invalidCardNumber = true;
        this.errorText = constants.INVALID_CARDNUMBER;
      }
    } else if (this.preSelectedMethod === 'ACH Bank Draft') {
      if (this.paymentACHForm.invalid) {
        this.isSubmitted = true;
        this.errorText = this.constants.FILL_REQUIRED_FIELDS;
        return;
      } else {
        this.errorText = '';
        if (this.errorText === '') {
          this.dialogHeader = constants.Payment_Change_Confirmation_ACH;
          this.confirmationDialogue = true;
        }
      }
    }

  }
  validateDate() {
    const year = this.paymentCardForm.get('Year').value;
    const month = this.paymentCardForm.get('Month').value;
    if (year || year.toString().length > 0) {
      const date = new Date();
      const currentYear = date.getFullYear();
      const currentMonth = date.getMonth() + 1;
      if (year < currentYear) {
        this.wrongCardYear = true;
        this.errorText = this.constants.PAYMENT_CARD_INVALID;
      } else if (year === currentYear && month < currentMonth) {
        this.wrongCardMonth = true;
        this.errorText = this.constants.PAYMENT_CARD_INVALID;
      } else {
        this.errorText = '';
      }
    }
  }
  CardMonthChanged() {
    if (this.wrongCardMonth) {
      this.wrongCardMonth = false;
    }
  }
  validateCardDetails(cardNumber) {
    const validCards = constants.ValidCartTypes;
    const foundCard = validCards.filter(c => cardNumber.startsWith(c.startWith) && cardNumber.length === c.length);
    if (foundCard && foundCard.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
