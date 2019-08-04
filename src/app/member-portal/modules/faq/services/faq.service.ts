import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';
@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private server: string;
  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
  }
  GetAllFAQCategories() {
    return this._http.get(
      this.server + constants.ApiEndPoints.FAQCategoryList);
  }
  GetFAQBasedOnCategory(category) {
    return this._http.get(
      this.server + constants.ApiEndPoints.FAQs + category);
  }
}
