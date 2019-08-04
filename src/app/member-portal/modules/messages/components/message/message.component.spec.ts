import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessagesService } from '@shared-module/services/messages.service';
import { ConfirmationService } from 'primeng/api';
import { CoreDataService } from '@app/core/services/core-data.service';
import * as constants from '@core/constants/app-constants';
import { MessageComponent } from './message.component';
describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  beforeEach(() => {
    const messagesServiceStub = {
      GetMemberMessages: (arg1, archive2, arg3, number4, string5) => ({
        subscribe: () => ({})
      }),
      ArchiveMessages: (arg1, arg2) => ({ subscribe: () => ({}) }),
      DeleteMessages: arg1 => ({ subscribe: () => ({}) }),
      MarkAsRead: messageId1 => ({ subscribe: () => ({}) })
    };
    const confirmationServiceStub = { confirm: object1 => ({}) };
    const coreDataServiceStub = { notifictaionUnreadMsgs: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MessageComponent],
      providers: [
        { provide: MessagesService, useValue: messagesServiceStub },
        { provide: ConfirmationService, useValue: confirmationServiceStub },
        { provide: CoreDataService, useValue: coreDataServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('iconName defaults to: constants.ICON_MESSAGES', () => {
    expect(component.iconName).toEqual(constants.ICON_MESSAGES);
  });
  it('headerHtml defaults to: Messages', () => {
    expect(component.headerHtml).toEqual('Messages');
  });
  it('selectedCategory defaults to: inbox', () => {
    expect(component.selectedCategory).toEqual('inbox');
  });
  it('userMessages defaults to: []', () => {
    expect(component.userMessages).toEqual([]);
  });
  it('viewMessagePopUp defaults to: false', () => {
    expect(component.viewMessagePopUp).toEqual(false);
  });
  it('deleteMessagePopUp defaults to: false', () => {
    expect(component.deleteMessagePopUp).toEqual(false);
  });
  it('selectedMsgIds defaults to: []', () => {
    expect(component.selectedMsgIds).toEqual([]);
  });
  it('inboxCount defaults to: 0', () => {
    expect(component.inboxCount).toEqual(0);
  });
  it('archiveCount defaults to: 0', () => {
    expect(component.archiveCount).toEqual(0);
  });
  it('inboxUnreadCount defaults to: 0', () => {
    expect(component.inboxUnreadCount).toEqual(0);
  });
  it('archiveUnreadCount defaults to: 0', () => {
    expect(component.archiveUnreadCount).toEqual(0);
  });
  it('activePage defaults to: 1', () => {
    expect(component.activePage).toEqual(1);
  });
  it('lastPageNumber defaults to: 1', () => {
    expect(component.lastPageNumber).toEqual(1);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'InboxCategoryClicked').and.callThrough();
      component.ngOnInit();
      expect(component.InboxCategoryClicked).toHaveBeenCalled();
    });
  });
  describe('InboxCategoryClicked', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'updateLastPageNoVal').and.callThrough();
      spyOn(messagesServiceStub, 'GetMemberMessages').and.callThrough();
      component.InboxCategoryClicked();
      expect(component.updateLastPageNoVal).toHaveBeenCalled();
      expect(messagesServiceStub.GetMemberMessages).toHaveBeenCalled();
    });
  });
  describe('ArchivedCategoryClicked', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'updateLastPageNoVal').and.callThrough();
      spyOn(messagesServiceStub, 'GetMemberMessages').and.callThrough();
      component.ArchivedCategoryClicked();
      expect(component.updateLastPageNoVal).toHaveBeenCalled();
      expect(messagesServiceStub.GetMemberMessages).toHaveBeenCalled();
    });
  });
  describe('CummulativeDeleteClicked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'notifyUser').and.callThrough();
      component.CummulativeDeleteClicked();
      expect(component.notifyUser).toHaveBeenCalled();
    });
  });
  describe('CummulativeArchiveClicked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'notifyUser').and.callThrough();
      component.CummulativeArchiveClicked();
      expect(component.notifyUser).toHaveBeenCalled();
    });
  });
  describe('CummulativeMoveToInboxClicked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'notifyUser').and.callThrough();
      component.CummulativeMoveToInboxClicked();
      expect(component.notifyUser).toHaveBeenCalled();
    });
  });
  describe('MoveToInboxConfirm', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'categoryChanged').and.callThrough();
      spyOn(component, 'notifyUser').and.callThrough();
      spyOn(messagesServiceStub, 'ArchiveMessages').and.callThrough();
      component.MoveToInboxConfirm();
      expect(component.categoryChanged).toHaveBeenCalled();
      expect(component.notifyUser).toHaveBeenCalled();
      expect(messagesServiceStub.ArchiveMessages).toHaveBeenCalled();
    });
  });
  describe('DeleteConfirm', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'categoryChanged').and.callThrough();
      spyOn(component, 'notifyUser').and.callThrough();
      spyOn(messagesServiceStub, 'DeleteMessages').and.callThrough();
      component.DeleteConfirm();
      expect(component.categoryChanged).toHaveBeenCalled();
      expect(component.notifyUser).toHaveBeenCalled();
      expect(messagesServiceStub.DeleteMessages).toHaveBeenCalled();
    });
  });
  describe('ArchiveConfirm', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'categoryChanged').and.callThrough();
      spyOn(component, 'notifyUser').and.callThrough();
      spyOn(messagesServiceStub, 'ArchiveMessages').and.callThrough();
      component.ArchiveConfirm();
      expect(component.categoryChanged).toHaveBeenCalled();
      expect(component.notifyUser).toHaveBeenCalled();
      expect(messagesServiceStub.ArchiveMessages).toHaveBeenCalled();
    });
  });
  describe('DeleteMessage', () => {
    it('makes expected calls', () => {
      spyOn(component, 'ArchiveConfirm').and.callThrough();
      spyOn(component, 'DeleteConfirm').and.callThrough();
      spyOn(component, 'MoveToInboxConfirm').and.callThrough();
      component.DeleteMessage();
      expect(component.ArchiveConfirm).toHaveBeenCalled();
      expect(component.DeleteConfirm).toHaveBeenCalled();
      expect(component.MoveToInboxConfirm).toHaveBeenCalled();
    });
  });
  describe('SortByUnread', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(component, 'updateLastPageNoVal').and.callThrough();
      spyOn(messagesServiceStub, 'GetMemberMessages').and.callThrough();
      component.SortByUnread();
      expect(component.updateLastPageNoVal).toHaveBeenCalled();
      expect(messagesServiceStub.GetMemberMessages).toHaveBeenCalled();
    });
  });
});
