import { TestBed } from '@angular/core/testing';

import { TenantGuardService } from './tenant-guard.service';

describe('TenantGuardService', () => {
  let service: TenantGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
