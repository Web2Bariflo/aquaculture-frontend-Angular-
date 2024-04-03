// shared-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();

  private categoriesSubject = new BehaviorSubject<any[]>([]);
  public categories$ = this.categoriesSubject.asObservable();
  

  private sensorDataSubject = new BehaviorSubject<any>(null);
  public sensorData$ = this.sensorDataSubject.asObservable();

  updateData(newData: any[]) {
    this.dataSubject.next(newData);
  }
  updateCategories(newCategories: any[]) {
    this.categoriesSubject.next(newCategories);
    // console.log(newCategories);
    

  }
  setSensorData(sensorData: any): void {
    this.sensorDataSubject.next(sensorData);
  }

  getSensorData(): any {
    return this.sensorDataSubject.value;
  }
  
}
