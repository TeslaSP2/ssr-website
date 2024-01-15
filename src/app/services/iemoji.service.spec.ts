import { TestBed } from '@angular/core/testing';

import { IemojiService } from './iemoji.service';

describe('IemojiService', () => {
  let service: IemojiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IemojiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
