import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDevicesComponent } from './account-devices.component';

describe('AccountDevicesComponent', () => {
  let component: AccountDevicesComponent;
  let fixture: ComponentFixture<AccountDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDevicesComponent]
    });
    fixture = TestBed.createComponent(AccountDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
