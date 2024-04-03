import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-accept-success',
  templateUrl: './user-accept-success.component.html',
  styleUrls: ['./user-accept-success.component.css']
})
export class UserAcceptSuccessComponent {

  constructor(private dialogRef:MatDialogRef<UserAcceptSuccessComponent>){}

  onSuccess(){
    this.dialogRef.close();
    window.location.reload();
  }
}
