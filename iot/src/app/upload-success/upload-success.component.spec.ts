import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessComponent } from './upload-success.component';

describe('UploadSuccessComponent', () => {
  let component: UploadSuccessComponent;
  let fixture: ComponentFixture<UploadSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSuccessComponent]
    });
    fixture = TestBed.createComponent(UploadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
