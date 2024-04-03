import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
// import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})


// GoogleMapApiService
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true; // User is authenticated, allow access
    } else {
     window.location.href= 'http://aqua.bariflorobotics.com/login' // Redirect to login if not authenticated
    //  this.router.navigate(['/login']);
      return false; // Prevent access
    }
  }
}


// 'http://aqua.bariflorobotics.com/login'



// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


