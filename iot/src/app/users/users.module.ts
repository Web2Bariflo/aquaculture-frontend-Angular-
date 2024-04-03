import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './users.component';
import {MatSelectModule} from '@angular/material/select';
import { Action1Component } from './action/action1/action1.component';

@NgModule({
    declarations: [], //Action1Component,UsersComponent
    imports: [CommonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule
  ],
  })
  export class CardModule {}