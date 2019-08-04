import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthRouteService } from '@core/services/auth.service';
import * as constants from '@core/constants/app-constants';

@Injectable()
export class PlansService {
  private server: string;
  private dmsServer: string;

  constructor(private _http: HttpClient, private authService: AuthRouteService) {
    this.server = environment.apiUrl;
    this.dmsServer = environment.dmsUrl;
  }
  GetUserPlanDetailsFile(guideBookId) {
    return this._http.get(
      this.dmsServer + guideBookId,
      { responseType: 'blob' }
    );
  }
  GetPlanDetailsBasedOnUserId(userId) {
    return this._http.get(this.server + constants.ApiEndPoints.GetMemberGuideBook + userId);
  }
}
