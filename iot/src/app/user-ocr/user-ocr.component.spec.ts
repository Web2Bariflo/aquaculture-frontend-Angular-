import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOcrComponent } from './user-ocr.component';

describe('UserOcrComponent', () => {
  let component: UserOcrComponent;
  let fixture: ComponentFixture<UserOcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserOcrComponent]
    });
    fixture = TestBed.createComponent(UserOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
