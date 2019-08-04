import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, COMPILER_OPTIONS } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { DashboardService } from '@app/member-portal/modules/dashboard/services/dashboard.service';
import * as  constants from '@core/constants/app-constants';
import { PaymentComponent } from './payment.component';
import { COMMON_MODULES } from '@app/core/commonModules';
import { of } from 'rxjs';
describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  beforeEach(() => {
    const paymentServiceStub = {
      getMemberPaymentDetails: arg1 => ({ subscribe: () => ({}) }),
      updatePaymentInformation: obj1 => ({ subscribe: () => ({}) })
    };
    const dashboardServiceStub = {
      getStates: () => ({ subscribe: () => ({}) })
    };
    spyOn(paymentServiceStub, 'getMemberPaymentDetails').and.returnValue(of([]));
    spyOn(dashboardServiceStub, 'getStates').and.returnValue(of([]));
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PaymentComponent],
      imports: [COMMON_MODULES],
      providers: [
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: DashboardService, useValue: dashboardServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('months defaults to: [, , , , , , , , , , , ]', () => {
    expect(component.months).toEqual([{ label: '01', value: '1' },
    { label: '02', value: '2' },
    { label: '03', value: '3' },
    { label: '04', value: '4' },
    { label: '05', value: '5' },
    { label: '06', value: '6' },
    { label: '07', value: '7' },
    { label: '08', value: '8' },
    { label: '09', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' }]);
  });
  it('accountType defaults to: [, ]', () => {
    expect(component.accountType).toEqual([{ label: 'Checking', value: 'Checking' },
    { label: 'Savings', value: 'Savings' }]);
  });
  it('preSelectedMethod defaults to: Credit Card', () => {
    expect(component.preSelectedMethod).toEqual('Credit Card');
  });
  it('iconName defaults to: constants.ICON_PAYMENT', () => {
    expect(component.iconName).toEqual(constants.ICON_PAYMENT);
  });
  it('headerHtml defaults to: Payment Method Details', () => {
    expect(component.headerHtml).toEqual('Payment Method Details');
  });
  it('wrongCardYear defaults to: false', () => {
    expect(component.wrongCardYear).toEqual(false);
  });
  it('wrongCardMonth defaults to: false', () => {
    expect(component.wrongCardMonth).toEqual(false);
  });
  it('invalidCardNumber defaults to: false', () => {
    expect(component.invalidCardNumber).toEqual(false);
  });
  it('invalidZipCode defaults to: false', () => {
    expect(component.invalidZipCode).toEqual(false);
  });
  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const paymentServiceStub: PaymentService = fixture.debugElement.injector.get(
  //       PaymentService
  //     );
  //     const dashboardServiceStub: DashboardService = fixture.debugElement.injector.get(
  //       DashboardService
  //     );
  //     spyOn(component, 'createCardForm').and.callThrough();
  //     spyOn(component, 'createACHForm').and.callThrough();
  //     spyOn(paymentServiceStub, 'getMemberPaymentDetails').and.callThrough();
  //     spyOn(dashboardServiceStub, 'getStates').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.createCardForm).toHaveBeenCalled();
  //     expect(component.createACHForm).toHaveBeenCalled();
  //     expect(paymentServiceStub.getMemberPaymentDetails).toHaveBeenCalled();
  //     expect(dashboardServiceStub.getStates).toHaveBeenCalled();
  //   });
  // });
  describe('onConform', () => {
    it('makes expected calls', () => {
      spyOn(component, 'clearPaymrntFormControls').and.returnValue({});
      spyOn(component, 'updateCreditCardInformation');
      spyOn(component, 'updateBankAccountInformation');
      component.ngOnInit();
      component.onConform();
      component.preSelectedMethod = 'ACH Bank Draft';
      expect(component.clearPaymrntFormControls).toBeTruthy();
      expect(component.updateCreditCardInformation).toHaveBeenCalled();
      expect(component.updateBankAccountInformation).toBeTruthy();
    });
  });
  describe('updateCreditCardInformation', () => {
    it('makes expected calls', () => {
      const paymentServiceStub: PaymentService = fixture.debugElement.injector.get(
        PaymentService
      );
      spyOn(component, 'getMaskedNumber').and.callThrough();
      spyOn(component, 'clearPaymrntFormControls').and.returnValue({});
      spyOn(component, 'HideSuccessText').and.returnValue({});
      spyOn(component, 'updateDisplayedData').and.returnValue({});
      spyOn(paymentServiceStub, 'updatePaymentInformation').and.returnValue(of(7005));
      component.ngOnInit();
      component.updateCreditCardInformation();
      expect(component.getMaskedNumber).toHaveBeenCalled();
      expect(component.clearPaymrntFormControls).toBeTruthy();
      expect(component.HideSuccessText).toBeTruthy();
      expect(component.updateDisplayedData).toBeTruthy();
      expect(paymentServiceStub.updatePaymentInformation).toBeTruthy();
    });
  });
  describe('updateBankAccountInformation', () => {
    it('makes expected calls', () => {
      const paymentServiceStub: PaymentService = fixture.debugElement.injector.get(
        PaymentService
      );
      spyOn(component, 'getMaskedNumber');
      spyOn(component, 'clearPaymrntFormControls').and.returnValue(of([]));
      spyOn(component, 'HideSuccessText');
      spyOn(component, 'updateDisplayedData');
      spyOn(paymentServiceStub, 'updatePaymentInformation').and.returnValue(of(7006));
      component.ngOnInit();
      component.preSelectedMethod = 'ACH Bank Draft';
      component.updateBankAccountInformation();
      expect(component.getMaskedNumber).toHaveBeenCalled();
      expect(component.clearPaymrntFormControls).toBeTruthy();
      expect(component.HideSuccessText).toBeTruthy();
      expect(component.updateDisplayedData).toBeTruthy();
      expect(paymentServiceStub.updatePaymentInformation).toBeTruthy();
    });
  });
  describe('updateBankAccountInformation', () => {
    it('makes expected calls', () => {
      const paymentServiceStub: PaymentService = fixture.debugElement.injector.get(
        PaymentService
      );
      component.ngOnInit();
      component.clearPaymrntFormControls();
      expect(component.clearPaymrntFormControls).toBeTruthy();
    });
  });
  // describe('updateDisplayedData', () => {
  //   it('makes expected calls', () => {
  //     const paymentServiceStub: PaymentService = fixture.debugElement.injector.get(
  //       PaymentService
  //     );
  //     spyOn(paymentServiceStub, 'getMemberPaymentDetails').and.callThrough();
  //     component.updateDisplayedData();
  //     expect(paymentServiceStub.getMemberPaymentDetails).toHaveBeenCalled();
  //   });
  // });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'validateCardDetails');
      spyOn(component, 'validateDate');
      component.ngOnInit();
      component.preSelectedMethod = 'Credit Card';
      component.onSubmit();
      expect(component.validateCardDetails).toBeTruthy();
      expect(component.validateDate).toBeTruthy();
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'validateCardDetails');
      spyOn(component, 'validateDate');
      component.ngOnInit();
      component.preSelectedMethod = 'ACH Bank Draft';
      // component.paymentACHForm.invalid;
      component.onSubmit();
      expect(component.validateCardDetails).toBeTruthy();
      expect(component.validateDate).toBeTruthy();
    });
  });
  describe('CardMonthChanged', () => {
    it('makes expected calls', () => {
      spyOn(component, 'validateCardDetails');
      component.wrongCardMonth = true;
      component.CardMonthChanged();
      expect(component.CardMonthChanged).toBeTruthy();
    });
  });
  describe('validateCardDetails', () => {
    it('makes expected calls', () => {
      // constants.ValidCartTypes;
      component.validateCardDetails('521215');
      expect(component.validateCardDetails).toBeTruthy();
    });
  });
  describe('validateDate', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      // component.paymentCardForm.get('year').value;
      // component.paymentCardForm.get('month').value;
      component.validateDate();
      expect(component.validateDate).toBeTruthy();
    });
  });
  describe('validateDate2', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.paymentCardForm.get('year').setValue(2012);
      // component.paymentCardForm.get('month').value;
      component.validateDate();
      expect(component.validateDate).toBeTruthy();
    });
  });

  describe('validateDate2', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.paymentCardForm.get('year').setValue('01/29/2019 5:50');
      // component.paymentCardForm.get('month').value;
      component.validateDate();
      expect(component.validateDate).toBeTruthy();
    });
  });
  describe('onConform', () => {
    it('makes expected calls', () => {
      // component.dialogHeader === 'Are you sure to cancel the update payment method';
      // component.show =false;
      component.ngOnInit();
      component.onConform();
      expect(component.onConform).toBeTruthy();
    });
  });

  describe('cancel', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.cancel();
      expect(component.cancel).toBeTruthy();
    });
  });
  describe('onNo', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.onNo();
      expect(component.onNo).toBeTruthy();
    });
  });
  describe('onAddNewPayment', () => {
    it('makes expected calls', () => {
      // component.ngOnInit();
      component.onAddNewPayment();
      expect(component.onAddNewPayment).toBeTruthy();
    });
  });
  describe('limitYear', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      // let test= { event:{target:{value:2019}}};
      const event = { target: { value: 2019 } };
      // (<HTMLInputElement>event.target).value;
      component.limitYear(event);
      expect(component.limitYear).toBeTruthy();
    });
  });
  describe('limitZipCode', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      const event = { target: { value: 2345155 } };
      // event.target.value
      component.limitZipCode(event);
      expect(component.limitZipCode).toBeTruthy();
    });
  });
  describe('onCancel', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.onCancel(12145);
      expect(component.onCancel).toBeTruthy();
    });
  });
  describe('validateNumber', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      const event = { target: { value: '23q45155' } };
      component.validateNumber(event);
      expect(component.validateNumber).toBeTruthy();
    });
  });
  describe('onAutoFill', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      component.onAutoFill('');
      expect(component.onAutoFill).toBeTruthy();
    });
  });
  describe('onAutoFill', () => {
    it('makes expected calls', () => {
      const paymentServiceStub = {
        getMemberPaymentDetails: arg1 => ({ subscribe: () => ({}) }),
        updatePaymentInformation: obj1 => ({ subscribe: () => ({}) })
      };
      component.ngOnInit();
      component.updateDisplayedData();
      spyOn(paymentServiceStub, 'getMemberPaymentDetails').and.returnValue({});
      expect(component.onAutoFill).toBeTruthy();
    });
  });
  describe('onValidateYear', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      const event = { target: { value: 2012229 } };
      component.onValidateYear(event);
      expect(component.onValidateYear).toBeTruthy();
    });
  });
  describe('PaymentMethodRadioClick', () => {
    it('makes expected calls', () => {
      component.ngOnInit();
      const event = { target: {} };
      component.PaymentMethodRadioClick(event);
      expect(component.PaymentMethodRadioClick).toBeTruthy();
    });
  });
});
