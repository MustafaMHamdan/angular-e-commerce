import { TestBed } from '@angular/core/testing';

import { Products0Service } from './products0.service';

describe('Products0Service', () => {
  let service: Products0Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Products0Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
