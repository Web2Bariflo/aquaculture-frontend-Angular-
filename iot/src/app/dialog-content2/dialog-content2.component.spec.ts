import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContent2Component } from './dialog-content2.component';

describe('DialogContent2Component', () => {
  let component: DialogContent2Component;
  let fixture: ComponentFixture<DialogContent2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogContent2Component]
    });
    fixture = TestBed.createComponent(DialogContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
