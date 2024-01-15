import { TestBed } from '@angular/core/testing';

import { AbosTablesService } from './abos-tables.service';

describe('LexiconService', () => {
  let service: AbosTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbosTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
