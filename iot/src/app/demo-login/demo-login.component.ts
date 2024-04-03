import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-demo-login',
  templateUrl: './demo-login.component.html',
  styleUrls: ['./demo-login.component.css']
})
export class DemoLoginComponent {

userInput:any;
password:any;
constructor(private auth:AuthenticationService){

}

  onLogin(){
    const userDetails = {username:this.userInput, password:parseInt(this.password)}
    this.auth.demoLogin(userDetails).subscribe((response)=>{
      console.log(response);
    }, (error)=>{
      console.log(error)
    })
  }
}
