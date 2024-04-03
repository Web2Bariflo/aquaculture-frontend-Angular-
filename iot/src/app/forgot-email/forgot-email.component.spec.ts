import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotEmailComponent } from './forgot-email.component';

describe('ForgotEmailComponent', () => {
  let component: ForgotEmailComponent;
  let fixture: ComponentFixture<ForgotEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotEmailComponent]
    });
    fixture = TestBed.createComponent(ForgotEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
