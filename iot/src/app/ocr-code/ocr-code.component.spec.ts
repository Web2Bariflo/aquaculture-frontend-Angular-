import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrCodeComponent } from './ocr-code.component';

describe('OcrCodeComponent', () => {
  let component: OcrCodeComponent;
  let fixture: ComponentFixture<OcrCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrCodeComponent]
    });
    fixture = TestBed.createComponent(OcrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
