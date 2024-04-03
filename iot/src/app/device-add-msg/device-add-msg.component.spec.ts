import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAddMsgComponent } from './device-add-msg.component';

describe('DeviceAddMsgComponent', () => {
  let component: DeviceAddMsgComponent;
  let fixture: ComponentFixture<DeviceAddMsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceAddMsgComponent]
    });
    fixture = TestBed.createComponent(DeviceAddMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
