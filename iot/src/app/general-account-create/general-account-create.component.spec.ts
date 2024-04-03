import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAccountCreateComponent } from './general-account-create.component';

describe('GeneralAccountCreateComponent', () => {
  let component: GeneralAccountCreateComponent;
  let fixture: ComponentFixture<GeneralAccountCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralAccountCreateComponent]
    });
    fixture = TestBed.createComponent(GeneralAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
