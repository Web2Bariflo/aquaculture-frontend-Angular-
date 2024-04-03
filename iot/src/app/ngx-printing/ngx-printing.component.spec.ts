import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPrintingComponent } from './ngx-printing.component';

describe('NgxPrintingComponent', () => {
  let component: NgxPrintingComponent;
  let fixture: ComponentFixture<NgxPrintingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxPrintingComponent]
    });
    fixture = TestBed.createComponent(NgxPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
