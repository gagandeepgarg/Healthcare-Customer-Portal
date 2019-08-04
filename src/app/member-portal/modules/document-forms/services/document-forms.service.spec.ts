import { TestBed } from '@angular/core/testing';

import { DocumentFormsService } from './document-forms.service';

describe('DocumentFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentFormsService = TestBed.get(DocumentFormsService);
    expect(service).toBeTruthy();
  });
});
