import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
import { BehaviorSubject, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DependentsCoverageService {

  addDependentPopUpNotifier = new BehaviorSubject<any>(false);
  private server: string;
  private verify_address_server: any;
  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
    this.verify_address_server = environment.verifyAddressUrl;
  }

  addDependentWindowStatus(status: any) {
    this.addDependentPopUpNotifier.next(status);
  }


  getStates() {
    return this._http.get(this.server + constants.ApiEndPoints.States);
  }

  getDemographicsInformation(userId: any) {
    return this._http.get(this.server + constants.ApiEndPoints.Demographics + userId);
  }

  updateSubscriberInformation(subsInfo: any) {
    return this._http.post(this.server + constants.ApiEndPoints.UpdateSubscriberInformation, subsInfo);
  }

  deleteDependent(id: any) {
    let body: HttpParams = new HttpParams();
    body = body.append('dependentDetailId', id);
    return this._http.post(this.server + constants.ApiEndPoints.DeleteDependent + id, {});
  }

  addDependent(obj: any) {
    return this._http.post(this.server + constants.ApiEndPoints.AddDependent, obj);
  }

  getQuestionire() {
    return this._http.get(this.server + constants.ApiEndPoints.Questionire);
  }

  verifyAddress(row) {
    const headers = new HttpHeaders().set(InterceptorSkipHeader, '');
    const userId = '470ALIER2690';
    const request = '<AddressValidateRequest USERID="' +
      userId +
      '"><Address><Address1>' +
      row.address1 +
      '</Address1><Address2>' +
      row.address2 +
      '</Address2><City>' +
      row.city +
      '</City><State>' +
      row.stateProvince.value.StateCode +
      '</State><Zip5>' +
      row.zipCode +
      '</Zip5><Zip4></Zip4></Address></AddressValidateRequest>';
    return this._http.get(
      this.verify_address_server +
      request,
      {
        headers,
        responseType: 'text'
      }
    );
  }

}
