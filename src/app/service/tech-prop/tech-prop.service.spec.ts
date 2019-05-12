import { TestBed } from '@angular/core/testing';

import { TechPropService } from './tech-prop.service';

describe('TechPropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechPropService = TestBed.get(TechPropService);
    expect(service).toBeTruthy();
  });
});
