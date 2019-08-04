import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { FaqService } from '@modules/faq/services/faq.service';
import { ListFaqComponent } from './list-faq.component';
describe('ListFaqComponent', () => {
  let component: ListFaqComponent;
  let fixture: ComponentFixture<ListFaqComponent>;
  const simpleChanges: SimpleChanges = {};
  beforeEach(() => {
    const faqServiceStub = {
      GetFAQBasedOnCategory: arg1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListFaqComponent],
      providers: [
        { provide: FaqService, useValue: faqServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListFaqComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('listOfFAQs defaults to: []', () => {
    expect(component.listOfFAQs).toEqual([]);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadFAQs').and.callThrough();
      component.ngOnChanges(simpleChanges);
      expect(component.LoadFAQs).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadFAQs').and.callThrough();
      component.ngOnInit();
      expect(component.LoadFAQs).toHaveBeenCalled();
    });
  });
  describe('LoadFAQs', () => {
    it('makes expected calls', () => {
      const faqServiceStub: FaqService = fixture.debugElement.injector.get(
        FaqService
      );
      spyOn(component, 'OnSuccessfullLoad').and.callThrough();
      spyOn(component, 'OnLoadFailure').and.callThrough();
      spyOn(faqServiceStub, 'GetFAQBasedOnCategory').and.callThrough();
      component.LoadFAQs();
      expect(component.OnSuccessfullLoad).toHaveBeenCalled();
      expect(component.OnLoadFailure).toHaveBeenCalled();
      expect(faqServiceStub.GetFAQBasedOnCategory).toHaveBeenCalled();
    });
  });
});
