import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register-one',
  templateUrl: './register-one.component.html',
  styleUrls: ['./register-one.component.css']
})
export class RegisterOneComponent {
  fullname:any;

  counter: number = 1; // Default quantity





constructor(private router: Router,private registerserver:DataSharingService, private auth:AuthenticationService) {

this.fullname=registerserver.getFullname()

 }




devicedetails:any;
optionsCategory =[];



ngOnInit(): void {

  
  this.auth.onGetDeviceTypes().subscribe(response=>
  {console.log(response),
  this.devicedetails = response
  this.optionsCategory = this.devicedetails.results.map((item: any) =>item[0]);
  console.log(this.optionsCategory)
  },
  error=>
  console.log(error) )

}














// Initialize an array of counters with an initial value

counters: number[] = [1];



// Function to increment a counter

increment(index: number) {

this.selectItemsAndCounters[index].count++;

}



decrement(index: number) {

if (this.selectItemsAndCounters[index].count > 1) {

  this.selectItemsAndCounters[index].count--;

}

}











selectItems: { value: any}[] = [{ value: '' }];

selectItemsAndCounters: { value: string; count: number }[] = [{ value: '', count: 1 }];





addSelectItem() {

this.selectItemsAndCounters.push({ value: '', count: 1 });

console.log( this.selectItemsAndCounters)



}






errorMsg:any;
onMobileNext(){

  const length= this.selectItemsAndCounters.length;

  let count = 0;

  for (let i =0; i<length; i++){
    if (this.selectItemsAndCounters[i].value !==''){
      count  = count+1;
    }
  }

  if (count === length){
    
  this.router.navigate(['/register-two']);

  this.registerserver.setCategorySelect({...this.fullname,devicedetails:[...this.selectItemsAndCounters]})
  }


else{
  this.errorMsg = '*Please Enter all Field Values!'
}


}

}
