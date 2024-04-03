import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-success',
  templateUrl: './password-success.component.html',
  styleUrls: ['./password-success.component.css']
})
export class PasswordSuccessComponent {
  constructor(private router:Router){}

  onHome(){
    this.router.navigate(['./login'])
  }

}
