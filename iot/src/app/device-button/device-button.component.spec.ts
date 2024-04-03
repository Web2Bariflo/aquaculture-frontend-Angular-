import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceButtonComponent } from './device-button.component';

describe('DeviceButtonComponent', () => {
  let component: DeviceButtonComponent;
  let fixture: ComponentFixture<DeviceButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceButtonComponent]
    });
    fixture = TestBed.createComponent(DeviceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
