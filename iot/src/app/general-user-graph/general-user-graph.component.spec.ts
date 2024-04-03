import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserGraphComponent } from './general-user-graph.component';

describe('GeneralUserGraphComponent', () => {
  let component: GeneralUserGraphComponent;
  let fixture: ComponentFixture<GeneralUserGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralUserGraphComponent]
    });
    fixture = TestBed.createComponent(GeneralUserGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
