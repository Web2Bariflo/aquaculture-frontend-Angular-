import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserStatsComponent } from './general-user-stats.component';

describe('GeneralUserStatsComponent', () => {
  let component: GeneralUserStatsComponent;
  let fixture: ComponentFixture<GeneralUserStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralUserStatsComponent]
    });
    fixture = TestBed.createComponent(GeneralUserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
