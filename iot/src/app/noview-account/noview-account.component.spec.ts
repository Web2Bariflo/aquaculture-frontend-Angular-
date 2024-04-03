import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviewAccountComponent } from './noview-account.component';

describe('NoviewAccountComponent', () => {
  let component: NoviewAccountComponent;
  let fixture: ComponentFixture<NoviewAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoviewAccountComponent]
    });
    fixture = TestBed.createComponent(NoviewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
