import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttDeviceComponent } from './mqtt-device.component';

describe('MqttDeviceComponent', () => {
  let component: MqttDeviceComponent;
  let fixture: ComponentFixture<MqttDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MqttDeviceComponent]
    });
    fixture = TestBed.createComponent(MqttDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
