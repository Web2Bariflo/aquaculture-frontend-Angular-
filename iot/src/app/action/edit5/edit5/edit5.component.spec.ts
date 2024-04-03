import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit5Component } from './edit5.component';

describe('Edit5Component', () => {
  let component: Edit5Component;
  let fixture: ComponentFixture<Edit5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Edit5Component]
    });
    fixture = TestBed.createComponent(Edit5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
