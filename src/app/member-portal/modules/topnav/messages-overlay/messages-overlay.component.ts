import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from '@app/core/constants/route-constants';
import { MessagesService } from '@shared-module/services/messages.service';
import { AppComponent } from '@app/app.component';
import { UtilService } from '@app/core/services/util.service';
import { CoreDataService } from '@app/core/services/core-data.service';
import * as constants from '@core/constants/app-constants';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-messages-overlay',
  templateUrl: './messages-overlay.component.html',
  styleUrls: ['./messages-overlay.component.scss']
})
export class MessagesOverlayComponent implements OnInit {
  constants = constants;
  userMessages = [];
  inboxCount = 0;
  archiveCount = 0;
  inboxUnreadCount = 0;
  selectedMsgIds = [];
  successText = '';
  errorText = '';
  loadingMsgs = false;
  userId = sessionStorage.getItem('userId');
  @Output() viewallEvent: EventEmitter<any> = new EventEmitter();
  constructor(private app: AppComponent, private router: Router,
    private messagesService: MessagesService,
    private utilityService: UtilService,
    private coreDataService: CoreDataService) { }

  ngOnInit() {
    this.InboxCategoryClicked();
    this.utilityService.DeleteArchiveConfirmationEvent.subscribe(confirm => {
      if (confirm && confirm.archive) {
        this.ArchiveConfirm();
      } else if (confirm && confirm.delete) {
        this.DeleteConfirm();
      }
    });
  }
  InboxCategoryClicked() {
    this.loadingMsgs = true;
    this.messagesService.GetMemberMessages(this.userId, false, 1, 5, 'unread').subscribe((msgData: any) => {
      this.loadingMsgs = false;
      this.inboxCount = msgData.InboxCount;
      this.archiveCount = msgData.ArchiveCount;
      this.inboxUnreadCount = msgData.InboxUnreadCount;
      this.userMessages = msgData.Messages;
      this.coreDataService.notifictaionUnreadMsgs = this.inboxUnreadCount;
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
          this.loadingMsgs = false;
        }
      });
  }

  DeleteClicked() {
    const checkedMessages = this.userMessages.filter(m => m.Checked);
    if (checkedMessages && checkedMessages.length > 0) {
      this.selectedMsgIds = [];
      checkedMessages.forEach(m => { this.selectedMsgIds.push(m.MessageId); });
      const params = {
        confirmationText: constants.Msg_Delete_Confirmation,
        confirmationBtnLabel: 'Delete'
      };
      this.app.OpenDeleteArchiveMessage(params);
    } else {
      this.errorText = constants.Msg_Delete_Error;
      this.resetMsg();
    }
  }
  DeleteConfirm() {
    this.errorText = '';
    this.successText = '';
    this.messagesService.DeleteMessages(this.selectedMsgIds).subscribe(res => {
      if (res > 0) {
        this.InboxCategoryClicked();
        this.successText = res + ' message(s) Deleted';
        this.resetMsg();
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  ArchiveClicked() {
    const checkedMessages = this.userMessages.filter(m => m.Checked);
    if (checkedMessages && checkedMessages.length > 0) {
      this.selectedMsgIds = [];
      checkedMessages.forEach(m => { this.selectedMsgIds.push(m.MessageId); });
      const params = {
        confirmationText: constants.Msg_Archive_Confirm,
        confirmationBtnLabel: 'Archive'
      };
      this.app.OpenDeleteArchiveMessage(params);
    } else {
      this.errorText = constants.Msg_Archive_Error;
      this.resetMsg();
    }
  }
  ArchiveConfirm() {
    this.errorText = '';
    this.successText = '';
    this.messagesService.ArchiveMessages(this.selectedMsgIds, true).subscribe(res => {
      if (res > 0) {
        this.InboxCategoryClicked();
        this.successText = res + ' message(s) moved to Archive';
        this.resetMsg();
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  openMessage(messageId) {
    const message = this.userMessages.find(m => m.MessageId === messageId);
    this.viewallEvent.emit();
    this.app.openMessageReadPopUP(message);
    if (!message.IsRead) {
      this.coreDataService.notifictaionUnreadMsgs = this.coreDataService.notifictaionUnreadMsgs - 1;
      this.messagesService.MarkAsRead(messageId).subscribe(res => {
        message.IsRead = true;
        this.inboxUnreadCount = this.inboxUnreadCount - 1;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }
  }

  checkValue(messageId) {
    this.errorText = '';
    this.successText = '';
    const message = this.userMessages.find(m => m.MessageId === messageId);
    if (message) {
      message.Checked = !message.Checked;
    }
  }
  viewAllClicked() {
    this.errorText = '';
    this.successText = '';
    this.router.navigate(['/' + RoutesConstants.messages]);
    this.viewallEvent.emit();
  }
  resetMsg() {
    setTimeout(() => {
      this.successText = '';
      this.errorText = '';
    }, 10000);
  }
}
