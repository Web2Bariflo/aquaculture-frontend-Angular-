import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';
import { UserAcceptTwoComponent } from '../user-accept-two/user-accept-two.component';
import { NoviewAccountComponent } from '../noview-account/noview-account.component';
import { NoviewDeleteComponent } from '../noview-delete/noview-delete.component';

@Component({
  selector: 'app-useraccept-create-pond',
  templateUrl: './useraccept-create-pond.component.html',
  styleUrls: ['./useraccept-create-pond.component.css']
})


// MatDialogRef
export class UseracceptCreatePondComponent {
  cityIdUser: any;
  registerDetails: any;
  accountName: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<UserAcceptTwoComponent>, private dataSharingService: DataSharingService, private auth: AuthenticationService, private router: Router) {
    // this.cityIdUser= data
    // console.log('cidtyid',  this.cityIdUser)

    this.registerDetails = this.dataSharingService.getRegisterDetails();
    this.accountName = this.registerDetails[3].accountname;
    this.mobileno = this.registerDetails[1]
    console.log(this.registerDetails);
  }
  accountId: any;
  cityname: any
  outputSuccess: any;
  location = { lat: 20.5937, lng: 78.9629 }
  zoomin = 4
  districtname: any;
  searchLatitude: any;
  searchLongitude: any;
  locationlive: any;
  mobileno: any;
  marklocation: any = false
  onAccounts() {
    //  this.router.navigate(['./adminmap'])

    const dialogbox = this.dialog.open(UserAcceptTwoComponent, {
      width: '500px',
      data: this.accountId,
    })
    this.dialogRef.close('Closed with a button click!');


  }
  userStoreData: any;
  userlocalcityid: any;
  searchLocation() {
    this.marklocation = true
    //     this.userStoreData=localStorage.getItem('cityid')
    // const userDataObject = JSON.parse(this.userStoreData);
    //    this.userlocalcityid=userDataObject

    this.location = { lat: this.searchLatitude, lng: this.searchLongitude };
    this.zoomin = 10; // Yo
    // this.getWeatherData(this.searchLatitude, this.searchLongitude);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: this.location }, (results: any, status) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        // Loop through address components to find the city
        const cityaddress = results[0].formatted_address;
        for (let i = 0; i < results[0].address_components.length; i++) {
          const component = results[0].address_components[i];
          for (let j = 0; j < component.types.length; j++) {
            if (component.types[j] === 'administrative_area_level_3') {
              //  const cityname = component.long_name;
              this.locationlive = {
                address: cityaddress,
                long: this.searchLongitude,
                lat: this.searchLatitude,
                accountname: this.accountName,
                //  city:this.districtname,
                //  usermob:this.MobilenoChange
                //  password:this.passwordtext
                usermobno: this.mobileno

              };
              console.log(this.locationlive);
              return; // Exit the loop when city is found
            }
          }





        }
      }
    });







  }

  onSubmitPond() {
    this.auth.onAdmincreateuserpond(this.locationlive).subscribe((response) => {

      console.log(response)
      this.accountId = response.accountid

      if (response.message === 'Account created') {
        const dialogRef = this.dialog.open(NoviewDeleteComponent, {
          width: '350px'

        });

      }
    })
  }




}