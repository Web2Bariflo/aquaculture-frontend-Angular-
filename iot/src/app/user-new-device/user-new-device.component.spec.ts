import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewDeviceComponent } from './user-new-device.component';

describe('UserNewDeviceComponent', () => {
  let component: UserNewDeviceComponent;
  let fixture: ComponentFixture<UserNewDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserNewDeviceComponent]
    });
    fixture = TestBed.createComponent(UserNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
