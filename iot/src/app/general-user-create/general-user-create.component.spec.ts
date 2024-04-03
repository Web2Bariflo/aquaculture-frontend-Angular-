import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserCreateComponent } from './general-user-create.component';

describe('GeneralUserCreateComponent', () => {
  let component: GeneralUserCreateComponent;
  let fixture: ComponentFixture<GeneralUserCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralUserCreateComponent]
    });
    fixture = TestBed.createComponent(GeneralUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
