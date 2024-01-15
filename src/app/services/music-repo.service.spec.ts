import { TestBed } from '@angular/core/testing';

import { MusicRepoService } from './music-repo.service';

describe('MusicRepoService', () => {
  let service: MusicRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
