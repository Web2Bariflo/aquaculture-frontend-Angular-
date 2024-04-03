import { TestBed } from '@angular/core/testing';

import { MqttServiceWrapperService } from './mqtt-service-wrapper.service';

describe('MqttServiceWrapperService', () => {
  let service: MqttServiceWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttServiceWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
