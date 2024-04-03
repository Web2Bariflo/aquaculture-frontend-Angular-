import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContent1Component } from './dialog-content1.component';

describe('DialogContent1Component', () => {
  let component: DialogContent1Component;
  let fixture: ComponentFixture<DialogContent1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContent1Component]
    });
    fixture = TestBed.createComponent(DialogContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
