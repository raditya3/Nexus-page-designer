import { TestBed } from '@angular/core/testing';

import { PageContextService } from './context.service';

describe('PageContextService', () => {
  let service: PageContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
