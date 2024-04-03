import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAccountEditComponent } from './general-account-edit.component';

describe('GeneralAccountEditComponent', () => {
  let component: GeneralAccountEditComponent;
  let fixture: ComponentFixture<GeneralAccountEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAccountEditComponent]
    });
    fixture = TestBed.createComponent(GeneralAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
