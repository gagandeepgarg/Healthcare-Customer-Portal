import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';
@Injectable()
export class DocumentFormsService {
  private server: string;
  private dmsServer: string;
  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
    this.dmsServer = environment.dmsUrl;
  }

  // main container data
  GetAllDocumentFormsCategories() {
    return this._http.get(
      this.server + constants.ApiEndPoints.DocumentAndFormSectionList);
  }
  GetDocumentFormsBasedOnCategory(searchText, recordsPerPage, pageNumber, sortBy, sortOrder, listOfCategories) {
    return this.SearchForFile(searchText, recordsPerPage, pageNumber, sortBy, sortOrder, listOfCategories);
  }
  SearchForFile(
    searchedText: string,
    filesPerPage,
    pageNumber,
    sortBy,
    sortOrder,
    selectedCategories
  ) {
    if (!searchedText || searchedText.trim() === '') {
      searchedText = '';
    }
    const obj = {
      searchText: searchedText.trim(),
      recordsPerPage: filesPerPage,
      pageNumber: pageNumber,
      sortColumn: sortBy,
      isSortByDesc: sortOrder === 'desc' ? true : false,
      categories: selectedCategories ? selectedCategories : []
    };
    return this._http.post(
      this.server + constants.ApiEndPoints.GetDocumentAndFormSearch, obj
    );
  }
  getDocumentToDownload(documentId: any) {
    return this._http.get(this.dmsServer + documentId, { responseType: 'blob' });
  }
}
