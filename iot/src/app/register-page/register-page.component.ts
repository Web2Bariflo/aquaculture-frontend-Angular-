import { Component,ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation: ViewEncapsulation.None  //
})
export class RegisterPageComponent {
  user: any = {}; // This object will hold the user's registration data
  dob: string = '';
  adhaarFile: File | null = null;
  panFile: File | null = null;
  landFile: File | null = null;
  
  selectCategory:any;
  counter: number = 1; // Default quantity

  devicedetails:any;
  optionsCategory =['Aqua','water','3d Printing'];
  counters: number[] = [1];
  pondsCount=1;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  numberFormControl = new FormControl(null, [Validators.required, Validators.pattern(/^\d{10}$/)]);

  aadharFormControl =  new FormControl(null, [Validators.required, Validators.pattern(/^\d{12}$/)]);

  firstFormControl =  new FormControl(null, [Validators.required])
  lastFormControl =  new FormControl(null, [Validators.required])
  accountFormControl =  new FormControl(null, [Validators.required])

  pondFormControl =  new FormControl(null, [Validators.required])
  districtFormControl =  new FormControl(null, [Validators.required])


  firstname:any;
  lastname:any;
  mobileno:any;
  aadharno:any;
    email:any;
  accountname:any;
  pondname:any;
  districtname:any;
  
  matcher = new MyErrorStateMatcher();

  onFileSelected(event: any) {
    this.adhaarFile = event.target.files[0];
  }

  onLandSelected(event: any) {
    this.landFile = event.target.files[0];
  }

  onPanSelected(event: any) {
    this.panFile = event.target.files[0];
  }

  onSubmit() {
    // Handle the registration logic here, e.g., send a POST request to your server
    console.log('Registration data:', this.user);

    if (this.adhaarFile) {
      // Upload the file here using a service or an HTTP request
    }
  }

  
  increment(index: number) {
  
  this.selectItemsAndCounters[index].count++;
  
  }
  
  
  
  decrement(index: number) {
  
  if (this.selectItemsAndCounters[index].count > 1) {
  
    this.selectItemsAndCounters[index].count--;
  
  }
  
  }


  pondsInc(){
   

    this.pondsCount++;
  } 

  pondsDec(){
    if (this.pondsCount>1){
      this.pondsCount--;
    }
   
  }
  
  
  
  selectItems: { value: any}[] = [{ value: '' }];
  
  selectItemsAndCounters: { value: string; count: number }[] = [];
  
  
  check()
  {
    console.log(this.selectCategory)
  }
  
  addSelectItem() {
    // this.selectItemsAndCounters.splice(1, 0);
  
  this.selectItemsAndCounters.push({ value: '', count: 1 });
  
  console.log( this.selectItemsAndCounters)
  
  
  
  }
  
  onRemove(index:any){
    this.selectItemsAndCounters.splice(index, 1);
  }
  
  
  onMobileNext(){
  
    const length= this.selectItemsAndCounters.length;
  
    let count = 0;
  
    for (let i =0; i<length; i++){
      if (this.selectItemsAndCounters[i].value !==''){
        count  = count+1;
      }
    }
  

  
  
  }
  
}
