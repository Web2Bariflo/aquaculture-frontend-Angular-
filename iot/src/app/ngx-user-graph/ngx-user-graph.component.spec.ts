import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUserGraphComponent } from './ngx-user-graph.component';

describe('NgxUserGraphComponent', () => {
  let component: NgxUserGraphComponent;
  let fixture: ComponentFixture<NgxUserGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxUserGraphComponent]
    });
    fixture = TestBed.createComponent(NgxUserGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
