import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceptTwoComponent } from './user-accept-two.component';

describe('UserAcceptTwoComponent', () => {
  let component: UserAcceptTwoComponent;
  let fixture: ComponentFixture<UserAcceptTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcceptTwoComponent]
    });
    fixture = TestBed.createComponent(UserAcceptTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
