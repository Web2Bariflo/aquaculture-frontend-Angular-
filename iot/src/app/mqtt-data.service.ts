// mqtt-data.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttDataService {
  private sensorDataSubject = new Subject<{ [paramType: string]: number[] }>();

  // Observable to which components can subscribe
  sensorData$ = this.sensorDataSubject.asObservable();

  updateSensorData(sensorData: { [paramType: string]: number[] }) {
    this.sensorDataSubject.next(sensorData);
  }
}
