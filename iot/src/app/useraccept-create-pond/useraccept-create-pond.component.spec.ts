import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseracceptCreatePondComponent } from './useraccept-create-pond.component';

describe('UseracceptCreatePondComponent', () => {
  let component: UseracceptCreatePondComponent;
  let fixture: ComponentFixture<UseracceptCreatePondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseracceptCreatePondComponent]
    });
    fixture = TestBed.createComponent(UseracceptCreatePondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
