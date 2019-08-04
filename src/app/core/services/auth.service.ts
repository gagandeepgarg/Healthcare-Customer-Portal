import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from './local-storage.service';
import { environment } from '../../../environments/environment';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthRouteService {
  public redirectUrl: string;
  private server: string;
  public token: string;
  options: any;
  clientId: string;
  clientSecret: string;
  constructor(
    private _http: HttpClient,
    protected localStorageService: LocalStoreService
  ) {
    this.server = environment.authUrl;
    this.clientId = environment.client_id;
    this.clientSecret = environment.clientSecret;
  }

// Check logged in user
  isUserLoggedIn() {
    const user = this.localStorageService.getData('loggedInUser');
    if (user) {
      return true;
    }
  }
   // @param userLoginDetails
  userLogin(userLoginDetails: any) {
    return this._http.post(this.server + 'Auth', userLoginDetails);
  }

  /**
   * Reset member password
   // @param username @param newPassword
   */
  Resetpassword(username: string, newPassword: string, guid: string) {
    return this._http.get(
      this.server +
      'Auth/resetpassword?username=' +
      username +
      '&newPassword=' +
      newPassword
    );
  }

    // @param username
  CheckUsername(username: string) {
    return this._http.get(
      this.server + 'Auth/isusernameexists?username=' + username
    );
  }
  // check paswword reset link validity
  /* ValidateResetPasswordLink(userId, guid) {
    return this._http.get(
      this.server +
      // 'Auth/isvalidateresetpasswordlink?userId=' +
      'Auth/Token?userId=' +
      userId +
      '&resetPasswordAccessCode=' +
      guid
    );
  } */

  ValidateResetPasswordLink(obj: any) {
    return this._http.post(
      this.server +
      'Auth/token', obj
    );
  }

  // delete user with userId
  DeleteUser(userid: number) {
    return this._http.post(
      this.server + 'Auth/DeleteUser?userId=' + userid, {}
    );
  }
  // register user with member details
  RegisterUser(userObj) {
    return this._http.post(this.server + 'auth/registration', userObj);
  }
  // Pasword expiration check for dashboard popup
  checkUserPasswordExpire(userId: string) {
    return this._http.get(
      this.server + 'Auth/resetPasswordBanner?userId=' + userId
    );
  }


  changepassword(userForm: any) {
    return this._http.post(this.server + 'Auth/changepassword', userForm);
  }

  // User logout
  logoutUser(accesstoken: any, userId: any) {
    return this._http.get(this.server + 'Auth/signoutasync?accessToken=' + accesstoken + '&userId=' + userId);
  }
  updateToken() {
    return this._http.get(this.server + 'Auth/refreshtoken?refreshToken=' + this.localStorageService.getData('refreshToken') +
      '&clientId=' + this.clientId + '&clientSecretKey=' + this.clientSecret);
  }
}
