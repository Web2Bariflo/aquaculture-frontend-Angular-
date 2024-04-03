import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAccountDeleteComponent } from './general-account-delete.component';

describe('GeneralAccountDeleteComponent', () => {
  let component: GeneralAccountDeleteComponent;
  let fixture: ComponentFixture<GeneralAccountDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAccountDeleteComponent]
    });
    fixture = TestBed.createComponent(GeneralAccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
