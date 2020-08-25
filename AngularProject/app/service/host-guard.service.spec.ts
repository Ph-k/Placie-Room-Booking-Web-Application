import { TestBed } from '@angular/core/testing';

import { HostGuardService } from './host-guard.service';

describe('HostGuardService', () => {
  let service: HostGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
