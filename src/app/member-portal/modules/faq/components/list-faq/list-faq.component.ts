import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FaqService } from '@modules/faq/services/faq.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.scss']
})
export class ListFaqComponent implements OnInit, OnChanges {
  @Input() selectedCategory;
  selectedCategoryName: '';
  listOfFAQs: any = [];
  constructor(private faqService: FaqService) { }
  ngOnInit() {
    // load FAQ if category exist on initilaization
    if (this.selectedCategory) {
      this.selectedCategoryName = this.selectedCategory.Category;
      this.LoadFAQs();
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    const change = changes['selectedCategory'];
    // reload FAQ from db if category changed from side menu
    if (change && JSON.stringify(change.currentValue) !== JSON.stringify(change.previousValue)) {
      this.selectedCategoryName = this.selectedCategory.Category;
      this.LoadFAQs();
    }
  }
  LoadFAQs() {
    // load files based on selected category
    this.faqService.GetFAQBasedOnCategory(this.selectedCategory.CatgId)
      .subscribe((result)=>{
        this.OnSuccessfullLoad(result)
      },        
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else if (err.status === 500) {
            this.OnLoadFailure(err)
          }
      });
  }
  OnSuccessfullLoad(result) {
    // Load FAQ based of category
    this.listOfFAQs = result;
  }
  OnLoadFailure(err) {
    // API failure
    console.log('failed to load FAQ data' + err);
  }
}
