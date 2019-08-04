import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { UtilService } from '@app/core/services/util.service';
import { CoreDataService } from '@app/core/services/core-data.service';
import * as constants from '@core/constants/app-constants';
import { SidemenuComponent } from './sidemenu.component';
describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  beforeEach(() => {
    const appComponentStub = {
      onMenuButtonClick: arg1 => ({}),
      FindProvider: string1 => ({})
    };
    const routerStub = {
      url: { includes: () => ({}) },
      navigate: array1 => ({})
    };
    const utilServiceStub = { setdocumentAndFormClick: arg1 => ({}) };
    const coreDataServiceStub = {
      GetCoveredPlans: userId1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SidemenuComponent],
      providers: [
        { provide: AppComponent, useValue: appComponentStub },
        { provide: Router, useValue: routerStub },
        { provide: UtilService, useValue: utilServiceStub },
        { provide: CoreDataService, useValue: coreDataServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('providerSubmenu defaults to: []', () => {
    expect(component.providerSubmenu).toEqual([]);
  });
  it('menuLabels defaults to: [, , , , , , , ]', () => {
    expect(component.menuLabels).toEqual([, , , , , , , ]);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const coreDataServiceStub: CoreDataService = fixture.debugElement.injector.get(
        CoreDataService
      );
      spyOn(coreDataServiceStub, 'GetCoveredPlans').and.callThrough();
      component.ngOnInit();
      expect(coreDataServiceStub.GetCoveredPlans).toHaveBeenCalled();
    });
  });
});
