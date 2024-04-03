import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssignControlsComponent } from './device-assign-controls.component';

describe('DeviceAssignControlsComponent', () => {
  let component: DeviceAssignControlsComponent;
  let fixture: ComponentFixture<DeviceAssignControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceAssignControlsComponent]
    });
    fixture = TestBed.createComponent(DeviceAssignControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
