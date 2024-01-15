import { TestBed } from '@angular/core/testing';

import { TheDiaryService } from './the-diary.service';

describe('TheDiaryService', () => {
  let service: TheDiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheDiaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
