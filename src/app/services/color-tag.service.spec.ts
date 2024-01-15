import { TestBed } from '@angular/core/testing';

import { ColorTagService } from './color-tag.service';

describe('ColorTagService', () => {
  let service: ColorTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
