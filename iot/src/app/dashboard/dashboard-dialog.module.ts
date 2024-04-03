import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'; // Add this line
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardDialogComponent } from './dashboard-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule, // Add this line
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
        {
          path: '', // Use an empty path to match the default route of the module
          component: DashboardDialogComponent,
          children: [
            {
              path: 'card', // Nested path for the "CardModule"
              loadChildren: () =>
                import('./card/card/card.module').then((m) => m.CardModule),
            },
            {
              path: 'edit', // Nested path for the "CardModule"
              loadChildren: () =>
                import('./edit/edit.module').then((m) => m.EditModule),
            },
          ],
        },
      ]),
  ],
})
export class DashboardDialogModule {}