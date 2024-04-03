import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteControlComponent } from './delete-control.component';

describe('DeleteControlComponent', () => {
  let component: DeleteControlComponent;
  let fixture: ComponentFixture<DeleteControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteControlComponent]
    });
    fixture = TestBed.createComponent(DeleteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
