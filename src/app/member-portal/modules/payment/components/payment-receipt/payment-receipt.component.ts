import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as constants from '@core/constants/app-constants';
import { PaymentService } from '../../service/payment.service';
import { MyProfileService } from '@app/member-portal/modules/my-profile/services/my-profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReciptFilter } from '../../Modals/reciptFilter';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {
  iconName = constants.ICON_PAYMENT;
  constants = constants;
  headerHtml = 'Payment Receipts';
  reciptData = [];
  display = false;
  cols = [];
  sortOrder = 'desc';
  sortField: any = 'PaidDate';
  maxStartDate: Date;
  maxToDate: Date;
  minStartDate: Date;
  minToDate: Date;
  startDate: Date;
  DateTo: Date;
  userId: string;
  digitalCardId: any = 0;
  idCardURL: any;
  paginateFlag = false;
  filter: ReciptFilter;
  pageNumber = 1;
  errorMessage = '';
  currentDate: Date;
  filesPerPage = 10;
  totalRecordsCount = 0;
  initialLoad = false;
  @ViewChild('receiptsTable') receiptsTable: any;
  constructor(private paymentService: PaymentService, private myProfileService: MyProfileService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.filter = {
      StartDate: null,
      ToDate: null,
      PageNumber: 1,
      IsSortByDesc: true,
      ReciptId: 0,
      RecordsPerPage: this.filesPerPage,
      SortColumn: this.sortField,
      UserId: this.userId.toString()
    };
    this.initialLoad = true;
    this.paymentService.getMemberPaymentReciptDetails(this.filter).subscribe((res: []) => {
      if (res) {
        this.reciptData = res;
        if (!this.reciptData || this.reciptData.length < 1) {
          this.errorMessage = constants.PAYMENT_RECIPT_NOTfOUND;
        } else {
          this.totalRecordsCount = this.reciptData[0].TotalRecordsCount;
          if (this.totalRecordsCount > 10) {
            this.paginateFlag = true;
          }
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });

    this.currentDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate());
    this.maxStartDate = this.currentDate;
    this.maxToDate = this.currentDate;
    this.cols = [
      { field: 'TransactionId', header: 'Transaction ID', width: '18%' },
      { field: 'PaidDate', header: 'Payment Date', width: '17%', sortIdentifier: 'PaidDate' },
      { field: 'Amount', header: 'Amount', width: '15%', sortIdentifier: 'Amount' },
      { field: 'PaymentMethod', header: 'Payment Method', width: '20%', sortIdentifier: 'Payment Method' },
      { field: '', header: 'Receipts', width: '20%' }
    ];
  }
  onStartDateSelect() {
    this.minToDate = this.startDate;
    this.maxToDate = this.currentDate;
  }
  onToDateSelect() {
    this.minStartDate = undefined;
    this.maxStartDate = this.DateTo;
  }
  sortData(sortBy: any) {
    if (sortBy !== undefined) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      this.sortField = sortBy;
      this.filter = {
        StartDate: this.startDate ? this.convertDateInUS(this.startDate) : null,
        ToDate: this.DateTo ? this.convertDateInUS(this.DateTo) : null,
        PageNumber: 1,
        IsSortByDesc: this.sortOrder === 'desc' ? true : false,
        ReciptId: 0,
        RecordsPerPage: this.filesPerPage,
        SortColumn: this.sortField,
        UserId: this.userId.toString()
      };
      this.paymentService.getMemberPaymentReciptDetails(this.filter).subscribe((res: []) => {
        if (res) {
          this.reciptData = res;
          if (!this.reciptData || this.reciptData.length < 1) {
            this.errorMessage = constants.PAYMENT_RECIPT_NOTfOUND;
            this.paginateFlag = false;
          }
          this.receiptsTable.first = 1;
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
          }
        });
    }
  }

  ViewRecipt(digitalCardId) {
    this.digitalCardId = digitalCardId ? +digitalCardId : 0;
    this.myProfileService.DownloadIdCard(digitalCardId).subscribe(file => {
      this.idCardURL = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file));
      this.display = true;
    });
    this.display = true;
  }
  downloadPaymentRecipt() {
    this.display = false;
    this.myProfileService.DownloadIdCard(this.digitalCardId).subscribe(file => {
      FileSaver.saveAs(file, 'Payment Recipt' + '.pdf');
      this.digitalCardId = 0;
    });
  }
  onSearch() {
    this.filter = {
      StartDate: this.startDate ? this.convertDateInUS(this.startDate) : null,
      ToDate: this.DateTo ? this.convertDateInUS(this.DateTo) : null,
      PageNumber: 1,
      IsSortByDesc: this.sortOrder === 'desc' ? true : false,
      ReciptId: 0,
      RecordsPerPage: this.filesPerPage,
      SortColumn: 'Paid Date',
      UserId: this.userId.toString()
    };
    this.paymentService.getMemberPaymentReciptDetails(this.filter).subscribe((res: []) => {
      if (res) {
        this.reciptData = res;
        if (!this.reciptData || this.reciptData.length < 1) {
          this.errorMessage = constants.PAYMENT_RECIPT_NOTfOUND;
          this.paginateFlag = false;
        } else {
          this.totalRecordsCount = this.reciptData[0].TotalRecordsCount;
          if (this.totalRecordsCount > 10) {
            this.paginateFlag = true;
            this.receiptsTable.first = 1;
          }
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
  convertDateInUS(date) {
    date = date.toLocaleDateString('en-US');
    const d = new Date(date),
      mnth = ('0' + (d.getMonth() + 1)).slice(-2),
      day = ('0' + d.getDate()).slice(-2);
    return [d.getFullYear(), mnth, day].join('/');
  }
  cancel() {
    this.display = false;
    this.digitalCardId = 0;
    this.idCardURL = null;
  }
  onClear() {
    this.DateTo = undefined;
    this.startDate = undefined;
    this.minToDate = undefined;
    this.minStartDate = undefined;
    this.maxToDate = this.currentDate;
    this.maxStartDate = this.currentDate;
    this.filter = {
      StartDate: null,
      ToDate: null,
      PageNumber: 1,
      IsSortByDesc: this.sortOrder === 'desc' ? true : false,
      ReciptId: 0,
      RecordsPerPage: this.filesPerPage,
      SortColumn: this.sortField,
      UserId: this.userId.toString()
    };
    this.paymentService.getMemberPaymentReciptDetails(this.filter).subscribe((res: []) => {
      if (res) {
        this.reciptData = res;
        if (!this.reciptData || this.reciptData.length < 1) {
          this.errorMessage = constants.PAYMENT_RECIPT_NOTfOUND;
          this.paginateFlag = false;
        } else {
          this.totalRecordsCount = this.reciptData[0].TotalRecordsCount;
          if (this.totalRecordsCount > 10) {
            this.paginateFlag = true;
            this.receiptsTable.first = 1;
          }
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }

  getPaginatedClaims(event) {
    if (event.first !== undefined) {
      this.pageNumber = event.first;
      this.filesPerPage = event.rows;
    }
    if (this.initialLoad) {
      this.initialLoad = false;
      return;
    }
    let pageNumber = 1;
    if (this.pageNumber > 1) {
      pageNumber = (this.pageNumber + this.filesPerPage) / this.filesPerPage;
    }
    this.filter = {
      StartDate: null,
      ToDate: null,
      PageNumber: pageNumber,
      IsSortByDesc: this.sortOrder === 'desc' ? true : false,
      ReciptId: 0,
      RecordsPerPage: this.filesPerPage,
      SortColumn: this.sortField,
      UserId: this.userId.toString()
    };
    this.paymentService.getMemberPaymentReciptDetails(this.filter).subscribe((res: []) => {
      if (res) {
        this.reciptData = res;
        if (!this.reciptData || this.reciptData.length < 1) {
          this.errorMessage = constants.PAYMENT_RECIPT_NOTfOUND;
          this.paginateFlag = false;
        }
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
      });
  }
}
