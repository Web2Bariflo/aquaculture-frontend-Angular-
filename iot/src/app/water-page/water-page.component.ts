import { MqttServiceWrapper } from '../mqtt-service-wrapper.service';
import { Subscription } from 'rxjs';

import { MqttDataService } from '../mqtt-data.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, Renderer2, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { Chart, ChartData, ChartDataset, UpdateMode } from 'chart.js'

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { UserOcrComponent } from '../user-ocr/user-ocr.component';
import { LiveweatherService } from '../liveweather.service';
import { ThemeService } from '../theme.service';
import { param } from 'jquery';
import { SharedDataService } from '../share-data.service';
// import { ThemeService } from 'ng2-charts';
// import { ThemeService } from './theme.service';



type InputObject = { [key: number]: string[] };

@Component({
  selector: 'app-water-page',
  templateUrl: './water-page.component.html',
  styleUrls: ['./water-page.component.css']
})
export class WaterPageComponent implements OnInit {


  receivedMessage: string = '';
  subscription: Subscription | undefined;
  sensorDataIn: { [paramType: string]: number[] } = {};
  lineChart: Chart | null = null; // Initialize to null
  events: string[] = [];
  opened: boolean = true;
  receivedData: any;
  userStoreData: any;
  userNameProfile: any;
  isWebSocketOn = true;
  isWebSocketConnected: any;
  webSocketSubscription: any;
  graphDetails: any;
  controlDetails: any;
  filteredControls: any;
  chartscontainer: { [key: string]: Chart | null } = {};
  chartsIdList: { [key: string]: Chart | null } = {};
  deviceId: any;
  // Initialize an object to store data for all graphs
  sensorData: { [key: string]: { data: number[], borderColor: string } } = {};
  no_of_charts: any;
  chartIds: string[] = []
  downloadOptions: string[] = ['1', '7', '30', '90', 'C'];
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  dynamicChartData: any[] = [];// Assuming dynamicChartData is an array of chart data
  charts: Chart[] = [];
  chartsInitialized = false;
  graphHead: any
  // graphHeadings: any; //[ph,orp,do]
  graphHeadings: any[] = [];
  sensorHeadings: any; //{ph:['ph12', 'ph13'],do:[]}
  deviceIdList: any;
  dataSetNames: any;
  deviceAllDetails: any;
  graphOnValue: any;
  graphSwitch: string[] = [];
  weatherPlace: string = 'Bhubaneswar';
  wData: any;
  lat: any;
  lon: any;
  cityLat: any;
  cityLon: any;
  openCalender = false;
  constructor(private mqttServiceWrapper: MqttServiceWrapper, private el: ElementRef, private renderer: Renderer2,
    private mqttDataService: MqttDataService, public dialog: MatDialog, private sharedDataService: SharedDataService,
    private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService, private readonly weatherService: LiveweatherService, private themeService: ThemeService, private fetchAccountWiseWeather: LiveweatherService, private onAllDeviceslist: AuthenticationService, private geocodingService: LiveweatherService) { }


  // Define an array of tabs in your component
  tabs: string[] = [];

  // Use arrays for showdropup, showContainer, showAccountUp, and showDetails to track each tab's state
  showdropup: boolean[] = Array(this.tabs.length).fill(true);
  showContainer: boolean[] = Array(this.tabs.length).fill(false);
  showAccountUp: boolean[] = Array(this.tabs.length).fill(true);
  showDetails: boolean[] = Array(this.tabs.length).fill(false);
  accountdropup = true;
  accountShow: boolean = false;
  previousGraphHeadings: any;
  childSensorData: any
  childLabels: any;
  childData: any;
  data: any[] = []
  categories: any[] = []
  chartParamName: any[] = []
  labelName: { [key: string]: string } = {};
  sensorDataForChild: any[] = [];
  toggleSensorName: boolean = false;
  topMenu: boolean = false
  accountID: any;
  pondCity: any;
  pondData: any;
  // devicesNamesList: any[]; // assuming this array is initialized with device information
  devicesStatus: { [id: string]: boolean } = {}; // Object to hold device status

  // @ViewChild('chartContainer') chartContainer!: ElementRef;
  // ngAfterViewInit() {
  //   // Access the ElementRef directly or any other logic in the parent component
  //   const nativeElement = this.chartContainer.nativeElement;
  //   // Your logic with nativeElement...
  // }


  toggleTheme(): void {
    this.themeService.toggleTheme();
    // console.log("theme clicked");

  }

  accountsContainer() {

    this.accountdropup = !this.accountdropup;
    this.accountShow = !this.accountShow;



  }

  toggleContainer(index: number) {
    this.showContainer[index] = !this.showContainer[index];
    this.showdropup[index] = !this.showdropup[index];
  }

  accountContainer(index: number) {
    this.showAccountUp[index] = !this.showAccountUp[index];
    this.showDetails[index] = !this.showDetails[index];
  }
  mobileno: any;
  accountsData: any;
  totalPondView: any;
  mobileNumber: any;
  // devicesStatus: { [deviceId: string]: boolean } = {};
  devicesNamesList: any;
  isToggleOn: boolean = false;
  userAccountNumber: any;
  deviceList: any
  // chartContainerVisible: boolean = true;

  // ngOnChanges(changes: SimpleChanges): void {

  //   if (changes['graphHeadings'] && !changes['graphHeadings'].firstChange) {
  //     console.log("changes..........",changes);
  //     // graphHeading has changed, call initializeChart
  //     // this.initializeChart();
  //     // this.updateChart();
  //   // this.initializeChart();
  //   this.handleResponsiveLayout();
  //   window.addEventListener('resize', () => this.handleResponsiveLayout());

  //   // this.subscribeToTopic();

  //   }
  // }
  // ngDoCheck(): void {
  //   // Check for changes in graphHeadings
  //   if (this.previousGraphHeadings !== this.graphHeadings) {
  //     // Update the graph when graphHeadings change
  //     this.previousGraphHeadings = this.graphHeadings;
  //     // this.updateChart();
  //   this.initializeChart();

  //   }
  // }

  // showChart() {
  //   // Perform any logic based on the (change) event
  //   // For example, you can toggle the visibility of the chart container
  //   this.chartContainerVisible = false;
  //   console.log("before time out", this.chartContainerVisible);


  //   // If you want to show the chart-container div after a delay, you can use setTimeout
  //   setTimeout(() => {
  //     this.chartContainerVisible = true;
  //   console.log("after time out", this.chartContainerVisible);

  //   }, 100); // Change the timeout duration as needed
  // }
  async ngOnInit() {
    // console.log(this.sensorDataIn);

    // this.subscribeToTopic();
    // console.log(this.childData);




    this.loadWeather()
    // const storedGraphSwitch = localStorage.getItem('graphHeadings');


    // if (storedGraphSwitch) {
    //   this.graphHeadings = JSON.parse(storedGraphSwitch);
    // }
    // console.log(this.graphHeadings);
    // console.log(this.categories);



    // Set initial value for previousGraphHeadings
    // Initialize the sensorDataIn structure with empty arrays for each sensor type
    this.userStoreData = localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile = userDataObject.userName

    const savedmob = localStorage.getItem('logMob')


    if (savedmob) {
      const getmob = JSON.parse(savedmob)

      this.mobileNumber = getmob;
      const mobData = { mobileno: getmob }

      this.auth.onGetAccounts(mobData).subscribe(response => {
        // console.log("response..",response),
        this.accountsData = response
        // console.log('accounts Data',this.accountsData);

        const accountLength = this.accountsData.items.length;

        for (let i = 0; i < accountLength; i++) {
          this.tabs.push(`Account ${i + 1}`)
        }
        // console.log('tabs', accountLength)

        const coordinatepond: { lat: number; lng: number }[] = this.accountsData.items.map((location: any, index: any) => ({
          lat: location[2],
          lng: location[3],
          label: `P${index + 1}`,
          labelfullname: `Pond ${index + 1}`,
          city: location[1]
          // You can set a default city or determine it based on some logic
        }));
        this.totalPondView = coordinatepond
        this.initMap();

      },
        error => console.log(error))

    }

    else {
      this.mobileno = this.dataSharingService.loginGetMob();
      // console.log(this.mobileno);



      this.dataSharingService.sendMobile(this.mobileno);
      const mobData = { mobileno: this.mobileno }
      this.auth.onGetAccounts(mobData).subscribe(response => {
        // console.log(response),
        this.accountsData = response
        //  this.tabs= this.accountsData.items.map((item:any, index:any)=>{
        //   `Account ${index+1}`
        //  })

        const accountLength = this.accountsData.length;

        for (let i = 0; i < accountLength; i++) {
          this.tabs.push(`Account ${i + 1}`)
        }

        const coordinatepond: { lat: number; lng: number }[] = this.accountsData.items.map((location: any, index: any) => ({
          lat: location[2],
          lng: location[3],
          label: `P${index + 1}`,
          labelfullname: `Pond ${index + 1}`,
          city: location[1]
          // You can set a default city or determine it based on some logic
        }));
        this.totalPondView = coordinatepond
        this.initMap();

      }
        ,
        error => console.log(error))
    }



    // this.auth.onLoginGeneralDashboard(savedmob).subscribe((response) => {
    //   // console.log(response);
    // }, error => {
    //   console.log(error)
    // })

    // try {
    //   const response = await this.auth.onLoginGeneralDashboard(1487826781359).toPromise();
    //   // console.log("auth Data", this.auth);
    //   console.log("Data Response", response);



    //   if (response) {
    //     this.sensorDataForChild = response as any[];
    //     // console.log(this.sensorDataForChild);

    //     const sensorsData = response;
    //     const allValues = Object.values(sensorsData);
    //     const flattened = allValues.reduce((acc, arr) => acc.concat(arr), []);
    //     const uniqueElements = Array.from(new Set(flattened));
    //     this.deviceIdList = Object.keys(sensorsData);
    //     // console.log('list', this.deviceIdList);
    //     this.sensorHeadings = this.transformObject(sensorsData);
    //     this.graphHeadings = uniqueElements;
    //     Object.keys(response).forEach(deviceId => {
    //       const lastThreeDigits = deviceId.slice(-3);
    //       this.labelName[deviceId] = `device ${lastThreeDigits}`;

    //     });


    //   } else {
    //     console.error("Response is undefined");
    //   }

    // } catch (error) {
    //   console.log(error)
    // }

    // console.log(this.sensorHeadings);
    // console.log("garaph Head name",this.graphHead);
    // console.log("garaph switch name",this.graphSwitch);



    // console.log("called..............");




    this.mqttServiceWrapper.connect(() => {
      console.log('Connected to MQTT broker.');
    });

    // console.log("called..............");




    // console.log(this.deviceIdList);
    this.sensorDataIn['dateTime'] = []
    // console.log("called..............");
    // this.subscribeToTopic();


    // this.initializeChart();
    // console.log("called..............");

    // this.handleResponsiveLayout();
    window.addEventListener('resize', () => this.handleResponsiveLayout());

    // console.log("called..............");
    // this.subscribeToTopic();


    // console.log(this.devicesStatus);
    // this.devicesNamesList.forEach((device:any) => {
    //   const storedStatus = localStorage.getItem(device[1]);
    //   console.log(storedStatus);
    //   if (storedStatus !== null) {
    //     this.devicesStatus[device[1]] = JSON.parse(storedStatus);

    //   } else {
    //     // If no status is found in localStorage, default to false (off)
    //     this.devicesStatus[device[1]] = false;
    //   }
    // });



  }
  // click on perticular accouont
  async getAccountData(id: any) {
    // console.log("On click get account info", id);
    // this.weatherPlace = place;
    // console.log("weather Place",this.weatherPlace);
    if (id) {
      this.userAccountNumber = id;
      this.auth.accountClickedMessage(id).subscribe(
        (data) => {
          // console.log("account data..............", data);

          // console.log(data);
          const lat = data.message[2]
          const lon = data.message[3]
          this.pondCity = data.message[0]
          // console.log(lat,lon);

          this.pondData = data;
          this.initMap();
          // console.log(this.deviceIdList);
          
          this.loadAccountWeather(lat, lon)

          // const addressArray = data.message[4].split(', ');

          // this.initMap();

          // this.auth.accountClickedMessage(id).subscribe((res) => {
          //   console.log(res);


          // })
        }


      )
    }
    else {
      this.loadWeather()
    }


    const storedGraphSwitch = localStorage.getItem('graphHeadings');


    if (storedGraphSwitch) {
      this.graphHeadings = JSON.parse(storedGraphSwitch);
    }

    if (id) {
      this.onAllDeviceslist.onAllDeviceslist(id).subscribe((res) => {
        // console.log("Account device details res", res);
        this.devicesNamesList = res;
        this.deviceList = res;
        // Store the data in local storage
        localStorage.setItem('device', JSON.stringify(res));
        // console.log(this.deviceAllDetails);
        this.devicesNamesList.forEach((device: any) => {
          const storedStatus = localStorage.getItem(device[1]);
          // console.log(storedStatus);
          if (storedStatus !== null) {
            this.devicesStatus[device[1]] = JSON.parse(storedStatus);
            // console.log(this.devicesStatus[device[1]]);


          } else {
            // If no status is found in localStorage, default to false (off)
            this.devicesStatus[device[1]] = false;
          }
        });

        this.initMap()

      },
        (error) => {
          console.log(error)
        })
    }
    try {
      const response = await this.auth.onLoginGeneralDashboard(id).toPromise();
      // console.log("auth Data", this.auth);
      // console.log("Data Response", response);



      if (response) {
        this.sensorDataForChild = response as any[];
        // console.log(this.sensorDataForChild);

        const sensorsData = response;
        const allValues = Object.values(sensorsData);
        const flattened = allValues.reduce((acc, arr) => acc.concat(arr), []);
        const uniqueElements = Array.from(new Set(flattened));
        this.deviceIdList = Object.keys(sensorsData);
        // console.log('list', this.deviceIdList);
        var jsonData = JSON.stringify(this.deviceIdList);
        // Store data in local storage
        localStorage.setItem('deviceIdList', jsonData);
        this.sensorHeadings = this.transformObject(sensorsData);
        this.graphHeadings = uniqueElements;
        Object.keys(response).forEach(deviceId => {
          const lastThreeDigits = deviceId.slice(-3);
          this.labelName[deviceId] = `device ${lastThreeDigits}`;

        });


      } else {
        console.error("Response is undefined");
      }
      this.subscribeToTopic();


    } catch (error) {
      console.log(error)
    }
    this.devicesNamesList.forEach((device: any) => {
      const storedStatus = localStorage.getItem(device[1]);
      // console.log(storedStatus);
      if (storedStatus !== null) {
        this.devicesStatus[device[1]] = JSON.parse(storedStatus);
        // console.log(this.devicesStatus[device[1]]);


      } else {
        // If no status is found in localStorage, default to false (off)
        this.devicesStatus[device[1]] = false;
      }
    });
    // console.log(this.deviceIdList);


  }

  // get city name from lat longitude




  loadAccountWeather(lat: any, lon: any) {
    // console.log("latitude",this.lat);

    this.fetchAccountWiseWeather.fetchAccountWiseWeather(lat, lon).subscribe(
      (data) => {
        // console.log(data);
        this.wData = data

      }
    );


  }
  loadWeather() {
    this.weatherService.fetchData(this.weatherPlace).subscribe(
      (data) => {
        this.wData = data
        // this.weatherData.temp = data.main.temp
        // console.log("weather Data",this.wData);
      }
    )
  }
  getGraphSwitch(event: any, value: string) {
    const checkboxValue = event.target.value;
    const index = this.graphHeadings.indexOf(checkboxValue);

    if (index === -1) {
      // Value not in array, add it
      this.graphHeadings = [...this.graphHeadings, checkboxValue];
    } else {
      // Value already in array, remove it
      this.graphHeadings.splice(index, 1);

    };
    localStorage.setItem('graphHeadings', JSON.stringify(this.graphHeadings));
    // window.location.reload()
    this.updateChart();
    this.initializeChart();

  }


  onOcrCode() {
    const dialogRef = this.dialog.open(UserOcrComponent, {
      width: '600px',
      height: '400px',
    })
  }



  onDevices() {
    if (this.accountID) {
      this.onAllDeviceslist.onAllDeviceslist(this.accountID).subscribe((res) => {
        // console.log(res);
        this.devicesNamesList = res;

      },
        (error) => {
          console.log(error)
        })
    }
    // else{

    //   this.auth.onAllDevicesDetails(this.mobileNumber).subscribe((response) => {
    //     console.log("click on deviced", response);
    //     this.devicesNamesList = response;
    //   },
    //     (error) => {
    //       console.log(error)
    //     })
    // }
  }
  showTopNav(event: Event): void {
    this.topMenu = !this.topMenu
    // console.log(this.topMenu);

    // event.stopPropagation();
    const elements = document.querySelectorAll('.top-navbar-menu');
    const body = document.body;
    elements.forEach((element) => {
      if (this.topMenu) {
        this.renderer.addClass(element, 'showTopMenu');

      } else {
        this.renderer.removeClass(element, 'showTopMenu');

      }
    })
  }
  togglesensorName() {
    this.toggleSensorName = !this.toggleSensorName
    const element = document.querySelector('.sensorSwitch')
    // console.log(element);

    if (this.toggleSensorName) {
      this.renderer.addClass(element, 'show-sensor-switch');
    } else {
      this.renderer.removeClass(element, 'show-sensor-switch');
    }
  }
  statusSend: any;
  onDropdownClick(event: Event): void {
    // Prevent the click event from propagating to the document level
    event.stopPropagation();
  }
  showSwitch(e: Event): void {
    e.stopPropagation();
  }

  onToggleChange(event: Event, device: any): void {
    // Prevent the click event from propagating to the dropdown
    event.stopPropagation();
    // console.log( "device",device);
    // console.log( "event",event);


    const isChecked = (event.target as HTMLInputElement).checked;


    this.devicesStatus[device[1]] = isChecked;

    localStorage.setItem(device[1], JSON.stringify(isChecked));
    this.publishToDevice(device, isChecked);
    this.initMap();


    // this.statusSend = {
    //   display_id: parseInt(device[1]),
    //   virtual_pin: device[3],
    //   status: isChecked,
    // }

    // // console.log("device status send",this.statusSend);
    // const jsonData = JSON.stringify(this.statusSend)

    // this.mqttServiceWrapper.publish(`${parseInt(device[1])}`, jsonData, { qos: 0 });
    // console.log('Published message:', jsonData);

    // console.log(this.statusSend);

    // Your toggle change logic here
  }
  publishToDevice(device: any, status: boolean): void {
    const statusSend = {
      display_id: parseInt(device[1]),
      virtual_pin: device[3],
      status: status,
    };

    const jsonData = JSON.stringify(statusSend);
    this.mqttServiceWrapper.publish(`${parseInt(device[1])}`, jsonData, { qos: 0 });
  }

  initMap() {

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 20.658664800983, lng: 84.33196326384271 },
      zoom: 6
    });
    // console.log("map data",this.map);
    // console.log("devcename list", this.pondData.message);
    // Add markers for device locations
    this.devicesNamesList.forEach((item: any) => {
      // console.log(item);

      const isChecked = this.devicesStatus[item[1]]; // Get the toggle state

      let markerColor = isChecked ? 'green' : 'red'; // Default marker color


      const markerPosition = new google.maps.LatLng(item[2][0], item[2][1]);
      const mapMarker = new google.maps.Marker({
        position: markerPosition,
        // label: item[0], // Use the label from the data
        label: '', // Use the label from the data
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: markerColor, // Set marker color
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8 // Adjust the size as needed
        },
        map: this.map
      });

      // Add info window with custom content
      const infoWindow = new google.maps.InfoWindow({
        content: `<div>
                <p>Device Name :${item[0]}</p>
                <p>Latitude: ${item[2][1]}</p>
                <p>Longitude: ${item[2][0]}</p>
             </div>`
      });

      // Show infoWindow on marker click
      mapMarker.addListener('click', () => {
        infoWindow.open(this.map, mapMarker);
      });

      // Show infoWindow on marker hover
      mapMarker.addListener('mouseover', () => {
        infoWindow.open(this.map, mapMarker);
      });

      // Close infoWindow on mouseout
      mapMarker.addListener('mouseout', () => {
        infoWindow.close();
      });
    });
    // console.log(this.pondData);

    const pondName = this.pondData.message[0]; // Extracted from message array
    const lat = this.pondData.message[2]; // Extracted from accounts array
    const lon = this.pondData.message[3];

    // Add markers
    // this.pondData.forEach((marker: any) => {
    const markerPosition = new google.maps.LatLng(lat, lon);
    const mapMarker = new google.maps.Marker({
      position: markerPosition,
      label: pondName, // Use city name as the label for the marker
      map: this.map
    });

    // Add info window with custom content
    const infoWindow = new google.maps.InfoWindow();

    // Use Geocoder to get city based on coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: markerPosition }, (results: any, status) => {
      if (status === 'OK') {
        const city = results[0]?.address_components?.find((component: any) =>
          component.types.includes('locality')
        )?.long_name;
        const Areaaddress = results[0]?.formatted_address;

        const infoContent = `
            <div>
                <p>City: ${city || 'N/A'}</p>
                <p>Latitude: ${lat}</p>
                <p>Longitude: ${lon}</p>
            </div>
        `;

        infoWindow.setContent(infoContent);

        // Show infoWindow on marker click
        mapMarker.addListener('click', () => {
          infoWindow.open(this.map, mapMarker);
        });

        // Show infoWindow on marker hover
        mapMarker.addListener('mouseover', () => {
          infoWindow.open(this.map, mapMarker);
        });

        // Close infoWindow on mouseout
        mapMarker.addListener('mouseout', () => {
          infoWindow.close();
        });
        // Zoom to the marker
        this.map.setZoom(17); // Set zoom level as needed
        this.map.setCenter(markerPosition); // Cent
      } else {
        console.error('Geocode failed due to: ' + status);
      }
    });
    // });

  }


  transformObject(input: any): { [key: string]: string[] } {
    const output: { [key: string]: string[] } = {};
    // console.log(input);


    for (const key in input) {
      const lastThreeDigits = key.toString().slice(-3);
      // const lastThreeDigits = this.deviceAllDetails;
      const values = input[key];

      values.forEach((value: any) => {
        const newKey = `${value}${lastThreeDigits}`;

        if (output[value]) {
          output[value].push(newKey);
        } else {
          output[value] = [newKey];
        }
      });
    }

    return output;
  }


  subscribeToTopic() {
    // Retrieve data from local storage
    // let storedData:any = localStorage.getItem('deviceIdList');
    // var deviceIdList = JSON.parse(storedData);
    // console.log(deviceIdList);

    this.deviceIdList.forEach((id: any) => {
      // console.log(id);
      const subscribeTopic = id + '/data'
      this.subscription = this.mqttServiceWrapper.observe(`${subscribeTopic}`, (message) => {
        this.receivedMessage = message.payload.toString();
        // console.log('Received message:', this.receivedMessage, message);
        const sensorDataIn = JSON.parse(message.payload.toString());
        this.categories = [...this.categories, sensorDataIn.dataPoint.substring(11, 16)];

        this.sharedDataService.updateCategories(this.categories);
        this.data = [...this.data, parseFloat(sensorDataIn.paramValue).toFixed(2)]
        this.sharedDataService.updateData(this.data);
        this.handlesensorDataIn(sensorDataIn);
        // console.log("categories...........................", this.categories, this.deviceIdList);

      });
    })

  }
  // subscribeToTopic() {
  //   this.deviceIdList.forEach((id: any) => {
  //     console.log(id);


  //     const subscribeTopic = id + '/data'
  //      this.mqttServiceWrapper.observe(`${subscribeTopic}`, (message) => {
  //       this.receivedMessage = message.payload.toString();
  //       console.log('Received message:', this.receivedMessage);
  //       const sensorDataIn = JSON.parse(message.payload.toString());
  //       // this.handlesensorDataIn(sensorDataIn);
  //       // Extract the time part (HH:mm)
  //       // const timePart = dataPoint.substring(11, 16);
  //       this.categories = [...this.categories, sensorDataIn.dataPoint.substring(11, 16)];
  //       this.data = [...this.data,parseFloat(sensorDataIn.paramValue).toFixed(2)]
  //       this.sharedDataService.updateData(this.data);
  //       console.log(this.categories,this.data);

  //     });

  //   })

  // }

  handlesensorDataIn(sensorDataIn: any) {
    // console.log("sensorDataIn", sensorDataIn)
    if (this.deviceIdList.includes(sensorDataIn.deviceId)) {
      // console.log('checkId', sensorDataIn)
      this.sharedDataService.setSensorData(sensorDataIn);
      // this.childData = sensorDataIn;
      const idLength = sensorDataIn.deviceId.length;
      const idConcat = sensorDataIn.deviceId.slice(-3);
      // console.log(this.childData);




      const paramName = sensorDataIn.paramType + idConcat;
      // console.log('paramName', paramName)
      // this.chartParamName = [...this.chartParamName, paramName]
      // console.log('paramName', this.sensorDataIn)
      // this.childData = sensorDataIn
      // console.log('paramName', this.childData)


      if (!this.sensorDataIn[paramName]) {
        this.sensorDataIn[paramName] = [];  // Initialize the array if it doesn't exist
      }

      this.sensorDataIn[paramName].push(sensorDataIn.paramValue);
      // console.log("sensor Data paramName......", this.sensorDataIn[paramName]);
      // this.childData = this.sensorDataIn[paramName]
      // console.log(this.childData);



      if (this.sensorDataIn[paramName].length > 60) {
        this.sensorDataIn[paramName].shift();
      }

      if (!this.sensorDataIn['dateTime'].includes(sensorDataIn.dataPoint.split(' ')[1])) {
        this.sensorDataIn['dateTime'].push(sensorDataIn.dataPoint.split(' ')[1]);
      }

      // Keep only the latest 60 values
      if (this.sensorDataIn['dateTime'].length > 60) {
        this.sensorDataIn['dateTime'].shift();
      }
      // if (this.graphSwitch.includes(sensorDataIn.paramType)) {
      //   const idLength = sensorDataIn.deviceId.length;
      //   const idConcat = sensorDataIn.deviceId.slice(-3);

      //   const paramName = sensorDataIn.paramType + idConcat;

      //   if (!this.sensorDataIn[paramName]) {
      //     this.sensorDataIn[paramName] = [];
      //   }

      //   this.sensorDataIn[paramName].push(sensorDataIn.paramValue);

      //   if (this.sensorDataIn[paramName].length > 60) {
      //     this.sensorDataIn[paramName].shift();
      //   }

      //   if (!this.sensorDataIn['dateTime'].includes(sensorDataIn.dataPoint.split(' ')[1])) {
      //     this.sensorDataIn['dateTime'].push(sensorDataIn.dataPoint.split(' ')[1]);
      //   }

      //   if (this.sensorDataIn['dateTime'].length > 60) {
      //     this.sensorDataIn['dateTime'].shift();
      //   }
      // }


    }

    // console.log('Updated Sensor Data:', this.sensorDataIn);  
    // this.mqttDataService.updateSensorData(this.sensorDataIn);

    this.updateChart();
    this.initializeChart();
  }

  initializeChart() {
    // console.log("chart in it called...................");


    // Create a container div for the charts
    const chartContainer = this.chartContainer.nativeElement;// hold for some time this chart............................

    // get grapgSwitch Data from local storage
    const storedGraphSwitch = localStorage.getItem('graphHeadings');

    if (storedGraphSwitch) {
      this.graphHeadings = JSON.parse(storedGraphSwitch);
    }
    // Iterate through filteredControls and create charts

    this.graphHeadings.forEach((name: any, index: number) => {
      // console.log("name & index", name, index);
      //  if(this.graphSwitch.length){
      //   if (index % 2 === 0) {
      //     const rowDiv = document.createElement('div');
      //     rowDiv.className = 'row';
      //     chartContainer.appendChild(rowDiv);
      //   }
      //  }
      // Create a new row for every two charts
      if (index % 2 === 0) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        chartContainer.appendChild(rowDiv);
      }



      // Create a container div for each chart
      const colDiv = document.createElement('div');
      colDiv.className = 'col-lg-6';
      // console.log("Name...",colDiv);

      chartContainer.lastChild?.appendChild(colDiv);

      // Create controls for each chart
      this.createControls(colDiv, index, name);

      // Create canvas for the chart
      const canvas = this.createCanvasElement(index);
      colDiv.appendChild(canvas);

      if (Object.keys(this.sensorHeadings).includes(name)) {
        // console.log("head Name", this.sensorHeadings[name]);

        this.dataSetNames = this.sensorHeadings[name];
        // this.dataSetNames = this.graphSwitch;
        // console.log(this.dataSetNames)
      }
      else {
        this.dataSetNames = [];
      }
      // Create the chart
      const newChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [],  // Initial empty labels
          datasets: this.createDatasets(this.dataSetNames),
          // datasets: this.sensorDataIn,
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'time',
                color: 'red',
              },
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: name,
                color: 'red',
              },
              ticks: {
                stepSize: 5, // Specify the step size between values
                font: {
                  weight: 'bold', // Set the font-weight
                },
              },
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },

          },
        },
      });

      // Push the new chart to the array
      this.charts.push(newChart);
      // this.charts.push({ name, data: { labels: latestDateTime, datasets } });
    });

    this.chartsInitialized = true;
  }
  handleResponsiveLayout() {
    const screenWidth = window.innerWidth;
    const chartsPerRow = screenWidth < 768 ? 1 : 2;

    const chartContainers = this.chartContainer.nativeElement.querySelectorAll('.col-lg-6');
    chartContainers.forEach((container: HTMLElement, index: number) => {
      this.renderer.setStyle(container, 'width', `${100 / chartsPerRow}%`);
    });


    const canvasElements = document.querySelectorAll('canvas');
    const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed

    canvasElements.forEach((canvas: HTMLCanvasElement) => {
      canvas.style.marginLeft = isMobile ? '2px' : '50px';
    });



  }

  private createControls(container: HTMLElement, index: number, displayName: string) {
    // Create controls dynamically
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'd-flex flex-row justify-content-between';

    const header = document.createElement('h1');
    header.textContent = displayName;
    header.classList.add('heading-name');

    const downloadSelect = document.createElement('select');


    // Apply additional styles using Renderer2
    this.renderer.setStyle(downloadSelect, 'background-color', '#80BBF1');
    this.renderer.setStyle(downloadSelect, 'font-size', '16px');
    this.renderer.setStyle(downloadSelect, 'color', 'white');
    this.renderer.setStyle(downloadSelect, 'border-radius', '6px');
    this.renderer.setStyle(downloadSelect, 'border-width', '0px');
    this.renderer.setStyle(downloadSelect, 'margin-right', '10px');
    this.renderer.setStyle(downloadSelect, 'height', '50px');
    this.renderer.setStyle(downloadSelect, 'width', '100px');


    this.renderer.setStyle(controlsDiv, 'margin-bottom', '20px');
    this.renderer.setStyle(controlsDiv, 'margin-top', '15px');

    this.renderer.setStyle(header, 'font-size', '25px');
    this.renderer.setStyle(header, 'font-weight', 'bold');
    this.renderer.setStyle(header, 'color', '#676869');
    this.renderer.setStyle(header, 'margin-left', '90px');

    const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
    const headerMarginLeft = isMobile ? '2px' : '90px';
    const headerFont = isMobile ? '12px' : '25px';

    this.renderer.setStyle(header, 'margin-left', headerMarginLeft);
    this.renderer.setStyle(header, 'font-size', headerFont);

    const selectWidth = isMobile ? '70px' : '100px';
    const selectHeight = isMobile ? '25px' : '50px';
    const selectFont = isMobile ? '10px' : '16px';

    const controlMargin = isMobile ? '5px' : '20px';

    this.renderer.setStyle(downloadSelect, 'width', selectWidth);
    this.renderer.setStyle(downloadSelect, 'font-size', selectFont);

    this.renderer.setStyle(downloadSelect, 'height', selectHeight);
    this.renderer.setStyle(controlsDiv, 'margin-bottom', controlMargin);


    // this.downloadOptions.forEach(optionValue => {
    //   const option = document.createElement('option');
    //   option.value = optionValue;

    //   // option.textContent = optionValue === 'custom' ? 'Custom' : optionValue + ' Days';
    //   option.textContent = optionValue === 'custom' ? 'Custom' : optionValue;
    //   downloadSelect.appendChild(option);
    // });
    // //////////////////////////////////////////////////
    const downloadContainer = document.createElement('div');
    downloadContainer.className = 'dropdown';

    const downloadButton = document.createElement('button');
    downloadButton.className = 'btn btn-info dropdown-toggle';
    downloadButton.type = 'button';
    downloadButton.id = 'downloadDropdown';
    downloadButton.setAttribute('data-bs-toggle', 'dropdown');
    downloadButton.setAttribute('aria-haspopup', 'true');
    downloadButton.setAttribute('aria-expanded', 'false');

    const downloadIcon = document.createElement('i');
    downloadIcon.className = 'fas fa-download'; // Use the appropriate Font Awesome class

    downloadButton.appendChild(downloadIcon);
    downloadContainer.appendChild(downloadButton);

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    dropdownMenu.setAttribute('aria-labelledby', 'downloadDropdown');

    this.downloadOptions.forEach(optionValue => {
      const dropdownItem = document.createElement('button');
      dropdownItem.className = 'dropdown-item';
      dropdownItem.type = 'button';
      // dropdownItem.textContent = optionValue === 'custom' ? 'Custom' : optionValue;
      dropdownItem.textContent = optionValue === 'custom' ? dropdownItem.innerHTML = '<i class="fas fa-your-custom-icon"></i> Custom ' : optionValue;
      dropdownMenu.appendChild(dropdownItem);
    });

    downloadContainer.appendChild(dropdownMenu);
    // this.downloadOptions.forEach(optionValue => {
    //   const option = document.createElement('button');
    //   option.className = 'dropdown-item';
    //   option.type = 'button';

    //   if (optionValue === 'custom') {
    //       // Use your custom icon class or Unicode representation for 'custom'
    //       option.innerHTML = '<i class="fas fa-your-custom-icon"></i> Custom';
    //   } else {
    //       // Use Font Awesome classes for other options
    //       option.innerHTML = `<i class="fas fa-download"></i> ${optionValue}`;
    //   }

    //   option.addEventListener('click', (event) => this.handleDownloadOptionChange(event, index));

    //   dropdownMenu.appendChild(option);
    // });

    // Replace the previous line that appends downloadSelect with this line
    controlsDiv.appendChild(downloadContainer);

    ////////////////////


    // Add event listener to handle download option changes
    downloadSelect.addEventListener('change', (event) => this.handleDownloadOptionChange(event, index));

    controlsDiv.appendChild(header);
    // controlsDiv.appendChild(downloadSelect);
    controlsDiv.appendChild(downloadContainer);

    container.appendChild(controlsDiv);
  }


  private createCanvasElement(index: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 600; // Adjust the width as needed
    canvas.height = 300;
    canvas.style.marginLeft = '50px';
    canvas.id = `lineChart${index + 1}`;
    this.handleResponsiveLayout()
    return canvas;
  }

  private createDatasets(params: any[]): any[] {
    // console.log(params, "paramsData");
    // console.log(this.sensorDataIn);

    // if(this.graphSwitch){
    // this.childData = this.sensorData
    // console.log(this.childData);
    //  const graphLable = params.filter((name)=>name.slice(3)== this.graphSwitch.slice(3))
    // }
    // return params.map((param: any) => {
    return params.map((param: any) => {
      const labelName = param;

      if (labelName in this.sensorDataIn) {

        const sensorData = this.sensorDataIn[labelName];
        // console.log(sensorData);


        const dataset: any = {
          label: labelName,
          data: [...sensorData],
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          hidden: false,
        };


        // Check if a valid color is provided
        // if (param.graph_color) {
        //   dataset.borderColor = param.graph_color;
        // }

        return dataset;
      } else {

        return {

          label: labelName,
          data: [],
          borderWidth: 2,
          // borderColor: param.graph_color,
          fill: false,
          tension: 0.4,
          hidden: false,
        };
      }
    });

  }
  // open calender toggle
  openCalenderModel() {
    this.openCalender = !this.openCalender
    const element = document.querySelector('.calender-container')
    // console.log(element);

    if (this.openCalender) {
      this.renderer.addClass(element, 'popupshow')
    } else {
      this.renderer.removeClass(element, 'popupshow')
    }
    // console.log(this.openCalender);

  }


  handleDownloadOptionChange(event: Event, chartIndex: number) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // Handle the selected download option for the corresponding chart (chartIndex)
    // You can implement the logic to fetch data based on the selected option
    console.log(`Selected download option for chart ${chartIndex}: ${selectedValue}`);
  }

  onLogout(): void {
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('logMob');

    localStorage.removeItem('token');
  }

  updateChart() {
    if (!this.chartsInitialized) {
      // Charts haven't been initialized yet, wait for it
      setTimeout(() => this.updateChart(), 100);
      return;
    }

    const latestDateTime = this.sensorDataIn['dateTime'].slice(-60);

    this.graphHeadings.forEach((name: any, index: number) => {
      // console.log("name.......",name);


      if (Object.keys(this.sensorHeadings).includes(name)) {

        // this.dataSetNames = this.sensorHeadings[name];
        console.log('dataSet Name', this.sensorHeadings[name]);

      }

      const datasets = this.createDatasets(this.dataSetNames);
      const updatedData = {
        labels: latestDateTime,
        datasets,
      };

      const chart = this.charts[index];


      if (chart.config && chart.config.options) {
        // Set animation options
        chart.config.options.animation = {
          duration: 800, // Set the animation duration in milliseconds
          easing: 'easeInOutQuad', // Set the easing function for the animation
        };

        // Update chart data
        chart.data.labels = updatedData.labels;
        chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
          dataset.data = updatedData.datasets[datasetIndex].data;
        });

        // Reset animation options to default after the update
        chart.config.options.animation = {
          duration: 0, // Set to 0 to disable additional animations
        };

        // Update the chart
        chart.update();
      }
    });
  }
  // // get grapg data
  // getGraphSwitchtoggle(event:any){

  //     this.graphSwitch.push(event.target.value)

  //   console.log("Graph switch clicked",this.graphSwitch);

  // }


  unsubscribeFromTopic() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      // console.log('Unsubscribed from topic.');
    }
  }

  disconnect() {
    this.mqttServiceWrapper.disconnect();
    // console.log('Disconnected from MQTT broker.');
  }

  publishData() {

    // Example of publishing data to 'topic123'
    const dataToSend = 'hello from frontend'
    const jsonData = JSON.stringify(dataToSend)

    this.mqttServiceWrapper.publish('topic456', jsonData, { qos: 0 });
    // console.log('Published message:', jsonData);



  }

  ngOnDestroy() {
    // Ensure to unsubscribe when the component is destroyed
    this.unsubscribeFromTopic();
  }



  togglesecondContainer() {
    this.showDiagnosisContainer = !this.showDiagnosisContainer
    this.Diagnosisshowdropup = !this.Diagnosisshowdropup
  }
  ocrcontainerclick() {
    this.showfishwaterbody = !this.showfishwaterbody
    this.fishwatershowdropup = !this.fishwatershowdropup
  }


  showfishwaterbody = false
  fishwatershowdropup = true
  showDiagnosisContainer = false
  Diagnosisshowdropup = true


  // showAccountUp=true;./

  // showDetails = false;
  map: any;
  location = { lat: 20.5937, lng: 78.9629 }
  zoomin = 5
}
