import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const URL2 = 'https://api.openweathermap.org/data/2.5/weather?'
@Injectable({
  providedIn: 'root'
})
export class LiveweatherService {

  constructor(private readonly httpClientService: HttpClient) { }
  // constructor(private http: HttpClient) { }
  // fetchData(cityName:string){
  fetchData(cityName:string){
    return this.httpClientService.get(`${URL}${cityName}&appid=5de227dcd9d14b80bb39771618ef96d5`)
    // return this.httpClientService.get(`${URL}lat=${lat}&lon=${lon}&appid=5de227dcd9d14b80bb39771618ef96d5`)
  }
  // fetchData(cityName:string){
  fetchAccountWiseWeather(lat:any,lon:any){
    console.log("latitude",lat,lon);

    // return this.httpClientService.get(`${URL}${cityName}&appid=5de227dcd9d14b80bb39771618ef96d5`)
    return this.httpClientService.get(`${URL2}lat=${lat}&lon=${lon}&appid=5de227dcd9d14b80bb39771618ef96d5`)
  }

  getCityName(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC-d-7RR_MQ45QLQXKSzOxviR2l11kN3wk`;
    return this.httpClientService.get<any>(url);
  }
}
