import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://16.171.160.72/'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }


  getAllLogin(): Observable<any> {
    return this.http.get<any>(endpoint);
  }
}
