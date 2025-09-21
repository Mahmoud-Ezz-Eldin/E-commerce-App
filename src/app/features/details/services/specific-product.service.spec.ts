import { TestBed } from '@angular/core/testing';

import { SpecificProductService } from './specific-product.service';

describe('SpecificProductService', () => {
  let service: SpecificProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
