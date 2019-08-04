import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DocumentFormsService } from '../../services/document-forms.service';
import * as FileSaver from 'file-saver';
import * as constants from '@core/constants/app-constants';
@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.scss']
})
export class ListDocumentsComponent implements OnInit, OnChanges {
  @Input() selectedCategory;
  @ViewChild('searchedDocuments') dataTable: any;
  fileTypes = constants.FileTypes;
  iconColor = constants.IconColor;
  searchedFilesData: any = [];
  filesPerPage = 50;
  pageNumber: any;
  totalFilesCount: any;
  sortField = 'lastupdatedon';
  sortOrder = 'asc';
  documentSortOrder = 'any';
  categorySortOrder = 'asc';
  lastUpdatedSortOrder = 'any';
  windiowInnerWidth: any = '';
  showResult = false;
  showNoresult = false;
  defaultPaginator = false;
  constructor(private documentFormsService: DocumentFormsService) { }

  ngOnInit() {
    // load files if category exist on initilaization
    if (this.selectedCategory) {
      const categories = [this.selectedCategory];
      this.LoadFilesData('', 0, 0, 'category', '', categories, true);
    } else {
      this.defaultPaginator = false;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const change = changes['selectedCategory'];
    // reload files from db if category changed from side menu
    if (change && JSON.stringify(change.currentValue) !== JSON.stringify(change.previousValue)) {
      const categories = [this.selectedCategory];
      this.LoadFilesData('', 0, 0, 'category', '', categories, true);
    }
  }
  LoadFilesData(searchText, recordPerPage, pageNumber, sortBy, SortOrder, categories, updateFileCount) {
    // load files based on selected category
    this.documentFormsService.GetDocumentFormsBasedOnCategory(searchText, recordPerPage, pageNumber, sortBy, SortOrder, categories)
      .subscribe(
        result => this.OnSuccessfullLoadDocuments(result, updateFileCount),
        err => this.OnDocumentLoadFailure(err)
      );
  }
  OnSuccessfullLoadDocuments(result, updateFileCount) {
    // Load document based of category
    this.searchedFilesData = result;
    if (updateFileCount) {
      this.totalFilesCount = this.searchedFilesData.length;
    }
    if (!this.searchedFilesData || this.searchedFilesData.length === 0) {
      this.showResult = false;
      this.showNoresult = true;
      this.defaultPaginator = false;
    } else {
      this.showResult = true;
      this.defaultPaginator = true;
      this.showNoresult = false;
    }
  }
  OnDocumentLoadFailure(err) {
    // API failure
    console.log('failed to load DocumentForms data' + err);
  }

  getPaginatedDocuments(event) {
    if (event.first !== undefined) {
      this.pageNumber = event.first;
      this.filesPerPage = event.rows;
    }
    let pageNumber = 1;
    if (this.pageNumber > 0) {
      pageNumber = (this.pageNumber + this.filesPerPage) / this.filesPerPage;
    }
    this.LoadFilesData('', this.filesPerPage, pageNumber, this.sortField, this.sortOrder, [this.selectedCategory], false);
  }
  onViewAllClick() {
    this.dataTable.first = 0;
    this.LoadFilesData('', 0, 0, this.sortField, this.sortOrder, [this.selectedCategory], true);
    setTimeout(() => {
      this.dataTable.rows = 500;
    }, 100);
  }

  sortData(sortBy: any) {
    if (sortBy === 'filename') {
      this.sortOrder = this.documentSortOrder === 'asc' ? 'desc' : 'asc';
      this.documentSortOrder = this.sortOrder;
      this.categorySortOrder = 'any';
      this.lastUpdatedSortOrder = 'any';
    } else if (sortBy === 'category') {
      this.sortOrder = this.categorySortOrder === 'asc' ? 'desc' : 'asc';
      this.categorySortOrder = this.sortOrder;
      this.documentSortOrder = 'any';
      this.lastUpdatedSortOrder = 'any';
    } else if (sortBy === 'lastupdatedon') {
      this.sortOrder = this.lastUpdatedSortOrder === 'asc' ? 'desc' : 'asc';
      this.lastUpdatedSortOrder = this.sortOrder;
      this.categorySortOrder = 'any';
      this.documentSortOrder = 'any';
    }
    this.sortField = sortBy;
    this.LoadFilesData('',
      this.pageNumber,
      this.filesPerPage,
      this.sortField,
      this.sortOrder,
      [this.selectedCategory], false
    );
  }
  // downloading file
  GetFileContentToDownload(documentId: any, documentType: any, documentname) {
    this.documentFormsService
      .getDocumentToDownload(documentId)
      .subscribe((res: any) => {
        this.DownloadFileAttachment(res, documentType, documentname);
      });
  }
  // saving file or showing in new tab
  DownloadFileAttachment(fileData: any, documentType: any, documentname: any) {
    if (documentType === 'PDF') {
      const fileURL = URL.createObjectURL(
        new Blob([fileData], { type: 'application/pdf' })
      );
      window.open(fileURL, '_blank');
    } else {
      FileSaver.saveAs(fileData, documentname + '.' + documentType);
    }
  }
}

