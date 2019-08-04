import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { RoutesConstants } from '@core/constants/route-constants';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';
import * as constants from '@core/constants/app-constants';

@Injectable({
  providedIn: 'root'
})
export class CoreDataService {
  private server: string;
  httpOptions: any;
  options: any;
  timerUpperText = '';
  timerBelowText = '';
  timerStarLeftIconName = '';
  timerStartRightIconName = '';
  timerBodyText = '';
  firstName = '';
  lastLogin = '';
  notifictaionUnreadMsgs = 0;
  constructor(private _http: HttpClient, private router: Router) {
    this.server = environment.apiUrl;
  }
  // check route parameters
  checkIfRouteLoginOrRegistration() {
    const curentUrl: any = this.router.url;
    if (curentUrl.includes(RoutesConstants.Login) || curentUrl.includes(RoutesConstants.PageNotFound)
      || curentUrl.includes(RoutesConstants.PasswordReset) || curentUrl.includes(RoutesConstants.ForgetPassword) ||
      curentUrl.includes(RoutesConstants.Registration) || curentUrl.includes(RoutesConstants.successtimer) || curentUrl === '/') {
      return false;
    } else {
      return true;
    }
  }
  checkIfRouteLogin() {
    const curentUrl: any = this.router.url;
    if (curentUrl.includes(RoutesConstants.Login) || curentUrl.includes(RoutesConstants.PageNotFound)
      || curentUrl.includes(RoutesConstants.PasswordReset) || curentUrl.includes(RoutesConstants.ForgetPassword) ||
      curentUrl === '/') {
      return false;
    } else {
      return true;
    }
  }
  setTimerPageValues(timerStarLeftIconName, timerUpperText, timerStartRightIconName, timerBelowText, timerBodyText) {
    this.timerStarLeftIconName = timerStarLeftIconName;
    this.timerUpperText = timerUpperText;
    this.timerStartRightIconName = timerStartRightIconName;
    this.timerBelowText = timerBelowText;
    this.timerBodyText = timerBodyText;
  }
  // fetch provider search link from API
  GetProviderLink(userId, planType) {
    return this._http.get(this.server + constants.ApiEndPoints.FetchProviderSearchURL + userId
      + '&&planType=' + planType);
  }
  GetCoveredPlans(userId) {
    return this._http.get(this.server + constants.ApiEndPoints.GetMemberPlanTypes + userId);
  }
  GetSecurityQuestions() {
    return this._http.get(this.server + constants.ApiEndPoints.GetSecurityQuestions);
  }
  IsGroupMember(userId) {
    return this._http.get(this.server + constants.ApiEndPoints.IsGroupMember + userId);
  }
}
