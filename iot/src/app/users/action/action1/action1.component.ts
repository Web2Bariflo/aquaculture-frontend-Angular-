import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-action1',
  templateUrl: './action1.component.html',
  styleUrls: ['./action1.component.css']
})
export class Action1Component {

  constructor(private router:Router){}
  
  opened: boolean = false;

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
  onLogout():void{
    this.router.navigate(['./login'])

  }
  onLogout1():void{
    this.router.navigate(['/login'])

  }
}
