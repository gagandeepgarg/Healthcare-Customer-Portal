import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthRouteService } from '@core/services/auth.service';
import * as constants from '@core/constants/app-constants';
import { ContactUs } from '../modals/contactUs';

@Injectable()
export class ContactService {
  private server: string;

  constructor(private _http: HttpClient, private authService: AuthRouteService) {
    this.server = environment.apiUrl;
  }
  saveUserFeeback(contactUs: ContactUs) {
    return this._http.post(this.server + constants.ApiEndPoints.ContactUsStory, contactUs);
  }
}
