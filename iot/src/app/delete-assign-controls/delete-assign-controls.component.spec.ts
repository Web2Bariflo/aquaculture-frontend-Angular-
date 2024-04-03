import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssignControlsComponent } from './delete-assign-controls.component';

describe('DeleteAssignControlsComponent', () => {
  let component: DeleteAssignControlsComponent;
  let fixture: ComponentFixture<DeleteAssignControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAssignControlsComponent]
    });
    fixture = TestBed.createComponent(DeleteAssignControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
