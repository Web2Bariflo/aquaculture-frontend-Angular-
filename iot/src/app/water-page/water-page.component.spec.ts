import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPageComponent } from './water-page.component';

describe('WaterPageComponent', () => {
  let component: WaterPageComponent;
  let fixture: ComponentFixture<WaterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterPageComponent]
    });
    fixture = TestBed.createComponent(WaterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
