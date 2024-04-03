import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAddDeviceComponent } from './register-add-device.component';

describe('RegisterAddDeviceComponent', () => {
  let component: RegisterAddDeviceComponent;
  let fixture: ComponentFixture<RegisterAddDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAddDeviceComponent]
    });
    fixture = TestBed.createComponent(RegisterAddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
