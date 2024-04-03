import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotCheckComponent } from './forgot-check.component';

describe('ForgotCheckComponent', () => {
  let component: ForgotCheckComponent;
  let fixture: ComponentFixture<ForgotCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotCheckComponent]
    });
    fixture = TestBed.createComponent(ForgotCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
