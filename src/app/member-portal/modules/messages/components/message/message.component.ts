import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as constants from '@core/constants/app-constants';
import { MessagesService } from '@shared-module/services/messages.service';
import { ConfirmationService } from 'primeng/api';
import { CoreDataService } from '@app/core/services/core-data.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {
  @ViewChild('listmessageswrapper') messageListWrapper: ElementRef;
  constants = constants;
  iconName = constants.ICON_MESSAGES;
  headerHtml = 'Messages';
  selectedCategory = 'inbox';
  userMessages = [];
  viewMessagePopUp = false;
  deleteMessagePopUp = false;
  readMessageSubject = '';
  readMessageText = '';
  readMessageDate: any;
  readMessageSender = '';
  confirmationText = '';
  confirmationBtnLabel = '';
  selectedMsgIds = [];
  userId = sessionStorage.getItem('userId');
  inboxCount = 0;
  archiveCount = 0;
  inboxUnreadCount = 0;
  archiveUnreadCount = 0;
  activePage = 1;
  lastPageNumber = 1;
  todayDate = new Date().toDateString();
  constructor(private messagesService: MessagesService,
    private confirmationService: ConfirmationService,
    private coreDataService: CoreDataService) { }
  ngOnInit() {
    this.InboxCategoryClicked();
  }
  pageChanged(pageNumber) {
    if (pageNumber === this.activePage) {
      return;
    }
    this.messageListWrapper.nativeElement.scrollTop = 0;
    this.activePage = pageNumber;
    let archive = false;
    if (this.selectedCategory === 'archive') {
      archive = true;
    }
    this.messagesService.GetMemberMessages(this.userId, archive, this.activePage, 10, 'messageSentTime').subscribe((msgData: any) => {
      this.inboxCount = msgData.InboxCount;
      this.archiveCount = msgData.ArchiveCount;
      this.inboxUnreadCount = msgData.InboxUnreadCount;
      this.archiveUnreadCount = msgData.ArchiveUnreadCount;
      this.userMessages = msgData.Messages;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  updateLastPageNoVal() {
    if (this.selectedCategory === 'inbox') {
      this.lastPageNumber = this.inboxCount % 10 > 0 ? Math.floor(this.inboxCount / 10) + 1 : Math.floor(this.inboxCount / 10);
    } else if (this.selectedCategory === 'archive') {
      this.lastPageNumber = this.archiveCount % 10 > 0 ? Math.floor(this.archiveCount / 10) + 1 : Math.floor(this.archiveCount / 10);
    }

  }
  InboxCategoryClicked() {
    this.messagesService.GetMemberMessages(this.userId, false, this.activePage, 10, 'messageSentTime').subscribe((msgData: any) => {
      this.inboxCount = msgData.InboxCount;
      this.archiveCount = msgData.ArchiveCount;
      this.inboxUnreadCount = msgData.InboxUnreadCount;
      this.archiveUnreadCount = msgData.ArchiveUnreadCount;
      this.userMessages = msgData.Messages;
      this.coreDataService.notifictaionUnreadMsgs = this.inboxUnreadCount;
      this.updateLastPageNoVal();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  ArchivedCategoryClicked() {
    this.messagesService.GetMemberMessages(this.userId, true, this.activePage, 10, 'messageSentTime').subscribe((msgData: any) => {
      this.inboxCount = msgData.InboxCount;
      this.archiveCount = msgData.ArchiveCount;
      this.inboxUnreadCount = msgData.InboxUnreadCount;
      this.archiveUnreadCount = msgData.ArchiveUnreadCount;
      this.userMessages = msgData.Messages;
      this.coreDataService.notifictaionUnreadMsgs = this.inboxUnreadCount;
      this.updateLastPageNoVal();
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  categoryChanged(category, target) {
    if (target === 'sidemenu') {
      this.activePage = 1;
    }
    this.selectedCategory = category;
    if (this.selectedCategory === 'inbox') {
      this.InboxCategoryClicked();
    } else if (this.selectedCategory === 'archive') {
      this.ArchivedCategoryClicked();
    }
  }
  CummulativeDeleteClicked() {
    const checkedMessages = this.userMessages.filter(m => m.Checked);
    if (checkedMessages && checkedMessages.length > 0) {
      this.selectedMsgIds = [];
      checkedMessages.forEach(m => { this.selectedMsgIds.push(m.MessageId); });
      this.confirmationText = constants.Msg_Delete_Confirmation;
      this.confirmationBtnLabel = 'Delete';
      this.deleteMessagePopUp = true;
    } else {
      this.notifyUser(constants.Msg_Delete_Error, 'Delete Message', 'pi pi-exclamation-triangle');
    }
  }
  CummulativeArchiveClicked() {
    const checkedMessages = this.userMessages.filter(m => m.Checked);
    if (checkedMessages && checkedMessages.length > 0) {
      this.selectedMsgIds = [];
      checkedMessages.forEach(m => { this.selectedMsgIds.push(m.MessageId); });
      this.confirmationText = constants.Msg_Archive_Confirm;
      this.confirmationBtnLabel = 'Archive';
      this.deleteMessagePopUp = true;
    } else {
      this.notifyUser(constants.Msg_Archive_Error, 'Archive Message', 'pi pi-exclamation-triangle');
    }
  }
  CummulativeMoveToInboxClicked() {
    const checkedMessages = this.userMessages.filter(m => m.Checked);
    if (checkedMessages && checkedMessages.length > 0) {
      this.selectedMsgIds = [];
      checkedMessages.forEach(m => { this.selectedMsgIds.push(m.MessageId); });
      this.confirmationText = constants.Msg_Inbox_confirm;
      this.confirmationBtnLabel = 'Inbox';
      this.deleteMessagePopUp = true;
    } else {
      this.notifyUser(constants.Msg_Inbox_Error, 'Move Message', 'pi pi-exclamation-triangle');
    }
  }
  MoveToInboxClicked(messageId) {
    this.selectedMsgIds = [messageId];
    this.confirmationText = constants.Msg_Inbox_confirm;
    this.confirmationBtnLabel = 'Inbox';
    this.deleteMessagePopUp = true;
  }
  MoveToInboxConfirm() {
    this.messagesService.ArchiveMessages(this.selectedMsgIds, false).subscribe(res => {
      if (res > 0) {
        this.categoryChanged(this.selectedCategory, '');
        this.deleteMessagePopUp = false;
        this.notifyUser( res + ' message(s) moved to Inbox', 'Move Message', 'pi pi-check');
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  DeleteClicked(messageId) {
    this.selectedMsgIds = [messageId];
    this.confirmationText = constants.Msg_Delete_Confirmation;
    this.confirmationBtnLabel = 'Delete';
    this.deleteMessagePopUp = true;
  }
  DeleteConfirm() {
    this.messagesService.DeleteMessages(this.selectedMsgIds).subscribe(res => {
      if (res > 0) {
        this.categoryChanged(this.selectedCategory, '');
        this.deleteMessagePopUp = false;
        this.notifyUser( res + ' message(s) Deleted', 'Delete Message', 'pi pi-check');
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  ArchiveClicked(messageId) {
    this.selectedMsgIds = [messageId];
    this.confirmationText = constants.Msg_Archive_Confirm;
    this.confirmationBtnLabel = 'Archive';
    this.deleteMessagePopUp = true;
  }
  ArchiveConfirm() {
    this.messagesService.ArchiveMessages(this.selectedMsgIds, true).subscribe(res => {
      if (res > 0) {
        this.categoryChanged(this.selectedCategory, '');
        this.deleteMessagePopUp = false;
        this.notifyUser(res + ' message(s) moved to Archive', 'Archive Message', 'pi pi-check');
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else if (err.status === 500) {
      }
  });
  }
  checkValue(messageId) {
    const message = this.userMessages.find(m => m.MessageId === messageId);
    if (message) {
      message.Checked = !message.Checked;
    }
  }
  openMessage(messageId) {
    const message = this.userMessages.find(m => m.MessageId === messageId);
    this.readMessageSubject = message.Subject;
    this.readMessageText = message.Message;
    this.readMessageDate = message.MessageSentTime;
    this.readMessageSender = message.SenderEmailId;
    this.viewMessagePopUp = true;
    if (!message.IsRead) {
      this.coreDataService.notifictaionUnreadMsgs = this.coreDataService.notifictaionUnreadMsgs - 1;
      this.messagesService.MarkAsRead(messageId).subscribe(res => {
        message.IsRead = true;
        if (this.selectedCategory === 'inbox') {
          this.inboxUnreadCount = this.inboxUnreadCount - 1;
        } else {
          this.archiveUnreadCount = this.archiveUnreadCount - 1;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }
  }
  closeMessage() {
    this.viewMessagePopUp = false;
    this.readMessageSubject = '';
    this.readMessageText = '';
    this.readMessageDate = null;
    this.readMessageSender = '';
  }
  closeDeleteMessage() {
    this.selectedMsgIds = [];
    this.deleteMessagePopUp = false;
  }
  DeleteMessage() {
    if (this.confirmationBtnLabel === 'Archive') {
      this.ArchiveConfirm();
    } else if (this.confirmationBtnLabel === 'Delete') {
      this.DeleteConfirm();
    } else if (this.confirmationBtnLabel === 'Inbox') {
      this.MoveToInboxConfirm();
    }
  }
  SortByUnread() {
    const unreadCount = this.selectedCategory === 'inbox' ? this.inboxUnreadCount : this.archiveUnreadCount;
    if (unreadCount > 0) {
      const archive = this.selectedCategory === 'archive';
      this.messagesService.GetMemberMessages(this.userId, archive, this.activePage, 10, 'unread').subscribe((msgData: any) => {
        this.inboxCount = msgData.InboxCount;
        this.archiveCount = msgData.ArchiveCount;
        this.inboxUnreadCount = msgData.InboxUnreadCount;
        this.archiveUnreadCount = msgData.ArchiveUnreadCount;
        this.userMessages = msgData.Messages;
        this.updateLastPageNoVal();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else if (err.status === 500) {
        }
    });
    }
  }

  notifyUser(message, header, icon) {
    this.confirmationService.confirm({
      message: message,
      header: header,
      key: 'notificationDialog',
      icon: icon,
      accept: () => {
      }
    });
  }
  getDateString(date) {
    const d = new Date(date);
    return d.toDateString();
  }
}
