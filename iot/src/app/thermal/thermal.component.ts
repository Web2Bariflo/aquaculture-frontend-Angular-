import { Component , OnInit} from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-thermal',
  templateUrl: './thermal.component.html',
  styleUrls: ['./thermal.component.css']
})
export class ThermalComponent implements OnInit{
  opened: boolean = true;
  userStoreData:any;
  userNameProfile:any;
  daysNumber:any;
adminMob:any;

  constructor(private auth:AuthenticationService){}

  ngOnInit(): void {
  

    this.userStoreData=localStorage.getItem('userData')
    const userDataObject = JSON.parse(this.userStoreData);
    this.userNameProfile=userDataObject.userName
  }

  subMenuStates: { [key: string]: boolean } = {};

thermalImages:any;
onLogout():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  onLogout1():void{
    window.location.href = 'http://aqua.bariflorobotics.com/login'
    localStorage.removeItem('token')

  }
  
  onSubmit():void{
    this.adminMob =localStorage.getItem('logMob');

    const imageDetails = {mobileno:parseInt(this.adminMob), days: parseInt(this.daysNumber)}
    this.auth.onThermalImage(imageDetails).subscribe((response)=>{
      console.log(response);
    this.thermalImages = response.message;
    }, error=>{
      console.log(error)
    })


    }
 
    onSelectChange(event:any){
      this.daysNumber= event.target.value;
    console.log('days',this.daysNumber)
    }
}
