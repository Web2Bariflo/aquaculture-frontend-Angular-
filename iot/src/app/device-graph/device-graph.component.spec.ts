import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceGraphComponent } from './device-graph.component';

describe('DeviceGraphComponent', () => {
  let component: DeviceGraphComponent;
  let fixture: ComponentFixture<DeviceGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceGraphComponent]
    });
    fixture = TestBed.createComponent(DeviceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
