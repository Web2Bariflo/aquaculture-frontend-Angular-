import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGraphStatComponent } from './device-graph-stat.component';

describe('DeviceGraphStatComponent', () => {
  let component: DeviceGraphStatComponent;
  let fixture: ComponentFixture<DeviceGraphStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceGraphStatComponent]
    });
    fixture = TestBed.createComponent(DeviceGraphStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
