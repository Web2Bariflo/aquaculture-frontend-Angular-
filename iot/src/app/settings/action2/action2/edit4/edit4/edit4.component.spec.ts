import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit4Component } from './edit4.component';

describe('Edit4Component', () => {
  let component: Edit4Component;
  let fixture: ComponentFixture<Edit4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Edit4Component]
    });
    fixture = TestBed.createComponent(Edit4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
