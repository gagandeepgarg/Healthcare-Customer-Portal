import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';


@Injectable()
export class PaymentService {
  private server: string;
  constants = constants;

  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
  }
  getMemberPaymentDetails(userID: string) {
    return this._http.get(this.server + constants.ApiEndPoints.ChangePayment + userID);
  }
  getMemberPaymentReciptDetails(userDetais) {
    return this._http.post(this.server + constants.ApiEndPoints.PaymentReceipt, userDetais);
  }

  updatePaymentInformation(paymentDetails) {
    return this._http.post(this.server + constants.ApiEndPoints.UpdatePaymentInformation, paymentDetails);
  }
}
