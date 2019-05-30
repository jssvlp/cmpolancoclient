import { TestBed } from '@angular/core/testing';

import { GenericdataService } from './genericdata.service';

describe('GenericdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericdataService = TestBed.get(GenericdataService);
    expect(service).toBeTruthy();
  });
});
