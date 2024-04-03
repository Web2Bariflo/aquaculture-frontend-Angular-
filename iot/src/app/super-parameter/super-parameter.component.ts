import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-super-parameter',
  templateUrl: './super-parameter.component.html',
  styleUrls: ['./super-parameter.component.css']
})
export class SuperParameterComponent {
  opened: boolean = true;
  constructor(private router:Router){}

  onLogout():void{
    this.router.navigate(['/login'])


  }
  onLogout1():void{
    this.router.navigate(['/login'])


  }

  userData:any =[]
userStoreData:any;
userNameProfile:any;

  ngOnInit(): void {
    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
     
    
    
    
      
  }
}
