import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotEmailCheckComponent } from './forgot-email-check.component';

describe('ForgotEmailCheckComponent', () => {
  let component: ForgotEmailCheckComponent;
  let fixture: ComponentFixture<ForgotEmailCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotEmailCheckComponent]
    });
    fixture = TestBed.createComponent(ForgotEmailCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
