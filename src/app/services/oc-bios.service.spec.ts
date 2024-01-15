import { TestBed } from '@angular/core/testing';

import { OcBiosService } from './oc-bios.service';

describe('OcBiosService', () => {
  let service: OcBiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcBiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
