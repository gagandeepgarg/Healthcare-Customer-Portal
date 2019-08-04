import { TestBed } from '@angular/core/testing';

import { DependentsCoverageService } from './dependents-coverage.service';

describe('DependentsCoverageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DependentsCoverageService = TestBed.get(DependentsCoverageService);
    expect(service).toBeTruthy();
  });
});
