import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLoginComponent } from './demo-login.component';

describe('DemoLoginComponent', () => {
  let component: DemoLoginComponent;
  let fixture: ComponentFixture<DemoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoLoginComponent]
    });
    fixture = TestBed.createComponent(DemoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
