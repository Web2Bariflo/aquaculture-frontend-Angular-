import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeviceStatsComponent } from './admin-device-stats.component';

describe('AdminDeviceStatsComponent', () => {
  let component: AdminDeviceStatsComponent;
  let fixture: ComponentFixture<AdminDeviceStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeviceStatsComponent]
    });
    fixture = TestBed.createComponent(AdminDeviceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
