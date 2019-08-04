import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import * as  constants  from '@core/constants/app-constants';
import { PaymentService } from './payment.service';
describe('PaymentService', () => {
  let service: PaymentService;
  beforeEach(() => {
    const httpClientStub = {
      get: arg1 => ({}),
      post: (arg1, userDetais2) => ({})
    };
    TestBed.configureTestingModule({
      providers: [
        PaymentService,
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    service = TestBed.get(PaymentService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(service.constants).toEqual(constants);
  });
});
