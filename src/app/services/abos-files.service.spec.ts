import { TestBed } from '@angular/core/testing';

import { AbosFilesService } from './abos-files.service';

describe('AbosFilesService', () => {
  let service: AbosFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbosFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
