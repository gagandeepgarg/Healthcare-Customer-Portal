import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DocumentFormsService } from '@modules/document-forms/services/document-forms.service';
import { UtilService } from '@app/core/services/util.service';
import * as  constants  from '@core/constants/app-constants';
import { DocumentFormsContainerComponent } from './document-forms-container.component';
describe('DocumentFormsContainerComponent', () => {
  let component: DocumentFormsContainerComponent;
  let fixture: ComponentFixture<DocumentFormsContainerComponent>;
  beforeEach(() => {
    const documentFormsServiceStub = {
      GetAllDocumentFormsCategories: () => ({ subscribe: () => ({}) })
    };
    const utilServiceStub = { documentAndFormClick: { subscribe: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DocumentFormsContainerComponent],
      providers: [
        { provide: DocumentFormsService, useValue: documentFormsServiceStub },
        { provide: UtilService, useValue: utilServiceStub }
      ]
    });
    fixture = TestBed.createComponent(DocumentFormsContainerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('searchClicked defaults to: false', () => {
    expect(component.searchClicked).toEqual(false);
  });
  it('constants defaults to: constants', () => {
    expect(component.constants).toEqual(constants);
  });
  it('searchedCickedCount defaults to: 0', () => {
    expect(component.searchedCickedCount).toEqual(0);
  });
  it('iconName defaults to: constants.ICON_DOCUMENTS', () => {
    expect(component.iconName).toEqual(constants.ICON_DOCUMENTS);
  });
  it('headerHtml defaults to:  Documents & Forms', () => {
    expect(component.headerHtml).toEqual(' Documents & Forms');
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'initialLoadForDocumentsAndForms').and.callThrough();
      component.ngOnInit();
      expect(component.initialLoadForDocumentsAndForms).toHaveBeenCalled();
    });
  });
  describe('initialLoadForDocumentsAndForms', () => {
    it('makes expected calls', () => {
      const documentFormsServiceStub: DocumentFormsService = fixture.debugElement.injector.get(
        DocumentFormsService
      );
      spyOn(
        documentFormsServiceStub,
        'GetAllDocumentFormsCategories'
      ).and.callThrough();
      component.initialLoadForDocumentsAndForms();
      expect(
        documentFormsServiceStub.GetAllDocumentFormsCategories
      ).toHaveBeenCalled();
    });
  });
});
