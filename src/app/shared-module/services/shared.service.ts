import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthRouteService } from '@core/services/auth.service';
import * as constants from '@core/constants/app-constants';
import { UploadDocument } from '../models/UploadDocument';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { of } from 'rxjs';

@Injectable()
export class SharedService {
  private server: string;
  private serverdms: string;

  constructor(private _http: HttpClient, private authService: AuthRouteService,
    private localStorage: LocalStoreService) {
    this.server = environment.apiUrl;
    this.serverdms = environment.dmsUrl;
  }

  getMemberDetailsForDashBoard(userId: string) {
    return this._http.get(this.server + constants.ApiEndPoints.MemberDashboardDetails + userId);
  }

  getMemberProfilePicture(documenttID: string) {
    if (documenttID) {
      const cachedImage = this.localStorage.getData('image_' + documenttID);
      if (cachedImage) {
        return of(cachedImage);
      } else {
        return this._http.get(this.serverdms + constants.ApiEndPoints.ProfilePictue + documenttID.toString());
      }
    }
  }
  // uploadUserPictureForDMS(uploadData: UploadDocument[]) {
  //   return this._http.post(this.serverdms + constants.ApiEndPoints.UploadDocumentToDms, uploadData);
  // }
  // uploadUserPictureForMP(uploadData: any) {
  //   return this._http.post(this.server + constants.ApiEndPoints.UploadDocumentToMP, uploadData);
  // }

}
