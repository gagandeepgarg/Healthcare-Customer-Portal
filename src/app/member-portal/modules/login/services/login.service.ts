import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private server: string;
  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
  }
  GetUserSecurityQuestions(username) {
    return this._http.get(this.server + constants.ApiEndPoints.GetUserSecurityQuestions + username);
  }

  // sendResetPasswordConformation(userId: any, date: any) {
  sendResetPasswordConformation(username: any, date: any) {
    return this._http.get(
      this.server + constants.ApiEndPoints.SendPasswordConfirmationEmail + username
      + '&PasswordResetDateTime=' + date
    );
  }
  IsvalidUserSecurityAnswers(answers: any) {
    return this._http.post(
      this.server + constants.ApiEndPoints.IsValidUserSecurityQAs,
      answers
    );
  }

  sendAccountLockedMail(userName: any) {
    return this._http.get(
      this.server + constants.ApiEndPoints.SendMemberAccountLockEmail + userName
    );
  }

}
