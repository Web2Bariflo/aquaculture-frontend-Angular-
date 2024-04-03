import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataSharingService } from '../data-sharing.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  mobileno: any;
  password: any;
  hero: any;
  users:any;
  headers:any;
  errorMsg:boolean= false;

  constructor(private router:Router,private snackBar: MatSnackBar, private formBuilder: FormBuilder,private authService: AuthenticationService, private http:HttpClient, private dataSharingService: DataSharingService){
      this.loginForm=this.formBuilder.group({
        mobileno:['',[Validators.required]],
        password:['',[Validators.required]]
      })
 
  }
  ngOnInit(): void {
  }
  // getcsrf(){
  //   this.http.get("http://192.168.0.113:8000/get_csrf/").subscribe(
  //   (res) => {this.users=res;
  //             const csrfToken=this.users.csrf_token;
  //             console.log(csrfToken)
  //             this.headers = new HttpHeaders(
  //                          {'Content-Type':'application/json',
  //                           'X-CSRFToken':csrfToken,
  //                          });
  // })
  // console.log(this.headers)
  // return this.headers;
  // }

  value: string = 'hello';
  error=''

  updateValue(newValue: string): void {
    this.value = newValue;
  }

  onBlur(): void {
    this.value = 'Noooo';
  }

  onMobileNext(){
    this.error = ''
    if (this.mobileno === undefined){
     this.error = "*Please Enter Mobile No or Gmail Id!"
    }
    else{
      console.log(this.mobileno);
      this.router.navigate(['./login-password'])
      this.dataSharingService.onSendLogMob(this.mobileno);
    }
   
  }

  onSubmit(){
         /* console.log(this.getcsrf());
          this.http.post("http://192.168.0.113:8000/login/",this.loginForm.value,{headers:this.headers}).subscribe(
                   (res)=>{console.log(res);
                           this.router.navigate(['dashboard'])})
            */
                           if (this.loginForm.valid) {
                            const { mobileno, password } = this.loginForm.value;
                            this.authService.login(mobileno, password)
                              .subscribe(response => {
                                console.log(response)
                                // Handle successful login and navigation
                                if (response.message === "Login Successful For Admin"){
                                  localStorage.setItem('logMob',JSON.stringify(mobileno))
                                  this.dataSharingService.loginSetMob(mobileno)
                                  console.log(response);
                                  this.router.navigate(['./admin-users'])
                                  this.errorMsg = false;
                                  const userName = response.username
                                  const UserDataSet = {userName}
                                  localStorage.setItem('userData',JSON.stringify(UserDataSet))

                                }
                                else if (response.message==="Login Successful For General User"){
                                  localStorage.setItem('logMob',JSON.stringify(mobileno))
                                  this.router.navigate(['./general-dashboard'])
                                  this.errorMsg = false;
                                  console.log(this.loginForm.value)
                                  this.dataSharingService.setData(mobileno)
                                  const userName=response.username
                                  const UserDataSet={mobileno,userName}
                                  localStorage.setItem('userData',JSON.stringify(UserDataSet))
                                  
                                }
                                else{
                                  // localStorage.setItem('logMob',JSON.stringify(mobileno))
                                  // this.dataSharingService.loginSetMob(mobileno)
                                  // this.router.navigate(['./dashboard'])
                                  this.router.navigate(['./login'])
                                  this.errorMsg = true;
                                }
                               
                              },
                              error => {
                                // Handle login error
                                console.log(error);
                              });
                          }
          }
  
 
 /* private showSnackbarAlert(message: string): void{
    this.snackBar.open(message, 'close', {duration: 3000,});
  }
*/


  

}
