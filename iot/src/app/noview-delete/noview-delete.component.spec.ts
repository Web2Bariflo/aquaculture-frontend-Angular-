import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviewDeleteComponent } from './noview-delete.component';

describe('NoviewDeleteComponent', () => {
  let component: NoviewDeleteComponent;
  let fixture: ComponentFixture<NoviewDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviewDeleteComponent]
    });
    fixture = TestBed.createComponent(NoviewDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
