import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcceptComponent } from './user-accept.component';

describe('UserAcceptComponent', () => {
  let component: UserAcceptComponent;
  let fixture: ComponentFixture<UserAcceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcceptComponent]
    });
    fixture = TestBed.createComponent(UserAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
