import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLiveComponent } from './ngx-live.component';

describe('NgxLiveComponent', () => {
  let component: NgxLiveComponent;
  let fixture: ComponentFixture<NgxLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxLiveComponent]
    });
    fixture = TestBed.createComponent(NgxLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
