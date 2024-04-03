import { Component, ElementRef, OnInit,Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardComponent } from '../dashboard/card/card/card.component';
import { EditComponent } from '../dashboard/edit/edit.component';
import { Edit3Component } from './edit3/edit3/edit3.component';
import { DeviceEditComponent } from '../device-edit/device-edit.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  opened: boolean = false;
  version:number  = 0;
  name: string[] = [];
  accountName: string[] =[];
  accountId : string[] =[];
  enable: boolean = true;
 

  constructor(public dialog: MatDialog, private router: Router, private renderer: Renderer2, private el:ElementRef) {}

  onClick3():void{
    this.router.navigate(['./action2']);
  }


  openDialog5(): void {
    const dialogRef = this.dialog.open(Edit3Component, {
      width: '400px',
      data: { accountId: this.accountId, accountName: this.accountName },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.accountId = result;
      this.accountName = result;
      
    });

    
    
  }

  onEditDevice(): void {
    const dialogRef = this.dialog.open(DeviceEditComponent, {
      width: '400px',
      data: { name:this.name, version: this.version , enable: this.enable },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      
    });

    
    
  }

  onLogout():void{
    this.router.navigate(['./login'])

  }
  onLogout1():void{
    this.router.navigate(['/login'])

  }
 
  subMenuStates: { [key: string]: boolean } = {};

  toggleSubMenu(subMenuKey: string): void {
    this.subMenuStates[subMenuKey] = !this.subMenuStates[subMenuKey];
  }

  isSubMenuOpen(subMenuKey: string): boolean {
    return this.subMenuStates[subMenuKey] || false;
  }
 
  ngOnInit(): void {

    const table = this.el.nativeElement.querySelector('#data-table');

    this.renderer.listen(table, 'click', (event)=>{
      const target = event.target;

      if (target.tagName === 'TD'){
        const row =  target.closest('tr');
        const cells = row.cells;
        const name = cells[0].textContent;
        const age = cells[1].textContent;
        console.log(`name:${name} age:${age}`);
      }
    })
    
  }



}
