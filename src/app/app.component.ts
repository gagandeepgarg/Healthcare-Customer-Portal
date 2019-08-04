import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, ElementRef, Renderer2, NgZone } from '@angular/core';
import { ScrollPanel, ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { CoreDataService } from './core/services/core-data.service';
import { UtilService } from './core/services/util.service';

import { UserIdleService } from 'angular-user-idle';
import { RoutesConstants } from '@app/core/constants/route-constants';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
enum MenuOrientation {
  STATIC,
  OVERLAY,
  SLIM,
  HORIZONTAL
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy, OnInit {
  providerConfirmationPopUp = false;
  layoutCompact = true;

  layoutMode: MenuOrientation = MenuOrientation.OVERLAY;

  darkMenu = false;

  profileMode = 'inline';

  rotateMenuButton: boolean;

  topbarMenuActive: boolean;

  overlayMenuActive = false;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  rightPanelActive: boolean;

  rightPanelClick: boolean;

  layoutContainer: HTMLDivElement;

  layoutMenuScroller: HTMLDivElement;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  resetMenu: boolean;

  menuHoverActive: boolean;
  // variables for messages realted popup to show it on overlay
  readMessagePopUp = false;
  readMessageSubject = '';
  readMessageText = '';
  readMessageDate: any;
  readMessageSender = '';
  ConfirmationMessagePopUp = false;
  confirmationBtnLabel = '';
  confirmationText = '';

  sessionTimeoutPopUp: boolean;
  @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

  @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

  rippleInitListener: any;

  rippleMouseDownListener: any;

  _timeOut: any;
  _timeOutSeconds: number;
  _timeOutMinutes: number;

  constructor(public renderer2: Renderer2, public zone: NgZone, private router: Router,
    public loadinSpinnerService: LoadingSpinnerService,
    public coreDataService: CoreDataService,
    private utilityService: UtilService,
    private userIdle: UserIdleService,
    private confirmationService: ConfirmationService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => { this.bindRipple(); });

    if (sessionStorage.getItem('userId')) {
      // Start watching for user inactivity.
      this.userIdle.startWatching();
      // Start watching when user idle is starting.
      this.userIdle.onTimerStart().subscribe(count => {
        this._timeOutMinutes = Math.floor((180 - count) / 60);
        this._timeOutSeconds = (180 - count) % 60;
        this.sessionTimeoutPopUp = true;
      });

      // Start watch when time is up.
      this.userIdle.onTimeout().subscribe(() => {
        this.userIdle.stopTimer();
        this.userIdle.stopWatching();
        this.sessionTimeoutPopUp = false;
        this.router.navigate(['/' + RoutesConstants.Login]);
      });
    }

  }



  bindRipple() {
    this.rippleInitListener = this.init.bind(this);
    document.addEventListener('DOMContentLoaded', this.rippleInitListener);
  }

  init() {
    this.rippleMouseDownListener = this.rippleMouseDown.bind(this);
    document.addEventListener('mousedown', this.rippleMouseDownListener, false);
  }

  rippleMouseDown(e) {
    for (let target = e.target; target && target !== this; target = target['parentNode']) {
      if (!this.isVisible(target)) {
        continue;
      }
      if (this.selectorMatches(target, '.ripplelink, .ui-button')) {
        const element = target;
        this.rippleEffect(element, e);
        break;
      }
    }
  }

  selectorMatches(el, selector) {
    const p = Element.prototype;
    const f = p['matches'] || p['webkitMatchesSelector'] || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  }

  isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight);
  }

  rippleEffect(element, e) {
    if (element.querySelector('.ink') === null) {
      const inkEl = document.createElement('span');
      this.addClass(inkEl, 'ink');

      if (this.hasClass(element, 'ripplelink') && element.querySelector('span')) {
        element.querySelector('span').insertAdjacentHTML('afterend', '<span class=\'ink\'></span>');
      } else {
        element.appendChild(inkEl);
      }
    }

    const ink = element.querySelector('.ink');
    this.removeClass(ink, 'ripple-animate');

    if (!ink.offsetHeight && !ink.offsetWidth) {
      const d = Math.max(element.offsetWidth, element.offsetHeight);
      ink.style.height = d + 'px';
      ink.style.width = d + 'px';
    }

    const x = e.pageX - this.getOffset(element).left - (ink.offsetWidth / 2);
    const y = e.pageY - this.getOffset(element).top - (ink.offsetHeight / 2);

    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    ink.style.pointerEvents = 'none';
    this.addClass(ink, 'ripple-animate');
  }
  hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
  }

  addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    };
  }

  unbindRipple() {
    if (this.rippleInitListener) {
      document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
    }
    if (this.rippleMouseDownListener) {
      document.removeEventListener('mousedown', this.rippleMouseDownListener);
    }
  }

  ngAfterViewInit() {
    // this.layoutContainer = <HTMLDivElement>this.layourContainerViewChild.nativeElement;
    // setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.resetMenu = true;
      }

      if (this.overlayMenuActive || this.staticMenuMobileActive) {
        // this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }

    if (!this.rightPanelClick) {
      this.rightPanelActive = false;
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightPanelClick = false;
  }

  onMenuButtonClick(event) {
    if (event == null && this.rotateMenuButton) {
      this.showHideSidebar();
    }
    if (event) {
      this.showHideSidebar();
      event.preventDefault();
    }
  }
  showHideSidebar() {
    this.menuClick = true;
    this.rotateMenuButton = !this.rotateMenuButton;
    this.topbarMenuActive = false;

    if (this.layoutMode === MenuOrientation.OVERLAY) {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
      } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
      }
    }
  }
  onMenuClick($event) {
    this.menuClick = true;
    this.resetMenu = false;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
  }
  // global menu icons clicked
  onTopbarItemClick(event, item) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }
    event.preventDefault();
  }

  onTopbarSubItemClick(event) {
    event.preventDefault();
  }

  onRightPanelButtonClick(event) {
    this.rightPanelClick = true;
    this.rightPanelActive = !this.rightPanelActive;
    event.preventDefault();
  }

  onRightPanelClick() {
    this.rightPanelClick = true;
  }

  hideOverlayMenu() {
    this.rotateMenuButton = false;
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 1024;
  }

  isMobile() {
    return window.innerWidth <= 640;
  }

  isOverlay() {
    return this.layoutMode === MenuOrientation.OVERLAY;
  }

  isHorizontal() {
    return this.layoutMode === MenuOrientation.HORIZONTAL;
  }

  isSlim() {
    return this.layoutMode === MenuOrientation.SLIM;
  }

  changeToStaticMenu() {
    this.layoutMode = MenuOrientation.STATIC;
  }

  changeToOverlayMenu() {
    this.layoutMode = MenuOrientation.OVERLAY;
  }

  changeToHorizontalMenu() {
    this.layoutMode = MenuOrientation.HORIZONTAL;
  }

  changeToSlimMenu() {
    this.layoutMode = MenuOrientation.SLIM;
  }

  ngOnDestroy() {
    this.unbindRipple();
  }

  checkIfRouteLoginOrRegistration() {
    const curentUrl: any = this.router.url;
    if (curentUrl.includes('login') || curentUrl.includes('page-not-found') || curentUrl.includes('password') ||
      curentUrl.includes('registration') || curentUrl === '/') {
      return false;
    } else {
      return true;
    }
  }
  checkIfRouteLogin() {
    const curentUrl: any = this.router.url;
    if (curentUrl.includes('login') || curentUrl.includes('page-not-found') ||
      curentUrl === '/') {
      return false;
    } else {
      return true;
    }
  }

  // messages poup to read message
  openMessageReadPopUP(message) {
    this.readMessageSubject = message.Subject;
    this.readMessageText = message.Message;
    this.readMessageDate = message.MessageSentTime;
    this.readMessageSender = message.SenderEmailId;
    this.readMessagePopUp = true;
  }
  closeMessageReadPopUP() {
    this.readMessagePopUp = false;
  }
  OpenDeleteArchiveMessage(params) {
    this.confirmationBtnLabel = params.confirmationBtnLabel;
    this.confirmationText = params.confirmationText;
    this.ConfirmationMessagePopUp = true;
  }
  ConfirmDeleteArchiveMessage() {
    this.ConfirmationMessagePopUp = false;
    let resp = {};
    if (this.confirmationBtnLabel === 'Delete') {
      resp = { delete: true };
    } else if (this.confirmationBtnLabel === 'Archive') {
      resp = { archive: true };
    }
    this.utilityService.setDeleteArchiveConfirmationEvent(resp);
  }
  closeConfirmationMessagePopUp() {
    this.ConfirmationMessagePopUp = false;
    this.utilityService.setDeleteArchiveConfirmationEvent(null);
  }

  onKeepLoginIn() {
    this.userIdle.resetTimer();
    this.sessionTimeoutPopUp = false;
  }

  onLogOut() {
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
    this.sessionTimeoutPopUp = false;
    this.router.navigate(['/' + RoutesConstants.Login]);
  }

  FindProvider(planType) {
    this.providerConfirmationPopUp = true;
    this.confirmationService.confirm({
      message: constants.REDIRECT_CONFIRMATION_PROVIDER,
      header: 'Confirmation',
      key: 'providerConfirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.OpenProvider(planType);
        this.providerConfirmationPopUp = false;
      },
      reject: () => {
        this.providerConfirmationPopUp = false;
      }
    });
  }
  OpenProvider(planType) {
    const userId = sessionStorage.getItem('userId');
    this.coreDataService.GetProviderLink(userId, planType).subscribe((res: any) => {
      window.open(res.URL, '_blank');
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
}
