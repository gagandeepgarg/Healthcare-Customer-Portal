import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { DocumentFormsService } from '@modules/document-forms/services/document-forms.service';
import { SearchedDocumentsComponent } from './searched-documents.component';
import * as constants from '@core/constants/app-constants';
describe('SearchedDocumentsComponent', () => {
  let component: SearchedDocumentsComponent;
  let fixture: ComponentFixture<SearchedDocumentsComponent>;
  const simpleChanges: SimpleChanges = {};
  beforeEach(() => {
    const documentFormsServiceStub = {
      SearchForFile: (arg1, number2, number3, string4, arg5, arg6) => ({
        subscribe: () => ({})
      }),
      getDocumentToDownload: documentId1 => ({ subscribe: () => ({}) })
    };
    const lazyLoadEventStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchedDocumentsComponent],
      providers: [
        { provide: DocumentFormsService, useValue: documentFormsServiceStub },
      ]
    });
    fixture = TestBed.createComponent(SearchedDocumentsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('dropdownCategories defaults to: []', () => {
    expect(component.dropdownCategories).toEqual([]);
  });
  it('selectedCategories defaults to: []', () => {
    expect(component.selectedCategories).toEqual([]);
  });
  it('fileTypes defaults to: constants.FileTypes', () => {
    expect(component.fileTypes).toEqual(constants.FileTypes);
  });
  it('iconColor defaults to: constants.IconColor', () => {
    expect(component.iconColor).toEqual(constants.IconColor);
  });
  it('searchedFilesData defaults to: []', () => {
    expect(component.searchedFilesData).toEqual([]);
  });
  it('filesPerPage defaults to: 50', () => {
    expect(component.filesPerPage).toEqual(50);
  });
  it('sortField defaults to: lastupdatedon', () => {
    expect(component.sortField).toEqual('lastupdatedon');
  });
  it('sortOrder defaults to: asc', () => {
    expect(component.sortOrder).toEqual('asc');
  });
  it('documentSortOrder defaults to: any', () => {
    expect(component.documentSortOrder).toEqual('any');
  });
  it('categorySortOrder defaults to: asc', () => {
    expect(component.categorySortOrder).toEqual('asc');
  });
  it('lastUpdatedSortOrder defaults to: any', () => {
    expect(component.lastUpdatedSortOrder).toEqual('any');
  });
  it('defaultPaginator defaults to: true', () => {
    expect(component.defaultPaginator).toEqual(true);
  });
  it('showResult defaults to: false', () => {
    expect(component.showResult).toEqual(false);
  });
  it('showNoresult defaults to: false', () => {
    expect(component.showNoresult).toEqual(false);
  });
  it('initialSearch defaults to: false', () => {
    expect(component.initialSearch).toEqual(false);
  });
  it('searchedCickedCount defaults to: 0', () => {
    expect(component.searchedCickedCount).toEqual(0);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadCategories').and.callThrough();
      spyOn(component, 'SearchClicked').and.callThrough();
      component.ngOnChanges(simpleChanges);
      expect(component.LoadCategories).toHaveBeenCalled();
      expect(component.SearchClicked).toHaveBeenCalled();
    });
  });
  describe('getPaginatedMessages', () => {
    it('makes expected calls', () => {
      spyOn(component, 'GetFiles').and.callThrough();
      // component.getPaginatedMessages(lazyLoadEventStub);
      expect(component.GetFiles).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadCategories').and.callThrough();
      spyOn(component, 'SearchClicked').and.callThrough();
      component.ngOnInit();
      expect(component.LoadCategories).toHaveBeenCalled();
      expect(component.SearchClicked).toHaveBeenCalled();
    });
  });
  describe('SearchClicked', () => {
    it('makes expected calls', () => {
      const documentFormsServiceStub: DocumentFormsService = fixture.debugElement.injector.get(
        DocumentFormsService
      );
      spyOn(documentFormsServiceStub, 'SearchForFile').and.callThrough();
      component.SearchClicked();
      expect(documentFormsServiceStub.SearchForFile).toHaveBeenCalled();
    });
  });
  describe('onViewAllClick', () => {
    it('makes expected calls', () => {
      const documentFormsServiceStub: DocumentFormsService = fixture.debugElement.injector.get(
        DocumentFormsService
      );
      spyOn(component, 'GetFiles').and.callThrough();
      spyOn(documentFormsServiceStub, 'SearchForFile').and.callThrough();
      component.onViewAllClick();
      expect(component.GetFiles).toHaveBeenCalled();
      expect(documentFormsServiceStub.SearchForFile).toHaveBeenCalled();
    });
  });
});
