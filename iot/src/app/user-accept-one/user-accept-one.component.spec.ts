import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceptOneComponent } from './user-accept-one.component';

describe('UserAcceptOneComponent', () => {
  let component: UserAcceptOneComponent;
  let fixture: ComponentFixture<UserAcceptOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcceptOneComponent]
    });
    fixture = TestBed.createComponent(UserAcceptOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
