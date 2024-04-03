import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviewPermissionComponent } from './noview-permission.component';

describe('NoviewPermissionComponent', () => {
  let component: NoviewPermissionComponent;
  let fixture: ComponentFixture<NoviewPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviewPermissionComponent]
    });
    fixture = TestBed.createComponent(NoviewPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
