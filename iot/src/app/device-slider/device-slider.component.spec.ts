import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSliderComponent } from './device-slider.component';

describe('DeviceSliderComponent', () => {
  let component: DeviceSliderComponent;
  let fixture: ComponentFixture<DeviceSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSliderComponent]
    });
    fixture = TestBed.createComponent(DeviceSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
