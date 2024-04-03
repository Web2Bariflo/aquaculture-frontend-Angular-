import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Edit4Component } from './edit4/edit4/edit4.component';
import { DialogContentComponent } from '../../../dialog-content/dialog-content.component'; // Provide the correct path
import { DialogContent1Component } from '../../../dialog-content1/dialog-content1.component';
import { DialogContent2Component } from 'src/app/dialog-content2/dialog-content2.component';
import { DialogContent3Component } from 'src/app/dialog-content3/dialog-content3.component';
import { Router } from '@angular/router';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-action2',
  templateUrl: './action2.component.html',
  styleUrls: ['./action2.component.css']
})
export class Action2Component {
 
  opened: boolean = false;
  accountId: string[] = [];
  accountName: string[] = [];


 constructor(public dialog: MatDialog, private router:Router){}

  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    
  };

  
  /*openDialog6(): void {
    const dialogRef = this.dialog.open(Edit4Component, {
      width: '480px',
      data: { accountId: this.accountId, accountName: this.accountName },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.accountId = result;
      this.accountName = result;
      
    });
*/

openDialog(): void {
  const dialogRef = this.dialog.open(DialogContentComponent, {
    width: '600px', // Set the desired width
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}

openDialog1(): void {
  const dialogRef = this.dialog.open(DialogContent1Component, {
    width: '700px', // Set the desired width
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}

openDialog2(): void {
  const dialogRef = this.dialog.open(DialogContent2Component, {
    width: '500px', // Set the desired width
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}

openDialog3(): void {
  const dialogRef = this.dialog.open(DialogContent3Component, {
    width: '500px', // Set the desired width
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed:', result);
  });
}

onLogout():void{
  this.router.navigate(['./login'])

}

onLogout1():void{
  this.router.navigate(['/login'])
  console.log("nn")

}
}
