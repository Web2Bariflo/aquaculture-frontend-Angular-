import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-delete-assign-controls',
  templateUrl: './delete-assign-controls.component.html',
  styleUrls: ['./delete-assign-controls.component.css']
})
export class DeleteAssignControlsComponent {
  indexData:any;

  DeviceTypeStore:any;
  constructor(@Inject(MAT_DIALOG_DATA)  public data:any,private ts:DataSharingService,private dialogRef:MatDialogRef<DeleteAssignControlsComponent>) { 
    
    this.indexData=data
    // console.log(this.addDeleteData)
    
  }

    confirmDeviceControl(){

     this.ts.deletecontrol(this.indexData)
     this.dialogRef.close();

  
  }


  closeDeviceControlCard(){
    this.dialogRef.close();

  }
  
}


