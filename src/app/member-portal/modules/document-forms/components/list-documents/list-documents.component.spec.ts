import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { DocumentFormsService } from '../../services/document-forms.service';
import { ListDocumentsComponent } from './list-documents.component';
import * as constants from '@core/constants/app-constants';
describe('ListDocumentsComponent', () => {
  let component: ListDocumentsComponent;
  let fixture: ComponentFixture<ListDocumentsComponent>;
  const simpleChanges: SimpleChanges = {};
  beforeEach(() => {
    const simpleChangesStub = {};
    const documentFormsServiceStub = {
      GetDocumentFormsBasedOnCategory: (
        searchText1,
        recordPerPage2,
        pageNumber3,
        sortBy4,
        sortOrder5,
        categories6
      ) => ({ subscribe: () => ({}) }),
      getDocumentToDownload: documentId1 => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListDocumentsComponent],
      providers: [
        { provide: DocumentFormsService, useValue: documentFormsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ListDocumentsComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
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
  it('showResult defaults to: false', () => {
    expect(component.showResult).toEqual(false);
  });
  it('showNoresult defaults to: false', () => {
    expect(component.showNoresult).toEqual(false);
  });
  it('defaultPaginator defaults to: false', () => {
    expect(component.defaultPaginator).toEqual(false);
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadFilesData').and.callThrough();
      component.ngOnChanges(simpleChanges);
      expect(component.LoadFilesData).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadFilesData').and.callThrough();
      component.ngOnInit();
      expect(component.LoadFilesData).toHaveBeenCalled();
    });
  });
  describe('onViewAllClick', () => {
    it('makes expected calls', () => {
      spyOn(component, 'LoadFilesData').and.callThrough();
      component.onViewAllClick();
      expect(component.LoadFilesData).toHaveBeenCalled();
    });
  });
});
