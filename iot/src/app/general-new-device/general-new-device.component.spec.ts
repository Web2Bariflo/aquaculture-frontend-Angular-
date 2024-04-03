import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNewDeviceComponent } from './general-new-device.component';

describe('GeneralNewDeviceComponent', () => {
  let component: GeneralNewDeviceComponent;
  let fixture: ComponentFixture<GeneralNewDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralNewDeviceComponent]
    });
    fixture = TestBed.createComponent(GeneralNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
