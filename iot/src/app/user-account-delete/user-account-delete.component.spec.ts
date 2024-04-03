import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDeleteComponent } from './user-account-delete.component';

describe('UserAccountDeleteComponent', () => {
  let component: UserAccountDeleteComponent;
  let fixture: ComponentFixture<UserAccountDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountDeleteComponent]
    });
    fixture = TestBed.createComponent(UserAccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
