import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeviceTypesComponent } from './admin-device-types.component';

describe('AdminDeviceTypesComponent', () => {
  let component: AdminDeviceTypesComponent;
  let fixture: ComponentFixture<AdminDeviceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeviceTypesComponent]
    });
    fixture = TestBed.createComponent(AdminDeviceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
