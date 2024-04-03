import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  first: string="";
  last: string="";
  errorMsg: string="";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth:AuthenticationService, private dialogRef : MatDialogRef<EditUserComponent>) { 
    this.first = data[0].split(' ')[0];
    this.last = data[0].split(' ')[1];
    
  }
  
  onClose(){
    this.dialogRef.close()
  }

  
  onEditDetails():void{
    this.errorMsg= ""
    
    this.data[0] = this.first+ " "+ this.last
    

    if (this.data[0].split(' ')[1] !== '' && this.data[0].split(' ')[0] !== '' && this.data[2] !== '' && this.data[3]!== '' ){
      console.log(this.data)
      this.auth.editUserData(this.data).subscribe((response)=>
      console.log(response),
      error=>
      console.log(error))
      window.location.reload()
      this.dialogRef.close();
    }
    else{
      this.errorMsg = "*Please Enter all Fields";
    }

  }


}
