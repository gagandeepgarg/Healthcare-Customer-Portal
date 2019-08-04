import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from '@app/shared-module/services/shared.service';
import { UtilService } from '@app/core/services/util.service';
import { LocalStoreService } from '@app/core/services/local-storage.service';
import * as constants  from '@core/constants/app-constants';
import { UploadImageComponent } from './upload-image.component';
import { COMMON_MODULES } from '@app/core/commonModules';
describe('UploadImageComponent', () => {
  let component: UploadImageComponent;
  let fixture: ComponentFixture<UploadImageComponent>;
  beforeEach(() => {
    const sharedServiceStub = {
      uploadUserPictureForDMS: arg1 => ({ subscribe: () => ({}) }),
      uploadUserPictureForMP: upateAvatharToPM1 => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = { picUploadNotifier: { next: () => ({}) } };
    const localStoreServiceStub = { saveSessionData: (arg1, arg2) => ({}) };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports:[COMMON_MODULES],
     declarations: [UploadImageComponent],
      providers: [
        { provide: SharedService, useValue: sharedServiceStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: LocalStoreService, useValue: localStoreServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UploadImageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'uploadTOServer').and.callThrough();
      component.onSubmit();
      expect(component.uploadTOServer).toHaveBeenCalled();
    });
  });
});
