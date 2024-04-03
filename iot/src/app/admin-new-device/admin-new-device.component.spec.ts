import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewDeviceComponent } from './admin-new-device.component';

describe('AdminNewDeviceComponent', () => {
  let component: AdminNewDeviceComponent;
  let fixture: ComponentFixture<AdminNewDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNewDeviceComponent]
    });
    fixture = TestBed.createComponent(AdminNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
