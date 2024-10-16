import { TestBed } from '@angular/core/testing';

import { RoomsBookingService } from './rooms-booking.service';

describe('RoomsBookingService', () => {
  let service: RoomsBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
