import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignControlsComponent } from './assign-controls.component';

describe('AssignControlsComponent', () => {
  let component: AssignControlsComponent;
  let fixture: ComponentFixture<AssignControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignControlsComponent]
    });
    fixture = TestBed.createComponent(AssignControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
