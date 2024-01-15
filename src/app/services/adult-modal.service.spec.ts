import { TestBed } from '@angular/core/testing';

import { AdultModalService } from './adult-modal.service';

describe('AdultModalService', () => {
  let service: AdultModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdultModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
