import { Component, OnInit } from '@angular/core';
import * as constants from '@core/constants/app-constants';
@Component({
  selector: 'app-special-services',
  templateUrl: './special-services.component.html',
  styleUrls: ['./special-services.component.scss']
})
export class SpecialServicesComponent implements OnInit {

  iconName = constants.ICON_FAQ;
  headerHtml = 'Special Services';
  constructor() { }

  ngOnInit() {
  }

}
