import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Edit5Component } from './edit5/edit5/edit5.component';
import { StatComponent } from './statistics/stat/stat.component';


@NgModule({
    declarations: [ Edit5Component,], // CardComponent is declared here //ActionComponent,
    imports: [CommonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatToolbarModule,
      MatSidenavModule,
  ],
  })
  export class CardModule {}