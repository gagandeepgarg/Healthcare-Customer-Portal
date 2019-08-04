import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthRouteService } from '@core/services/auth.service';
import * as constants from '@core/constants/app-constants';
import { ClamesFilter } from '../Modals/ClamesFilter';
import { of } from 'rxjs';

@Injectable()
export class DashboardService {
  private server: string;
  private dmsServer: string;

  private familyDeductables: any[] = [
    {
      accumulatorType: 'Deductable',
      maxValue: 70000,
      usedValue: 3000,
      percentage: 34,
      networkTier: 'In Network',
      accumulatorName: 'Individual Level Accumulators'
    },
    {
      accumulatorType: 'out-ofpocket',
      maxValue: 70000,
      usedValue: 3000,
      percentage: 64,
      networkTier: 'In Network',
      accumulatorName: 'Individual Level Accumulators'
    },
    {
      accumulatorType: 'out-ofpocket',
      maxValue: 70000,
      usedValue: 3000,
      percentage: 25,
      networkTier: 'Out Network',
      accumulatorName: 'Individual Level Accumulators'
    },
    {
      accumulatorType: 'out-ofpocket',
      maxValue: 70000,
      usedValue: 3000,
      percentage: 74,
      networkTier: 'In Network',
      accumulatorName: 'Individual Level Accumulators'
    }
  ];

  constructor(private _http: HttpClient, private authService: AuthRouteService) {
    this.server = environment.apiUrl;
    this.dmsServer = environment.dmsUrl;



  }
  checkUserPasswordExpire(userId: string) {
    return this.authService.checkUserPasswordExpire(userId);
  }
  getStates() {
    return this._http.get(this.server + constants.ApiEndPoints.States);
  }

  sendResetPasswordConformation(userId: any,date:any) {
    return this._http.get(
      this.server + constants.ApiEndPoints.SendPasswordConfirmationEmail + userId + '&PasswordResetDateTime=' + date
    );
  }

  getClaimDetails(clamesFilter: ClamesFilter) {
    return this._http.post(this.server + constants.ApiEndPoints.ClaimsDetails, clamesFilter);
  }
  getUserDependentClaimData(userId: string) {
    return this._http.get(this.server + constants.ApiEndPoints.ClaimDependancies + userId);
  }
  getMemberDetailsForDashBoard(userId: string) {
    return this._http.get(this.server + constants.ApiEndPoints.MemberDashboardDetails + userId);
  }
  downloadEOBpdf(eobIdentifier) {
    return this._http.get(this.dmsServer + eobIdentifier, { responseType: 'blob' });
  }

  GetUserSecurityQuestions(userId) {
    return this._http.get(this.server + constants.ApiEndPoints.GetSecurityQuestionsByUserId + userId);
  }
  UpdateSecurityQuestions(obj) {
    return this._http.post(this.server + constants.ApiEndPoints.UpdateSecurityQuestionsByUserId, obj);
  }

  getFamilyDeductables(userId) {
    return this._http.post(this.server + constants.ApiEndPoints.FamilyAccumulators + userId, {});
  }

  getIndividualDeductables(userId, dependentDetailId) {
    return this._http.post(this.server + constants.ApiEndPoints.IndividualAccumulators + userId + '&dependentDetailId=' + dependentDetailId, {});
  }
}
