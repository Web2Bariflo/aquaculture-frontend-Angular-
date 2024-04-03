import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-edit5',
  templateUrl: './edit5.component.html',
  styleUrls: ['./edit5.component.css']
})
export class Edit5Component implements OnInit {

  devicename = "";
  devicetype = "";
  deviceId = "";


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialog:MatDialog,private auth : AuthenticationService,private dialogRef : MatDialogRef<Edit5Component>){
    this.devicename = data[1],
    this.devicetype = data[2],
    this.deviceId = data[0]
  }

  errorMsg ="";
  onEditDevice(){
    if (this.devicename!== "" && this.devicetype !==""){
      const devicedetails = {deviceid: this.deviceId, newdevicename: this.devicename, newdevicetype: this.devicetype}
    this.auth.onClickEditDevices(devicedetails).subscribe(response =>
      console.log(response),
      error => 
      console.log(error))
      window.location.reload()
      this.dialogRef.close()
    }

    else{
      this.errorMsg = "*Please Enter all Field values"
    }


    
  }
  devicedetails: any=[];

ngOnInit(): void {
  this.auth.onGetDeviceTypes().subscribe(response=>
    {console.log(response),
    this.devicedetails = response},
    error=>
    console.log(error) )
}
onClose(){
  this.dialogRef.close()
}

}
