import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Edit3Component } from './edit3/edit3/edit3.component';
import { Action2Component } from './action2/action2/action2.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [Edit3Component], //Action2Component
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
  ]
})
export class SettingsModule { }
