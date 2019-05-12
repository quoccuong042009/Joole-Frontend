import { TestBed } from '@angular/core/testing';

import { TypePropService } from './type-prop.service';

describe('TypePropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypePropService = TestBed.get(TypePropService);
    expect(service).toBeTruthy();
  });
});
