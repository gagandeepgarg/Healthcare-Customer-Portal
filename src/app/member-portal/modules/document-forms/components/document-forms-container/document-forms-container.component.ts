import { Component, OnInit } from '@angular/core';
import { DocumentFormsService } from '@modules/document-forms/services/document-forms.service';
import * as constants from '@core/constants/app-constants';
import { UtilService } from '@app/core/services/util.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-document-forms-container',
  templateUrl: './document-forms-container.component.html',
  styleUrls: ['./document-forms-container.component.scss']
})
export class DocumentFormsContainerComponent implements OnInit {
  documentFormsCategories: any[];
  selectedCategory: any;
  searchClicked = false;
  constants = constants;
  searchText = '';
  searchedCickedCount = 0;
  iconName = constants.ICON_DOCUMENTS;
  headerHtml = ' Documents & Forms';
  FileTypes = constants.FileTypes;
  IconColor = constants.IconColor;
  constructor(
    private documentFormsService: DocumentFormsService,
    private utilService: UtilService
  ) { }
  ngOnInit() {
    this.initialLoadForDocumentsAndForms();
    this.utilService.documentAndFormClick.subscribe(status => {
      if (status) {
        this.initialLoadForDocumentsAndForms();
        this.searchClicked = false;
        this.searchedCickedCount = 0;
        this.searchText = '';
      }
    });
  }
  initialLoadForDocumentsAndForms() {
    // Loading all categories of DocumentsAndForms
    this.documentFormsService.GetAllDocumentFormsCategories().subscribe(res => {
      const categoryData: any = res;
      if (categoryData && categoryData.length > 0) {
        this.documentFormsCategories = categoryData;
        // set first category as selected by default
        this.selectedCategory = this.documentFormsCategories[0];
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  SearchClicked(searchText) {
    this.searchedCickedCount++;
    this.searchText = searchText;
    this.searchClicked = true;
  }
  BackClicked() {
    this.searchedCickedCount = 0;
    this.searchText = '';
    this.searchClicked = false;
  }
  categoryChanged(category) {
    this.selectedCategory = category;
  }
}
