import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as $ from 'jquery';
import { Router, NavigationExtras } from '@angular/router';
import * as constants from '@core/constants/app-constants';
import { CoreDataService } from '@core/services/core-data.service';
import { RoutesConstants } from '@core/constants/route-constants';
import { RegexConstants } from '@app/core/constants/regex-constants';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent implements OnInit, AfterViewInit {
  activeIndex: any = REGISTER_ACTIVE.personalInfo;
  items: MenuItem[];
  counter = 10;
  constants = constants;
  backBtnClicked: boolean;
  iconName = constants.ICON_ACTIVATE;
  headerHtml = ' Activate your <b>Customer Healthcare</b> account';
  @ViewChild('pSteps') psteps: ElementRef;
  constructor(
    private router: Router,
    private coreDataService: CoreDataService
  ) {
    this.Init();
  }
  // create steps header
  Init() {
    this.items = [
      {
        label: 'Personal Info',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Create Account',
        command: (event: any) => {
          this.activeIndex = 1;
        }
      }
    ];
  }
  // initial load check which registartion step is active and load page accordingly
  ngOnInit() {
    const activePage: any = sessionStorage.getItem('registeractivepage');
    if (activePage && activePage === REGISTER_ACTIVE.createAccount.toString()) {
      this.activeIndex = REGISTER_ACTIVE.createAccount;
    } else {
      sessionStorage.setItem(
        'registeractivepage',
        REGISTER_ACTIVE.personalInfo.toString()
      );
    }
  }
  // handling page refresh on create account page
  ngAfterViewInit() {
    if (this.activeIndex === REGISTER_ACTIVE.createAccount) {
      this.setCompletedTabStyling();
    }
  }
  // handling header tab click events
  display(e) {
    const target = e.target.innerHTML;
    if (
      (target &&
        this.activeIndex === 1 &&
        (target.toString().indexOf('1') >= 0 || target.toString().indexOf('fa-check') >= 0 ||
          target.toString().indexOf('Personal Info') >= 0)) || (!target && e.target.className.toString().indexOf('fa-check') >= 0)
    ) {
      const pbutton = $('#createAccount')[0];
      $(pbutton).trigger('click');
    } else if (
      target &&
      this.activeIndex === 0 &&
      (target.toString().indexOf('>2<') >= 0 || target.toString() === '2' ||
        target.toString().indexOf('Create Account') >= 0)
    ) {
      const pbutton = $('#personalInfo')[0];
      $(pbutton)
        .find(':button')
        .trigger('click');
    }
    e.preventDefault();
    return false;
  }
  // move to create account page
  PersonalInfoEvent(e) {
    this.activeIndex = REGISTER_ACTIVE.createAccount;
    this.setCompletedTabStyling();
    sessionStorage.setItem(
      'registeractivepage',
      REGISTER_ACTIVE.createAccount.toString()
    );
  }
  // loading back personal info page
  backToPersonalInfo(e) {
    this.backBtnClicked = true;
    this.activeIndex = REGISTER_ACTIVE.personalInfo;
    sessionStorage.setItem(
      'registeractivepage',
      REGISTER_ACTIVE.personalInfo.toString()
    );
    this.setUnCompletedTabStyling();
  }

  // navidating to success page
  AccountCreated(e) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        leftIcon: constants.ICON_CONGRATS_LEFT,
        upperText: 'Congratulations!',
        rightIcon: constants.ICON_CONGRATS_RIGHT,
        belowText: 'Registration Completed Successfully',
        bodyText: '',
      }
    };
    this.router.navigate(['/' + RoutesConstants.Shared + '/' + RoutesConstants.successtimer], navigationExtras);
  }
  // making green check at personal info step header
  setCompletedTabStyling() {
    const element = $('.ui-steps-number:first');
    if (element) {
      element.html('<i class="fa fa-check"></i>');
      element.css({ 'background-color': '#6BA43A', color: 'white', 'padding-left': '1%' });
      $('.ui-steps-item:first').css('opacity', '1');
    }
  }
  // making 1 number again at personal info step header and removing green check symbol
  setUnCompletedTabStyling() {
    const element = $('.ui-steps-number:first');
    if (element) {
      element.html('1');
      element.css({ 'background-color': '#F18A00', color: 'white', 'padding-left': '2%' });
      $('.ui-steps-item:first').css('opacity', '1');
    }
  }
  validateNumber(event: any): number {
    event.target.value = event.target.value.trim();
    if (isNaN(event.target.value)) {
      event.target.value = event.target.value.replace(RegexConstants.PhoneNumber, '');
      return event.target.value;
    }
  }
}
export const REGISTER_ACTIVE = {
  personalInfo: 0,
  createAccount: 1
};
