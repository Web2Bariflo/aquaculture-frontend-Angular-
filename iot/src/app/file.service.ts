// ocr.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private subscriptionKey = '99c2e5e9b6304233943114b1b462e7de';
  private endpoint = 'https://eastasia.api.cognitive.microsoft.com/vision/v2.1';

  constructor(private http: HttpClient) {}

  processImage(file: File): Observable<any> {
    const apiUrl = `${this.endpoint}/ocr?detectOrientation=true`;
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(apiUrl, formData, {
      headers: { 'Ocp-Apim-Subscription-Key': this.subscriptionKey }
    });
  }
}
