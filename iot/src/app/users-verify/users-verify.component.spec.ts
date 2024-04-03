import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVerifyComponent } from './users-verify.component';

describe('UsersVerifyComponent', () => {
  let component: UsersVerifyComponent;
  let fixture: ComponentFixture<UsersVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersVerifyComponent]
    });
    fixture = TestBed.createComponent(UsersVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
