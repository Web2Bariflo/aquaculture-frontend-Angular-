import { Injectable } from '@angular/core';
import { MqttService, IMqttMessage, IMqttServiceOptions } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttServiceWrapper {
  private mqttClient: MqttService;

  constructor() {
    // Assuming you have a proper IMqttServiceOptions here
    const options: IMqttServiceOptions = {
      connectOnCreate: false,
      hostname: '4.240.114.7',
      port: 9001,
      protocol: 'ws', // or 'mqtt' based on your broker configuration
      // path: '/mqtt',
      username: 'BarifloLabs',
      password: 'Bfl@123',
    };

    this.mqttClient = new MqttService(options);
  }

  connect(onConnectCallback: () => void): void {
    this.mqttClient.connect();
    console.log("successful");
    

    this.mqttClient.onConnect.subscribe({
      next: onConnectCallback,
      error: (error: any) => console.error('MQTT connection error:', error),
    });
  }

  observe(topic: string, onNext: (message: IMqttMessage) => void): Subscription {
    return this.mqttClient.observe(topic).subscribe({
      next: onNext,
      error: (error: any) => console.error('MQTT error:', error),
      complete: () => console.log('MQTT connection closed.'),
    });
  }
  
  
  publish(topic: string, message: string, qos:any): void {
    // Ensure to provide both topic and message as separate arguments
  try {
        // this.mqttClient.publish(topic, message, qos);
        // console.log(`Published to ${topic}:`, message);
        this.mqttClient.publish(topic, message, qos)
        .subscribe({
          next: () => console.log('Message published successfully.',message),
          error: (error) => console.error('Failed to publish message:', error),
        });
      }
      catch (error) {
        console.error('MQTT connection error:', error);
        console.error('Cannot publish message. MQTT connection is not established.');
      }

  



    };
    
    disconnect(): void {
      this.mqttClient.disconnect();
    }
  


    
  }
  
  
