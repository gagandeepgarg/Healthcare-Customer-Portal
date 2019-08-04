import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilService } from '@app/core/services/util.service';
import { DocumentSearchHeaderComponent } from './document-search-header.component';
describe('DocumentSearchHeaderComponent', () => {
  let component: DocumentSearchHeaderComponent;
  let fixture: ComponentFixture<DocumentSearchHeaderComponent>;
  beforeEach(() => {
    const utilServiceStub = { documentAndFormClick: { subscribe: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DocumentSearchHeaderComponent],
      providers: [{ provide: UtilService, useValue: utilServiceStub }]
    });
    fixture = TestBed.createComponent(DocumentSearchHeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('showBackButton defaults to: false', () => {
    expect(component.showBackButton).toEqual(false);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'BackCliked').and.callThrough();
      component.ngOnInit();
      expect(component.BackCliked).toHaveBeenCalled();
    });
  });
});
