import { TestBed } from '@angular/core/testing';

import { MetalPriceService } from './metal-price.service';

describe('MetalPriceService', () => {
  let service: MetalPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetalPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
