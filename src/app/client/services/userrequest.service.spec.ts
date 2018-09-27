import { TestBed, inject } from '@angular/core/testing';

import { UserrequestService } from './userrequest.service';

describe('UserrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserrequestService]
    });
  });

  it('should be created', inject([UserrequestService], (service: UserrequestService) => {
    expect(service).toBeTruthy();
  }));
});
