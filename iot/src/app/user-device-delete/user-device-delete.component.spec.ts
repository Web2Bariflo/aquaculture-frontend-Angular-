import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeviceDeleteComponent } from './user-device-delete.component';

describe('UserDeviceDeleteComponent', () => {
  let component: UserDeviceDeleteComponent;
  let fixture: ComponentFixture<UserDeviceDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDeviceDeleteComponent]
    });
    fixture = TestBed.createComponent(UserDeviceDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
