import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CoreDataService } from '@core/services/core-data.service';
import * as constants from '@core/constants/app-constants';
import { Router } from '@angular/router';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { AuthRouteService } from '@app/core/services/auth.service';
import { UtilService } from '@app/core/services/util.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { MessagesService } from '@app/shared-module/services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-topnav',
  templateUrl: 'topnav.component.html',
  styleUrls: ['topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  constants = constants;
  lastLogin: string;
  firstName: string;
  today = new Date();
  url: Object;
  userId: string;
  showMessages = false;
  disableTopNav: boolean;
  constructor(public app: AppComponent, public coreDataService: CoreDataService,
    private router: Router, private localStorageService: LocalStoreService,
    private authService: AuthRouteService,
    private utilService: UtilService,
    private sharedService: SharedService,
    private messagesService: MessagesService) { }
  @Input() userMenuItems: any = [
    { label: 'My Profile', icon: 'person' },
    { label: 'Change Password', icon: 'lock' },
    { label: 'Change Security Questions', icon: 'event' },
    { label: 'Sign Out', icon: 'power_settings_new' },
  ];
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    if (this.userId) {
      this.UpdateUnreadCount();
      /* #region ------------USER IMAGES RELATED CODE FOR FUTURE REFERENCE-------------------- */
      /*this.sharedService.getMemberDetailsForDashBoard(this.userId).subscribe((resp: any) => {
        if (resp.avatarImageId) {
          this.sharedService.getMemberProfilePicture(resp.avatarImageId).subscribe((res) => {
            if (res) {
              this.localStorageService.saveSessionData(res, 'image_' + resp.avatarImageId);
              this.url = `data:image/jpeg;base64,` + res;
            }
          });
        }
      });
      this.utilService.picUploadNotifier.subscribe((r) => {
        if (r) {
          this.sharedService.getMemberDetailsForDashBoard(this.userId).subscribe((resp: any) => {
            if (resp) {
              this.sharedService.getMemberProfilePicture(resp.avatarImageId).subscribe(
                res => {
                  this.localStorageService.saveSessionData(res, 'image_' + resp.avatarImageId);
                  this.url = `data:image/jpeg;base64,` + res.toString();
                });
            }
          });
        }
      });*/
      /* #endRegion */
    }
      this.utilService.topNavFirstName.subscribe(firstName => {
        this.firstName = firstName;
      });
      this.utilService.topNavLastLogin.subscribe(lastLogin => {
        this.lastLogin = lastLogin;
      });
      this.lastLogin = sessionStorage.getItem('lastLogin');
      this.firstName = sessionStorage.getItem('firstName');

  }

  GetGreeting() {
    const today = new Date();
    const curHr = today.getHours();
    if (curHr < 12) {
      return 'Morning';
    } else if (curHr < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }
  // global menu icons clicked
  onTopbarMenuIconClick(event, item) {
    switch (item) {
      case 'home':
        this.router.navigate(['/' + RoutesConstants.Dashboard]);
        this.app.onMenuButtonClick(null);
        break;
      case 'contact':
        this.router.navigate(['/' + RoutesConstants.Contact]);
        this.app.onMenuButtonClick(null);
        break;
      case 'faq':
        this.router.navigate(['/' + RoutesConstants.FAQ]);
        this.app.onMenuButtonClick(null);
        break;
      case 'notifications':
        this.showMessages = !this.showMessages;
        this.app.onMenuButtonClick(null);
        break;
      case 'disableTopNavBar':
        this.disableTopNav = true;
        this.app.onMenuButtonClick(null);
        break;
      default:
        break;
    }
  }
  onTopbarSubItemClick(event, index) {
    switch (index) {
      case 1:
        // My Profile clicked
        this.router.navigate(['/' + RoutesConstants.Dependents_Coverage]);
        this.app.onMenuButtonClick(null);
        break;
      case 2:
        // Change Password
        this.router.navigate(['/' + RoutesConstants.Dashboard + '/' + RoutesConstants.ChangePassword]);
        this.app.onMenuButtonClick(null);
        break;
      case 3:
        // Change Security Questions
        this.router.navigate(['/' + RoutesConstants.Dashboard + '/' + RoutesConstants.ChangeSecurityQuestions]);
        this.app.onMenuButtonClick(null);
        break;
      case 4:
        // Sign Out
        this.localStorageService.saveSessionData(null, 'loggedInUser'); 
        // this.authService.logoutUser(sessionStorage.getItem('accessToken'), sessionStorage.getItem('userId')).subscribe();
        this.authService.logoutUser(JSON.parse(sessionStorage.getItem('accessToken')), sessionStorage.getItem('userId')).subscribe();
        this.router.navigate(['/' + RoutesConstants.Login]);
        break;
    }
    event.preventDefault();
  }
  viewAllMessages() {
    this.showMessages = false;
  }
  UpdateUnreadCount() {
    if (sessionStorage.getItem('userId')) {
      this.messagesService.GetUnreadMessageCount(sessionStorage.getItem('userId')).subscribe((res: any) => {
        this.coreDataService.notifictaionUnreadMsgs = res;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }
  }
  onClickedOutside(e) {
    if (this.showMessages) {
      this.showMessages = !this.showMessages;
    }
  }
}
