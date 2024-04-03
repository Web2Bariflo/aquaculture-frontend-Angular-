import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOneComponent } from './register-one.component';

describe('RegisterOneComponent', () => {
  let component: RegisterOneComponent;
  let fixture: ComponentFixture<RegisterOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterOneComponent]
    });
    fixture = TestBed.createComponent(RegisterOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
