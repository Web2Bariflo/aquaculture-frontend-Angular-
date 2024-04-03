import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DashboardComponent } from "./dashboard.component";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";
import { DashboardDialogModule } from "./dashboard-dialog.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatExpansionModule } from '@angular/material/expansion';





@NgModule({
    declarations: [DashboardComponent],
    imports: [
      CommonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatToolbarModule,
      DashboardDialogModule,
      MatSidenavModule,
      MatIconModule,
      MatMenuModule,
      MatListModule,
      NgbModule,
       DashboardRoutingModule,
      RouterModule.forChild([
        {
          path: 'dashboard', // Add your desired path here
          component: DashboardComponent,
          children: [
            {
              path: 'dashboardDialog', // Nested path for the "CardModule"
              loadChildren: () =>
                import('./dashboard-dialog.module').then((m) => m.DashboardDialogModule),
            },
          ],
        },
      ]),
    ],
    exports: [
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
      ],
    // Other declarations, providers, etc...
  })
  export class DashboardModule { }