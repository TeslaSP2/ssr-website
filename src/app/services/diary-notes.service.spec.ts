import { TestBed } from '@angular/core/testing';

import { DiaryNotesService } from './diary-notes.service';

describe('DiaryNotesService', () => {
  let service: DiaryNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
