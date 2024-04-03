import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewDeviceComponent } from './admin-create-new-device.component';

describe('AdminCreateNewDeviceComponent', () => {
  let component: AdminCreateNewDeviceComponent;
  let fixture: ComponentFixture<AdminCreateNewDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateNewDeviceComponent]
    });
    fixture = TestBed.createComponent(AdminCreateNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
