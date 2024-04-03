import { Component } from '@angular/core';
import { FileService } from '../file.service';
import { AuthenticationService } from '../authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadSuccessComponent } from '../upload-success/upload-success.component';
@Component({
  selector: 'app-user-ocr',
  templateUrl: './user-ocr.component.html',
  styleUrls: ['./user-ocr.component.css']
})
export class UserOcrComponent {
  adminMob:any;
  selectedImage: string | ArrayBuffer | null = './assets/img/OIP.jpg';
  constructor(private ocrService: FileService, private auth:AuthenticationService, private dialog:MatDialog, public matDialog: MatDialogRef<UserOcrComponent>) {}
  handleFileSelect(event:any){
    const file: File = event.target.files[0];
    const formData = new FormData();
      formData.append('image', file);
      this.adminMob =localStorage.getItem('logMob');
  
      formData.append('mobno',this.adminMob )
  
      // const ocrDetails = {mobno:parseInt(this.adminMob), image:formData}
  
      
      this.auth.onOcrImage(formData).subscribe((response)=>{
        console.log(response);
        if (response.message === 'Image Uploaded'){
          const dialogRef = this.dialog.open(UploadSuccessComponent,{
            width: '350px'
          })
        }
      }, error=>{
        console.log(error)
      })
    
  }
  processImage(event:any): void {
    event.preventDefault()
    
   
  }

  onClose(){
    this.matDialog.close();
  }

}
