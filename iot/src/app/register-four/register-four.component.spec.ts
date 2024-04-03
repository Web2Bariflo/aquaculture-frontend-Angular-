import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFourComponent } from './register-four.component';

describe('RegisterFourComponent', () => {
  let component: RegisterFourComponent;
  let fixture: ComponentFixture<RegisterFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFourComponent]
    });
    fixture = TestBed.createComponent(RegisterFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
