import { TestBed } from '@angular/core/testing';

import { AdministratorGuardService } from './administrator-guard.service';

describe('AdministratorGuardService', () => {
  let service: AdministratorGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministratorGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
