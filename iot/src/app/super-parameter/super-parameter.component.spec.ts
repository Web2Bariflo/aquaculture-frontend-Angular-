import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperParameterComponent } from './super-parameter.component';

describe('SuperParameterComponent', () => {
  let component: SuperParameterComponent;
  let fixture: ComponentFixture<SuperParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperParameterComponent]
    });
    fixture = TestBed.createComponent(SuperParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
