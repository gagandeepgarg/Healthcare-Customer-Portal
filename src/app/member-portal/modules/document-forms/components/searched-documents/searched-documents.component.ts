import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentFormsService } from '@modules/document-forms/services/document-forms.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import * as FileSaver from 'file-saver';
import { SelectItem } from 'primeng/api';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-searched-documents',
  templateUrl: './searched-documents.component.html',
  styleUrls: ['./searched-documents.component.scss']
})
export class SearchedDocumentsComponent implements OnInit, OnChanges {
  dropdownCategories: SelectItem[] = [];
  selectedCategories: any = [];
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
  defaultPaginator = true;
  windiowInnerWidth: any = '';
  showResult = false;
  showNoresult = false;

  initialSearch = false;
  constructor(
    private documentFormsService: DocumentFormsService
  ) { }
  @Input() categories;
  @Input() searchedText = '';
  @Input() searchedCickedCount = 0;
  @ViewChild('searchedDocuments') dataTable: any;
  ngOnInit() {
    this.LoadCategories();
    this.SearchClicked();
  }
  LoadCategories() {
    this.dropdownCategories = [];
    if (this.categories && this.categories.length > 0) {
      this.categories.forEach(cat => {
        this.dropdownCategories.push({ label: cat, value: cat });
      });
      this.dropdownCategories.map((item) => this.selectedCategories.push(item.value));
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const change = changes['searchedText'];
    const searchedCickedCount = changes['searchedCickedCount'];
    const categorychanges = changes['categories'];
    // reload categories if category updated
    if (categorychanges && JSON.stringify(categorychanges.currentValue) !== JSON.stringify(categorychanges.previousValue)) {
      this.LoadCategories();
    }
    // reload files from db if searchedText is changed from searched header component
    if ((change && JSON.stringify(change.currentValue) !== JSON.stringify(change.previousValue)) ||
      (searchedCickedCount && JSON.stringify(searchedCickedCount.currentValue) !== JSON.stringify(searchedCickedCount.previousValue))) {
      // make all category selected on search text changes
      this.selectedCategories = [];
      this.dropdownCategories.map((item) => this.selectedCategories.push(item.value));
      this.SearchClicked();
    }
  }

  // show search result grid and load data for all categories
  SearchClicked() {
    this.initialSearch = true;
    this.documentSortOrder = 'any';
    this.lastUpdatedSortOrder = 'any';
    this.categorySortOrder = 'asc';
    this.sortField = 'category';
    this.sortOrder = 'asc';
    this.documentFormsService
      .SearchForFile(
        this.searchedText,
        0,
        1,
        'category',
        this.categorySortOrder,
        this.selectedCategories
      )
      .subscribe((res) => {
        const fileData: any = res;
        this.totalFilesCount = fileData.length;
        this.initFilesData(res);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
          }
        });
  }

  onCategoryCheckChanged(event) {
    this.selectedCategories = event;
    let sortby = '';
    let sortorder = '';
    if (this.categorySortOrder !== 'any') {
      sortby = 'category';
      sortorder = this.categorySortOrder;
    } else if (this.lastUpdatedSortOrder !== 'any') {
      sortby = 'category';
      sortorder = this.lastUpdatedSortOrder;
    } else if (this.documentSortOrder !== 'any') {
      sortby = 'category';
      sortorder = this.documentSortOrder;
    }
    this.documentFormsService
      .SearchForFile(
        this.searchedText,
        0,
        0,
        sortby,
        sortorder,
        this.selectedCategories
      )
      .subscribe(res => {
        const data: any = res;
        this.totalFilesCount = data.length;
        this.dataTable.first = 0;
        this.initFilesData(data);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
          }
        });
  }



  // search result  grid funcctions
  private initFilesData(filesData: any) {
    this.searchedFilesData = filesData;
    if (this.searchedFilesData && this.searchedFilesData.length === 0) {
      this.showResult = false;
      this.showNoresult = true;
      this.defaultPaginator = false;
    } else {
      this.showResult = true;
      this.defaultPaginator = true;
      this.showNoresult = false;
    }
  }
  getPaginatedMessages(event: LazyLoadEvent) {
    if (event.first !== undefined) {
      this.pageNumber = event.first;
      this.filesPerPage = event.rows;
    }
    let pageNumber = 1;
    if (this.pageNumber > 0) {
      pageNumber = (this.pageNumber + this.filesPerPage) / this.filesPerPage;
    }
    this.GetFiles(
      pageNumber,
      this.filesPerPage,
      this.sortField,
      this.sortOrder
    );
  }

  GetFiles(pageNumber, filesPerPage, sortBy, sortOrder) {
    this.documentFormsService
      .SearchForFile(
        this.searchedText,
        filesPerPage,
        pageNumber,
        sortBy,
        sortOrder,
        this.selectedCategories
      )
      .subscribe(
        (response: any) => {
          if (!response) {
            return;
          }
          this.initFilesData(response);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
            this.showResult = false;
            this.showNoresult = true;
          }
        });
  }

  onViewAllClick() {
    this.dataTable.first = 0;
    this.GetFiles(0, 0, this.sortField, this.sortOrder);
    this.documentFormsService
      .SearchForFile(
        this.searchedText,
        0, 0, this.sortField, this.sortOrder,
        this.selectedCategories
      )
      .subscribe(
        (response: any) => {
          if (!response) {
            return;
          }
          this.initFilesData(response);
          const count = response.length;
          this.totalFilesCount = count;
          this.dataTable.rows = 500;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
            this.showResult = false;
            this.showNoresult = true;
          }
        });
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
    this.GetFiles(
      this.pageNumber,
      this.filesPerPage,
      this.sortField,
      this.sortOrder
    );
  }

  // downloading file
  GetFileContentToDownload(documentId: any, documentType: any, documentname) {
    this.documentFormsService
      .getDocumentToDownload(documentId)
      .subscribe((res: any) => {
        this.downloadFileAttachment(res, documentType, documentname);
      });
  }

  // saving file or showing in new tab
  downloadFileAttachment(fileData: any, documentType: any, documentname: any) {
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
