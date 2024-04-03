import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-edit3',
  templateUrl: './edit3.component.html',
  styleUrls: ['./edit3.component.css']
})
export class Edit3Component {

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


}
