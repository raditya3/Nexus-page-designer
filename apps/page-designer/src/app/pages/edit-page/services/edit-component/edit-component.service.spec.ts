import { TestBed } from '@angular/core/testing';

import { EditComponentService } from './edit-component.service';

describe('EditComponentService', () => {
  let service: EditComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
