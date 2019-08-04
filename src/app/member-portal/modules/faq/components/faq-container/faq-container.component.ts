import { Component, OnInit } from '@angular/core';
import { FaqService } from '@modules/faq/services/faq.service';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss']
})
export class FaqContainerComponent implements OnInit {
  faqCategories: any[];
  selectedCategory: any;
  constants = constants;
  iconName = constants.ICON_FAQ;
  headerHtml = 'Frequently Asked Questions';
  constructor(
    private faqService: FaqService
  ) { }
  ngOnInit() {
    this.initialLoadForFAQCategories();
  }
  initialLoadForFAQCategories() {
    // Loading all categories of FAQ's
    this.faqService.GetAllFAQCategories().subscribe(res => {
      const categoryData: any = res;
      if (categoryData && categoryData.length > 0) {
        this.faqCategories = categoryData;
        // set first category as selected by default
        this.selectedCategory = this.faqCategories[0];
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  categoryChanged(category) {
    this.selectedCategory = category;
  }
}
