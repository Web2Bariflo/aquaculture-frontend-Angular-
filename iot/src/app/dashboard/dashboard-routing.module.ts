import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDialogComponent } from './dashboard-dialog.component';
import { DashboardComponent } from './dashboard.component';
import { ActionComponent } from '../action/action.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dialog',
        component: DashboardDialogComponent,
      },
      {
        path: 'card', // Add a new route for the dialog component
        loadChildren: () => import('./card/card/card.module').then(m => m.CardModule),
        data: { dialog: true }, // Add data to identify this route as a dialog
      },
      {path:'action',component:ActionComponent},
      {
        path: 'edit', // Add a new route for the dialog component
        loadChildren: () => import('./edit/edit.module').then(m => m.EditModule),
        data: { dialog: true }, // Add data to identify this route as a dialog
      },
      
      
 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
