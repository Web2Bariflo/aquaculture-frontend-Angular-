import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PondsGraphComponent } from './ponds-graph.component';

describe('PondsGraphComponent', () => {
  let component: PondsGraphComponent;
  let fixture: ComponentFixture<PondsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PondsGraphComponent]
    });
    fixture = TestBed.createComponent(PondsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
