
import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { DeviceAddMsgComponent } from '../device-add-msg/device-add-msg.component';
import { ci } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-register-add-device',
  templateUrl: './register-add-device.component.html',
  styleUrls: ['./register-add-device.component.css']
})
export class RegisterAddDeviceComponent implements OnInit{
  constructor(@Inject (MAT_DIALOG_DATA) public data:any,public dialog: MatDialog, private router: Router, private auth: AuthenticationService, private dataSharingService: DataSharingService, private dialogRef: MatDialogRef<RegisterAddDeviceComponent>) {
    // this.loginform-this.formBuilder.group
  }
  // @ViewChild('map') mapElement: any;
  selectdevice : string="";
  devicename: string="";
  map: google.maps.Map | null = null;
  openMap = false;
  city: string = "";
  location: any;
  zoomin=4;
  marklocation:any=false;
  locationlive: any;
  deviceLocation: any;
  // deviceName:any;
  // selectdevice:any;


  
  
errorMsg ="";
showError=false;

async onAddDevice(){
  this.errorMsg =""
  this.showError=false;
  
  console.log("Before  all device.................",this.devicename, this.data, this.selectdevice,this.deviceLocation);
  if (this.devicename && this.selectdevice){
    const accountid = this.data;
    const deviceDetails = {accountid:accountid, devicename: this.devicename,devicetype: this.selectdevice,location : this.deviceLocation}
    console.log("after submit.....",deviceDetails);
    
   await this.auth.addRegisterDevice(deviceDetails).subscribe(response=>
      console.log(response),
      error=>
      console.log(error))
      this.dialogRef.close();
    
    const dialogAdd = this.dialog.open(DeviceAddMsgComponent,{
      width:'400px',
    })

    await setTimeout(()=>{
      dialogAdd.close();
    },2000)

    



  }
  else{
    this.errorMsg = "*Please Enter all fields values"
  }
  
}
devicedetails: any=[];

ngOnInit(): void {
  this.auth.onGetDeviceTypes().subscribe(response=>
    {console.log("responceeeeeeeee",response),
    this.devicedetails = response},
    error=>
    console.log(error) )
}


onClose(){
  this.dialogRef.close()
}
openDeviceMap(){
  this.openMap = !this.openMap
  this.initMap();
  if (this.openMap) {
    this.location = null; // Reset location when opening the map
    this.zoomin = 4;
  }
}


 initMap(): void {
  this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center: { lat: 0, lng: 0},
    zoom: 8
  });
}


searchByCity() {
  const city = this.city.trim(); // Access the city property here
  console.log("city name", city);

  if (!city) return;
  
  // this.location = { city };
  // this.zoomin = 10;
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: city }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results && results.length) {
      const location = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      };
      this.location = location;
      this.zoomin = 10;
      this.marklocation = location; // Mark the searched location
    } else {
      console.error('Geocode was not successful for the following reason:', status);
    }
  });
}
onMapClick(event: google.maps.MapMouseEvent) {
  const latLng = event.latLng;
  if (latLng) {
    const clickedLocation = [
      latLng.lat(),
      latLng.lng()
    ];
    this.deviceLocation = clickedLocation;
     
    console.log('Clicked Location:', clickedLocation);
  } else {
    console.error('LatLng is null.');
  }
}

onDeviceTypeChange(e:any){
  // console.log("dropdown=",this.selectdevice);
  this.selectdevice = e.target.value;
  console.log("dropdown=",this.selectdevice);
}
}

