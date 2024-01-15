import { TestBed } from '@angular/core/testing';

import { TranslateCustomService } from './translate-custom.service';

describe('TranslateCustomService', () => {
  let service: TranslateCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
