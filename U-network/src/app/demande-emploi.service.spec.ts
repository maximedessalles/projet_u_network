import { TestBed } from '@angular/core/testing';

import { demandeEmploiService } from './demande-emploi.service';

describe('DemandeEmploiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: demandeEmploiService = TestBed.get(demandeEmploiService);
    expect(service).toBeTruthy();
  });
});
