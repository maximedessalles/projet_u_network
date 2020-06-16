import { TestBed } from '@angular/core/testing';

import { filiereService } from './filiere.service';

describe('FiliereService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: filiereService = TestBed.get(filiereService);
    expect(service).toBeTruthy();
  });
});
