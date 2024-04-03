import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDevicesComponent } from './user-account-devices.component';

describe('UserAccountDevicesComponent', () => {
  let component: UserAccountDevicesComponent;
  let fixture: ComponentFixture<UserAccountDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountDevicesComponent]
    });
    fixture = TestBed.createComponent(UserAccountDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
