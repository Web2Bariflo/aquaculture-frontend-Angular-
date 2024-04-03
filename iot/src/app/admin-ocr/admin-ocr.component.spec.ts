import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOcrComponent } from './admin-ocr.component';

describe('AdminOcrComponent', () => {
  let component: AdminOcrComponent;
  let fixture: ComponentFixture<AdminOcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOcrComponent]
    });
    fixture = TestBed.createComponent(AdminOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
