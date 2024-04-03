import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceptSuccessComponent } from './user-accept-success.component';

describe('UserAcceptSuccessComponent', () => {
  let component: UserAcceptSuccessComponent;
  let fixture: ComponentFixture<UserAcceptSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcceptSuccessComponent]
    });
    fixture = TestBed.createComponent(UserAcceptSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
