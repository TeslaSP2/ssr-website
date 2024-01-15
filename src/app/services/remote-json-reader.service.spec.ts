import { TestBed } from '@angular/core/testing';

import { RemoteJsonReaderService } from './remote-json-reader.service';

describe('RemoteJsonReaderService', () => {
  let service: RemoteJsonReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteJsonReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
