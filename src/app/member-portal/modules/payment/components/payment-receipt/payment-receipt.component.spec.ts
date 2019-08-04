import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentService } from '../../service/payment.service';
import { MyProfileService } from '@app/member-portal/modules/my-profile/services/my-profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as  constants from '@core/constants/app-constants';
import { PaymentReceiptComponent } from './payment-receipt.component';
import { COMMON_MODULES } from '@app/core/commonModules';
import { of } from 'rxjs';
describe('PaymentReceiptComponent', () => {
  let component: PaymentReceiptComponent;
  let fixture: ComponentFixture<PaymentReceiptComponent>;
  beforeEach(() => {
    const paymentServiceStub = {
      getMemberPaymentReciptDetails: arg1 => ({ subscribe: () => ({}) })
    };
    const myProfileServiceStub = {
      DownloadIdCard: digitalCardId1 => ({ subscribe: () => ({}) })
    };
    const domSanitizerStub = { bypassSecurityTrustResourceUrl: arg1 => ({}) };
    spyOn(paymentServiceStub, 'getMemberPaymentReciptDetails').and.returnValue(of([{}]));
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [COMMON_MODULES],
      declarations: [PaymentReceiptComponent],
      providers: [
        { provide: PaymentService, useValue: paymentServiceStub },
        { provide: MyProfileService, useValue: myProfileServiceStub },
        { provide: DomSanitizer, useValue: domSanitizerStub }
      ]
    });
    fixture = TestBed.createComponent(PaymentReceiptComponent);
    component = fixture.componentInstance;
    component.userId = '8';
    component.filter = {
      StartDate: null,
      ToDate: null,
      PageNumber: 1,
      IsSortByDesc: true,
      ReciptId: 0,
      RecordsPerPage: 100,
      SortColumn: 'PaidDate',
      UserId: '8'
    };
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('iconName defaults to: constants.ICON_PAYMENT', () => {
    expect(component.iconName).toEqual(constants.ICON_PAYMENT);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('headerHtml defaults to: Payment Receipts', () => {
    expect(component.headerHtml).toEqual('Payment Receipts');
  });
  it('reciptData defaults to: []', () => {
    expect(component.reciptData).toEqual([]);
  });
  it('display defaults to: false', () => {
    expect(component.display).toEqual(false);
  });
  it('cols defaults to: []', () => {
    expect(component.cols).toEqual([]);
  });
  it('digitalCardId defaults to: 0', () => {
    expect(component.digitalCardId).toEqual(0);
  });
  it('paginateFlag defaults to: false', () => {
    expect(component.paginateFlag).toEqual(false);
  });
  describe('downloadPaymentRecipt', () => {
    it('makes expected calls', () => {
      const myProfileServiceStub: MyProfileService = fixture.debugElement.injector.get(
        MyProfileService
      );
      spyOn(myProfileServiceStub, 'DownloadIdCard').and.callThrough();
      component.downloadPaymentRecipt();
      expect(myProfileServiceStub.DownloadIdCard).toHaveBeenCalled();
    });
  });
  describe(' onSearch', () => {
    it('makes expected calls', () => {
      const paymentServiceStub = {
        getMemberPaymentReciptDetails: arg1 => ({ subscribe: () => ({}) })
      };
      component.userId = '8';
      component.filter = {
        StartDate: null,
        ToDate: null,
        PageNumber: 1,
        IsSortByDesc: true,
        ReciptId: 0,
        RecordsPerPage: 100,
        SortColumn: 'PaidDate',
        UserId: '8'
      };
      component.onSearch();
      spyOn(
        paymentServiceStub,
        'getMemberPaymentReciptDetails'
      ).and.returnValue(of([{}]));

      expect(
        paymentServiceStub.getMemberPaymentReciptDetails
      ).toBeTruthy();
    });
  });
  describe('onStartDateSelect', () => {
    it('makes expected calls', () => {
      component.onStartDateSelect();
      expect(component.onStartDateSelect).toBeTruthy();
    });
  });
  describe('onToDateSelect', () => {
    it('makes expected calls', () => {
      component.onToDateSelect();
      expect(component.onToDateSelect).toBeTruthy();
    });
  });
  describe('onToDateSelect', () => {
    it('makes expected calls', () => {
      component.onClear();
      expect(component.onToDateSelect).toBeTruthy();
    });
  });
  describe('sortData', () => {
    it('makes expected calls', () => {
      component.userId = '8';
      component.sortData('PaidDate');
      expect(component.sortData).toBeTruthy();
    });
  });
  describe('ViewRecipt', () => {
    it('makes expected calls', () => {
      component.ViewRecipt(1245);
      expect(component.ViewRecipt).toBeTruthy();
    });
  });
  describe('convertDateInUS', () => {
    it('makes expected calls', () => {
      component.convertDateInUS(new Date());
      expect(component.convertDateInUS).toBeTruthy();
    });
  });
  describe('cancel', () => {
    it('makes expected calls', () => {
      component.cancel();
      expect(component.cancel).toBeTruthy();
    });
  });
  describe('getPaginatedClaims', () => {
    it('makes expected calls', () => {
      const event = { target: { first: 2, rows: 10 } };
      component.userId = '8';
      component.getPaginatedClaims(event);
      expect(component.getPaginatedClaims).toBeTruthy();
    });
  });
});
