import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
/// <reference lib="esnext" />
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  opened= true;

  constructor(private router:Router, private auth:AuthenticationService){}
  
  onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'

    localStorage.removeItem('token')
  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  
  user: any = {};
  userStoreData:any;
  userNameProfile:any;




  ngOnInit(): void {
    // const savedlogmob = localStorage.getItem('logMob');

    this.userStoreData=localStorage.getItem('userData')
 
  // console.log(this.userStoreData)
  const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
    console.log(this.userNameProfile)}

   
    documentsImage:string | ArrayBuffer | null = null;

    selectedImage: string | ArrayBuffer | null = './assets/img/profile-pic.png';



  
    selectedFiles: FileList | null = null;

  
   
  
    isPanValid: boolean | null = null;
  
    // onFilesSelected(event: any) {
    //   this.selectedFiles = event.target.files;
    // }
   // selectedImage: string | ArrayBuffer | null = './assets/img/profile2.png';


 
  
 
   uploadImage(event: Event) {
    event.preventDefault();
    let imageBlob: Blob | null = null; // Initialize imageBlob with a default value

    if (this.selectedImage) {
      if (this.selectedImage instanceof ArrayBuffer) {
        // If it's an ArrayBuffer, create a Blob from it
        imageBlob = new Blob([this.selectedImage]);
      } else if (typeof this.selectedImage === 'string') {
        // If it's a string, create a Blob from it
        imageBlob = new Blob([this.selectedImage], { type: 'image/*' }); // You may need to specify the MIME type
      }
  
      if (imageBlob) {
        const timestamp = new Date().getTime();
      const dynamicFilename = `profile_${timestamp}.png`;

        // Now, append the Blob to the FormData
        const formData = new FormData();
        formData.append('image', imageBlob, dynamicFilename);
            // Make an HTTP POST request to your API
        this.profileDetails.image = formData;
        console.log(formData.get('image'))
      }
    }
  }




 
 
  
 
   onFileSelectedProfile(event: any) {
 
     const file = event.target.files[0];
 
     console.log(event.target)
 
  
 
     if (file) {
 
       const reader = new FileReader();
 
  
 
       reader.onload = (e: any) => {
 
         this.selectedImage = e.target.result;
 
  
 
       };
 
  
 
       reader.readAsDataURL(file);
 
     }
 
   }
 
  
  
 
  
  // onFileSelected(event: any) {
  //   this.selectedFiles = event.target.files;

  //   // Add the selected files to the uploadedFiles array
  //   if (!this.profileDetails.formData) {
  //     this.profileDetails.formData = new FormData();
  //   }
  //   if(this.selectedFiles){
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       // Append each file to the FormData object with a unique key
  //       this.profileDetails.formData.append(`file${i}`, this.selectedFiles[i]);
  //     }}
  // }

  // onSubmit() {

  //   if (this.profileDetails.formData){
  //   this.profileDetails.formData.forEach((value, key) => {
  //       console.log('FormData Entry:', key, value);
  //     });}
  
  // }


 

 

 // Array to store uploaded PDF file names

 

 

  aadharNumber: string = '';

 

  isAadharValid: boolean | null = null;

 

  verifyAadhar() {

    // Regular expression to check if the input follows the format of 12 digits.

    const aadharPattern = /^[0-9]{12}$/;

   

    if (aadharPattern.test(this.aadharNumber)) {

      this.isAadharValid = true;

    } else {

      this.isAadharValid = false;

    }

  }

 

 

 

  activeTab: string = ''; // Track the active tab

 

  activateTab(tabName: string) {

    this.activeTab = tabName;

  }

 

 

  pan: string = '';

 

  isPANValid(pan: string): boolean {

    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    return panPattern.test(pan);

  }

 

 

  verifyPan(){

    if (this.isPANValid(this.pan)) {

      this.isPanValid = true;

 

      // PAN is valid, you can perform further actions here

    }

    else{

      this.isPanValid = false;

 

    }

  }

 

 

 

 

 

 

  uploadedFiles: { name: string; iconUrl: string; fileType: string; file:any}[] = [];

 

  onFileSelected(event: any) {

    const files: FileList = event.target.files;

    if (files && files.length > 0) {

      // Iterate through the selected files and add their names, URLs, and types to the array

      for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const newfilename=files[i];

        console.log(file)

        console.log(files)

        const fileType = file.type;

        const iconUrl = URL.createObjectURL(file);

 

       

 

        this.uploadedFiles.push({ name: file.name, iconUrl: iconUrl, fileType: fileType ,file:file});

      }

      console.log(this.uploadedFiles)

    }

  }

 

  isImage(fileName: string): boolean {

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    const fileExtension = fileName.toLowerCase().split('.').pop();

    return imageExtensions.includes('.' + fileExtension);

  }

 

  openFile(file: any) {

    const fileType = file.fileType;

    const fileUrl = file.iconUrl;

 

    if (fileType && fileType.includes('image')) {

      // If it's an image, open it in a new tab

      window.open(fileUrl, '_blank');

    } else if (fileType && fileType.includes('pdf')) {

      // If it's a PDF, open it in a new tab using Google Docs Viewer

      window.open('https://docs.google.com/viewer?url=' + fileUrl, '_blank');

    }

 

  }

 

  newDataSubmit:any;

  ProfileData:any={

   name:'',

   updatevalue:this.uploadedFiles

   

  }

 error='';

 async submit(){

  if (this.profileDetails.mobileno!==''&& this.profileDetails.aadharNumber!==''&& this.profileDetails.address!==''&& this.profileDetails.documents.length!==0 &&this.profileDetails.email!==''&& this.profileDetails.image!==null&& this.profileDetails.pan!==''){
    
  await this.auth.onProfileDetailsAdd(this.profileDetails).subscribe(response=>
    console.log(response), error=>console.log(error))
    


  }

  else{
    alert('* Please Enter all fields data!')
  }

   console.log(this.profileDetails)

   }

 

 
   onDashboard(){
    this.router.navigate(['./general-dashboard'])
   }
 

 

 

  deletefile(index:any){

    this.uploadedFiles.splice(index,1)

  }
 
  
  profileDetails: {
    mobileno: string;
    email: string;
    address: string;
    aadharNumber: string;
    pan: string;
    image: FormData | null;
    // uploadedFiles: { name: string; iconUrl: string; fileType: string }[] | null;
    documents:any;
  } = {
    mobileno: "",
    email: "",
    address: "",
    aadharNumber: "",
    pan: "",
    image: null,
    // uploadedFiles: [],
    documents: this.uploadedFiles // Initialize as an empty array
  };
  
}