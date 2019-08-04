import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as constants from '@core/constants/app-constants';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  constants = constants;
  @Input() iconName = '';
  @Input() headerInnerHtml = '';

  @ViewChild('headerhtml') headerhtml: ElementRef;
  constructor() { }

  ngOnInit() {
    this.headerhtml.nativeElement.innerHTML = this.headerInnerHtml;
  }

}
