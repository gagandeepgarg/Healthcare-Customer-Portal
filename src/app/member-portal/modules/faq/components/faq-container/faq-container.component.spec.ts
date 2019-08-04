import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FaqService } from '@modules/faq/services/faq.service';
import * as constants from '@core/constants/app-constants';
import { FaqContainerComponent } from './faq-container.component';
describe('FaqContainerComponent', () => {
  let component: FaqContainerComponent;
  let fixture: ComponentFixture<FaqContainerComponent>;
  beforeEach(() => {
    const faqServiceStub = {
      GetAllFAQCategories: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FaqContainerComponent],
      providers: [{ provide: FaqService, useValue: faqServiceStub }]
    });
    fixture = TestBed.createComponent(FaqContainerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('iconName defaults to: constants.ICON_FAQ', () => {
    expect(component.iconName).toEqual(constants.ICON_FAQ);
  });
  it('headerHtml defaults to: Frequently Asked Questions', () => {
    expect(component.headerHtml).toEqual('Frequently Asked Questions');
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initialLoadForFAQCategories').and.callThrough();
      component.ngOnInit();
      expect(component.initialLoadForFAQCategories).toHaveBeenCalled();
    });
  });
  describe('initialLoadForFAQCategories', () => {
    it('makes expected calls', () => {
      const faqServiceStub: FaqService = fixture.debugElement.injector.get(
        FaqService
      );
      spyOn(faqServiceStub, 'GetAllFAQCategories').and.callThrough();
      component.initialLoadForFAQCategories();
      expect(faqServiceStub.GetAllFAQCategories).toHaveBeenCalled();
    });
  });
});
