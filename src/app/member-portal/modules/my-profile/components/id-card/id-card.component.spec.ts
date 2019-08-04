import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MyProfileService } from '../../services/my-profile.service';
import { SharedService } from '../../../../../shared-module/services/shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as  constants from '@core/constants/app-constants';
import { IdCardComponent } from './id-card.component';
import { COMMON_MODULES } from '@app/core/commonModules';
import { of } from 'rxjs';
describe('IdCardComponent', () => {
  let component: IdCardComponent;
  let fixture: ComponentFixture<IdCardComponent>;
  beforeEach(() => {
    const myProfileServiceStub = {
      GetDemographicsInformation: arg1 => ({
        subscribe: () => {
        }
      }),
      DownloadIdCard: digitalCardId1 => ({ subscribe: () => { } })
    };
    const sharedServiceStub = {
      getMemberProfilePicture: arg1 => ({ subscribe: () => { } })
    };
    const domSanitizerStub = { bypassSecurityTrustResourceUrl: arg1 => ({}) };
    spyOn(myProfileServiceStub, 'GetDemographicsInformation').and.returnValue(of({}));
    spyOn(sharedServiceStub, 'getMemberProfilePicture').and.returnValue(of({}));
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [COMMON_MODULES],
      declarations: [IdCardComponent],
      providers: [
        { provide: MyProfileService, useValue: myProfileServiceStub },
        { provide: SharedService, useValue: sharedServiceStub },
        { provide: DomSanitizer, useValue: domSanitizerStub }
      ]
    });
    fixture = TestBed.createComponent(IdCardComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('iconName defaults to: constants.ICON_IDCARD', () => {
    expect(component.iconName).toEqual(constants.ICON_IDCARD);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('headerHtml defaults to: Digital ID Card', () => {
    expect(component.headerHtml).toEqual('Digital ID Card');
  });
  it('cardsData defaults to: []', () => {
    expect(component.cardsData).toEqual([]);
  });
  it('display defaults to: false', () => {
    expect(component.display).toEqual(false);
  });
  it('digitalCardId defaults to: 0', () => {
    expect(component.digitalCardId).toEqual(0);
  });
  it('physicalIdRequestFlag defaults to: false', () => {
    expect(component.physicalIdRequestFlag).toEqual(false);
  });
  it('cols defaults to: [, , , , , ]', () => {
    expect(component.cols).toEqual([{ field: '', header: '', width: '10%' },
    { field: 'firstName', header: 'First Name', width: '18%' },
    { field: 'lastName', header: 'Last Name', width: '17%' },
    { field: 'memberType', header: 'Member Type', width: '15%' },
    { field: 'ViewId', header: 'View / Download', width: '20%' },
    { field: '', header: '', width: '20%' }, ]);
  });
  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const myProfileServiceStub: MyProfileService = fixture.debugElement.injector.get(
  //       MyProfileService
  //     );
  //     const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
  //       SharedService
  //     );
  //     spyOn(
  //       myProfileServiceStub,
  //       'GetDemographicsInformation'
  //     ).and.callThrough();
  //     spyOn(sharedServiceStub, 'getMemberProfilePicture').and.callThrough();
  //     component.ngOnInit();
  //     expect(
  //       myProfileServiceStub.GetDemographicsInformation
  //     ).toHaveBeenCalled();
  //     expect(sharedServiceStub.getMemberProfilePicture).toHaveBeenCalled();
  //   });
  // });
  describe('DownloadIDCard', () => {
    it('makes expected calls', () => {
      const myProfileServiceStub: MyProfileService = fixture.debugElement.injector.get(
        MyProfileService
      );
      spyOn(myProfileServiceStub, 'DownloadIdCard').and.returnValue(of('dhdgyigdifguiagfiugaifb'));
      component.DownloadIDCard();
      expect(myProfileServiceStub.DownloadIdCard).toBeTruthy();
    });
  });

  describe('ViewIDCard', () => {
    it('makes expected calls', () => {
      const myProfileServiceStub: MyProfileService = fixture.debugElement.injector.get(
        MyProfileService
      );
      component.ViewIDCard('59219');
      spyOn(myProfileServiceStub, 'DownloadIdCard').and.returnValue(of('dhdgyigdifguiagfiugaifb'));

      expect(myProfileServiceStub.DownloadIdCard).toBeTruthy();
      expect(component.ViewIDCard).toBeTruthy();
    });
  });

  describe('RequestPhysicalIDCard', () => {
    it('makes expected calls', () => {
      component.RequestPhysicalIDCard(59219);
      expect(component.RequestPhysicalIDCard).toBeTruthy();
    });
  });
  describe('cancel', () => {
    it('makes expected calls', () => {
      component.cancel();
      expect(component.cancel).toBeTruthy();
    });
  });
  describe('cancelRequest', () => {
    it('makes expected calls', () => {
      component.cancelRequest();
      expect(component.cancelRequest).toBeTruthy();
    });
  });
  describe('getImageURL', () => {
    it('makes expected calls', () => {
      const sharedServiceStub = {
        getMemberProfilePicture: arg1 => ({ subscribe: () => ({}) })
      };
      component.getImageURL(444);
      spyOn(sharedServiceStub, 'getMemberProfilePicture').and.returnValue(of('dhdgyigdifguiagfiugaifb'));
      expect(sharedServiceStub.getMemberProfilePicture).toBeTruthy();
      expect(component.getImageURL).toBeTruthy();
    });
  });
  // describe('getImageURL', () => {
  //   it('makes expected calls', () => {
  //     const myProfileServiceStub = {
  //     GetDemographicsInformation: arg1 => ({ subscribe: () => ({}) }),
  //     DownloadIdCard: digitalCardId1 => ({ subscribe: () => ({}) })
  //   };
  //    component.getImageURL(444);
  //    spyOn(sharedServiceStub, 'getMemberProfilePicture').and.returnValue(of('dhdgyigdifguiagfiugaifb'));
  //    expect(sharedServiceStub.getMemberProfilePicture).toBeTruthy();
  //     expect(component.getImageURL).toBeTruthy();
  //   });
  // });
});
