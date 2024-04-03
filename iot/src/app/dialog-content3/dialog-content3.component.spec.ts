import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContent3Component } from './dialog-content3.component';

describe('DialogContent3Component', () => {
  let component: DialogContent3Component;
  let fixture: ComponentFixture<DialogContent3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContent3Component]
    });
    fixture = TestBed.createComponent(DialogContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
