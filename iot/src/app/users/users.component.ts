import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewusersComponent } from './new-users/newusers/newusers.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  events: string[] = [];
  opened: boolean = false;
  shouldRun: boolean = true;
  accountId: string[] = [];
  accountName: string[] = [];
 

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog2(): void {
    const dialogRef = this.dialog.open(NewusersComponent, {
      width: '480px',
      data: { accountId: this.accountId, accountName: this.accountName },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.accountId = result;
      this.accountName = result;
      
    });

    
    
  }

  openDialog3(): void {
    const dialogRef = this.dialog.open(NewusersComponent, {
      width: '480px',
      data: { accountId: this.accountId, accountName: this.accountName },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.accountId = result;
      this.accountName = result;
      
    });

    
    
  }

  onLogout():void{
    this.router.navigate(['./login'])

  }

  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

  onClick1(): void {
    this.router.navigate(['./action1']);
  }

  onLogout1():void{
    this.router.navigate(['/login'])

  }

}
