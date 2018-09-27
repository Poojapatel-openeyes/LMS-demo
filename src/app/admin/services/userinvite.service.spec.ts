import { TestBed, inject } from '@angular/core/testing';

import { UserinviteService } from './userinvite.service';

describe('UserinviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserinviteService]
    });
  });

  it('should be created', inject([UserinviteService], (service: UserinviteService) => {
    expect(service).toBeTruthy();
  }));
});
