import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeviceTypeComponent } from './delete-device-type.component';

describe('DeleteDeviceTypeComponent', () => {
  let component: DeleteDeviceTypeComponent;
  let fixture: ComponentFixture<DeleteDeviceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDeviceTypeComponent]
    });
    fixture = TestBed.createComponent(DeleteDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
