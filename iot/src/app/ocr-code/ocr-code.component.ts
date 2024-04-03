import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadSuccessComponent } from '../upload-success/upload-success.component';

@Component({
  selector: 'app-ocr-code',
  templateUrl: './ocr-code.component.html',
  styleUrls: ['./ocr-code.component.css']
})
export class OcrCodeComponent implements OnInit{
  resultData: any;
  opened: boolean= true;
  userStoreData:any;
  userNameProfile:any;
  selectedImage: string | ArrayBuffer | null = './assets/img/OIP.jpg';
  constructor(private ocrService: FileService, private auth:AuthenticationService, private dialog:MatDialog) {}
  file:any;
  translateData:any;
  adminMob:any;
ngOnInit(): void {
  this.userStoreData=localStorage.getItem('userData')
  const userDataObject = JSON.parse(this.userStoreData);
  this.userNameProfile=userDataObject.userName
}

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
 

// handleFileSelect(event: any): void {
    
//   this.file = event.target.files[0];
//   if (this.file) {
//     this.ocrService.processImage(this.file).subscribe(
//       (data) => {
//         this.resultData = data;
//         console.log(this.resultData)
//         this.listOfParamVal =[];
//         this.transponseList=[];
//         this.extractData(data);
//       },
//       (error) => {
//         console.error('Error:', error);
//         this.resultData = { error: 'Failed to process image.' };
//       }
//     );
//   }
// }


  processImage(event:any): void {
    event.preventDefault()
    
   
  }

  
//  transposeArray(array: any[][]): any[][] {
//   return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
// }
//   listOfParamVal: string[][] = [];

//   transponseList:any;
//   extractData(resultData: any): void {
//     const pData = resultData["regions"];

//     for (const each of pData) {
//         const list: string[] = [];

//         for (const eachLine of each["lines"]) {
//             const wordArr = eachLine["words"];
//             let word = "";

//             for (const t of wordArr) {
//                 word += t["text"];
//             }

//             list.push(word);
//         }

//         this.listOfParamVal.push(list);
//     }

    
//     console.log('listOfParamVal',this.listOfParamVal);

//     this.transponseList = this.transposeArray(this.listOfParamVal)

//     console.log('transponse',this.transponseList);

 
// }


onLogout():void{
  window.location.href = 'http://aqua.bariflorobotics.com/login'
  localStorage.removeItem('token')

}
onLogout1():void{
  window.location.href = 'http://aqua.bariflorobotics.com/login'

  localStorage.removeItem('token')
}




}
