import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private server: string;
  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
  }

  VerifyMember(memDatails) {
    return this._http.post(
      this.server + constants.ApiEndPoints.MemberVerification,
      memDatails
    );
  }

  VerifyOTP(externalId: any, oTPNumber: number) {
    return this._http.post(this.server + constants.ApiEndPoints.IsValidOTP + '?externalId=' + externalId + '&otp=' + oTPNumber, {});
  }

  GetSecurityQuestions() {
    return this._http.get(this.server + constants.ApiEndPoints.GetSecurityQuestions);
  }
  RegisterMember(memberObj) {
    return this._http.post(
      this.server + constants.ApiEndPoints.MemberRegistration,
      memberObj
    );
  }

  SendOTP(otpObj: any) {
    return this._http.post(this.server + constants.ApiEndPoints.SendOTP, otpObj);
  }
}
