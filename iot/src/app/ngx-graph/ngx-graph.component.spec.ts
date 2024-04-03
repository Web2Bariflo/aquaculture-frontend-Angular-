import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxGraphComponent } from './ngx-graph.component';

describe('NgxGraphComponent', () => {
  let component: NgxGraphComponent;
  let fixture: ComponentFixture<NgxGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxGraphComponent]
    });
    fixture = TestBed.createComponent(NgxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
