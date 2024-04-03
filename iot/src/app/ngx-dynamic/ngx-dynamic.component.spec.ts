import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicComponent } from './ngx-dynamic.component';

describe('NgxDynamicComponent', () => {
  let component: NgxDynamicComponent;
  let fixture: ComponentFixture<NgxDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDynamicComponent]
    });
    fixture = TestBed.createComponent(NgxDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
