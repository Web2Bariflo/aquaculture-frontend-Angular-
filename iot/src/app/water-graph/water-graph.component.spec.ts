import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterGraphComponent } from './water-graph.component';

describe('WaterGraphComponent', () => {
  let component: WaterGraphComponent;
  let fixture: ComponentFixture<WaterGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterGraphComponent]
    });
    fixture = TestBed.createComponent(WaterGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
