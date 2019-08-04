import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CoreDataService } from '@core/services/core-data.service';
import { Router } from '@angular/router';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import { AuthRouteService } from '@app/core/services/auth.service';
import { UtilService } from '@app/core/services/util.service';
import { SharedService } from '@app/shared-module/services/shared.service';
import { MessagesService } from '@app/shared-module/services/messages.service';
import * as constants from '@core/constants/app-constants';
import { TopnavComponent } from './topnav.component';
describe('TopnavComponent', () => {
  let component: TopnavComponent;
  let fixture: ComponentFixture<TopnavComponent>;
  beforeEach(() => {
    const appComponentStub = { onMenuButtonClick: arg1 => ({}) };
    const coreDataServiceStub = { notifictaionUnreadMsgs: {} };
    const routerStub = { navigate: array1 => ({}) };
    const localStoreServiceStub = { saveSessionData: (arg1, string2) => ({}) };
    const authRouteServiceStub = {
      logoutUser: (arg1, arg2) => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = {
      topNavFirstName: { subscribe: () => ({}) },
      topNavLastLogin: { subscribe: () => ({}) }
    };
    const sharedServiceStub = {};
    const messagesServiceStub = {
      GetUnreadMessageCount: arg1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TopnavComponent],
      providers: [
        { provide: AppComponent, useValue: appComponentStub },
        { provide: CoreDataService, useValue: coreDataServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: LocalStoreService, useValue: localStoreServiceStub },
        { provide: AuthRouteService, useValue: authRouteServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: SharedService, useValue: sharedServiceStub },
        { provide: MessagesService, useValue: messagesServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TopnavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('showMessages defaults to: false', () => {
    expect(component.showMessages).toEqual(false);
  });
  it('userMenuItems defaults to: [, , , ]', () => {
    expect(component.userMenuItems).toEqual([, , , ]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'UpdateUnreadCount').and.callThrough();
      component.ngOnInit();
      expect(component.UpdateUnreadCount).toHaveBeenCalled();
    });
  });
  describe('UpdateUnreadCount', () => {
    it('makes expected calls', () => {
      const messagesServiceStub: MessagesService = fixture.debugElement.injector.get(
        MessagesService
      );
      spyOn(messagesServiceStub, 'GetUnreadMessageCount').and.callThrough();
      component.UpdateUnreadCount();
      expect(messagesServiceStub.GetUnreadMessageCount).toHaveBeenCalled();
    });
  });
});
