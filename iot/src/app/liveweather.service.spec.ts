import { TestBed } from '@angular/core/testing';

import { LiveweatherService } from './liveweather.service';

describe('LiveweatherService', () => {
  let service: LiveweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
