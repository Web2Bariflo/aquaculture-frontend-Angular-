import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActionComponent } from './action/action.component';
import { UsersComponent } from './users/users.component';
import { Action1Component } from './users/action/action1/action1.component';
import { SettingsComponent } from './settings/settings.component';
import { Action2Component } from './settings/action2/action2/action2.component';
import { Edit5Component } from './action/edit5/edit5/edit5.component';
import { StatComponent } from './action/statistics/stat/stat.component';
import { NewdevicesComponent } from './newdevices/newdevices.component';
import { AccountDevicesComponent } from './account-devices/account-devices.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { AdminNewDeviceComponent } from './admin-new-device/admin-new-device.component';
import { AdminDeviceTypesComponent } from './admin-device-types/admin-device-types.component';
import { AdminCreateNewDeviceComponent } from './admin-create-new-device/admin-create-new-device.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { UserAccountDevicesComponent } from './user-account-devices/user-account-devices.component';
import { UserNewDeviceComponent } from './user-new-device/user-new-device.component';
import { DeviceAssignControlsComponent } from './device-assign-controls/device-assign-controls.component';
import { DeviceStatsComponent } from './device-stats/device-stats.component';

import { GeneralUsersComponent } from './general-users/general-users.component';
import { MqttDeviceComponent } from './mqtt-device/mqtt-device.component';
import { GeneralUserStatsComponent } from './general-user-stats/general-user-stats.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UsersCheckComponent } from './users-check/users-check.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginPasswordComponent } from './login-password/login-password.component';
import { ForgotCheckComponent } from './forgot-check/forgot-check.component';
import { SuperDashboardComponent } from './super-dashboard/super-dashboard.component';
import { SuperParameterComponent } from './super-parameter/super-parameter.component';
import { GeneralUserCreateComponent } from './general-user-create/general-user-create.component';
import { UsersVerifyComponent } from './users-verify/users-verify.component';
import { GeneralDashboardComponent } from './general-dashboard/general-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { RegisterOneComponent } from './register-one/register-one.component';
import { RegisterTwoComponent } from './register-two/register-two.component';
import { RegisterThreeComponent } from './register-three/register-three.component';
import { RegisterFourComponent } from './register-four/register-four.component';
import { ForgotEmailCheckComponent } from './forgot-email-check/forgot-email-check.component';
import { ForgotEmailComponent } from './forgot-email/forgot-email.component';
import { AdminDeviceStatsComponent } from './admin-device-stats/admin-device-stats.component';
import { PasswordSuccessComponent } from './password-success/password-success.component';
import { DeviceGraphStatComponent } from './device-graph-stat/device-graph-stat.component';
import { GeneralUserGraphComponent } from './general-user-graph/general-user-graph.component';
import { NgxGraphComponent } from './ngx-graph/ngx-graph.component';
import { NgxUserGraphComponent } from './ngx-user-graph/ngx-user-graph.component';
import { PondsGraphComponent } from './ponds-graph/ponds-graph.component';
import { NgxPrintingComponent } from './ngx-printing/ngx-printing.component';
import { NgxDynamicComponent } from './ngx-dynamic/ngx-dynamic.component';
import { DemoLoginComponent } from './demo-login/demo-login.component';
import { NgxLiveComponent } from './ngx-live/ngx-live.component';
import { TokenVerifyComponent } from './token-verify/token-verify.component';
import { AuthGuard } from './auth.guard';
import { OcrCodeComponent } from './ocr-code/ocr-code.component';
import { ThermalComponent } from './thermal/thermal.component';
import { WaterPageComponent } from './water-page/water-page.component';
import { WaterGraphComponent } from './water-graph/water-graph.component';
import { AdminOcrComponent } from './admin-ocr/admin-ocr.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



const routes: Routes = [
  {path:"", redirectTo:'/login', pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]
},
{path:'verify-token', component:TokenVerifyComponent},
  {
    path: 'dashboard-dialog',
    loadChildren: () => import('./dashboard/dashboard-dialog.module').then(m => m.DashboardDialogModule),
  },
  {path:'action',component:ActionComponent, canActivate:[AuthGuard]},
  {path:'users',component:UsersComponent, canActivate:[AuthGuard]},
  {path:'action1',component:Action1Component, canActivate:[AuthGuard]},
  {path:'settings',component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'action2',component:Action2Component, canActivate:[AuthGuard]},
  {path:'edit5',component:Edit5Component, canActivate:[AuthGuard]},
  {path:'stat',component:StatComponent, canActivate:[AuthGuard]},
  {path: 'newdevices', component: NewdevicesComponent, canActivate:[AuthGuard] },
  {path: 'account-devices', component:AccountDevicesComponent, canActivate:[AuthGuard]},
  {path: 'admin-users', component: AdminUsersComponent, canActivate:[AuthGuard]},
  {path: 'user-permissions', component: UserPermissionsComponent, canActivate:[AuthGuard]},
  {path: 'admin-new-device', component: AdminNewDeviceComponent, canActivate:[AuthGuard]},
  {path: 'admin-device-types', component: AdminDeviceTypesComponent, canActivate:[AuthGuard]},
  {path: 'admin-create-new-device', component:AdminCreateNewDeviceComponent, canActivate:[AuthGuard]},
  {path: 'user-accounts', component:UserAccountsComponent, canActivate:[AuthGuard]},
  {path: 'user-account-devices', component: UserAccountDevicesComponent, canActivate:[AuthGuard]},
  {path: 'user-new-device', component:UserNewDeviceComponent, canActivate:[AuthGuard]},
  {path: 'device-assign-controls', component:DeviceAssignControlsComponent, canActivate:[AuthGuard]},
  {path: 'device-stats', component:DeviceStatsComponent, canActivate:[AuthGuard]},
  {path: 'general-users', component:GeneralUsersComponent, canActivate:[AuthGuard]},
  {path: 'mqtt-device', component:MqttDeviceComponent, canActivate:[AuthGuard]},
  {path: 'general-user-stats', component:GeneralUserStatsComponent, canActivate:[AuthGuard]},
  {path: 'register-page', component: RegisterPageComponent, canActivate:[AuthGuard]
  // pathMatch: 'full',
  // children: [
  //   {
  //     path: '',
  //     component: RegisterPageComponent
  //   },
  //   {
  //     path: '',
  //     component: RegisterPageComponent
  //    // Optional: Use an AuthGuard if needed
  //   },
  // ],
},
  {path:'profile-page', component: ProfilePageComponent, canActivate:[AuthGuard]},
  {path:'users-check', component:UsersCheckComponent, canActivate:[AuthGuard]},
  {path:'super-admin', component:SuperAdminComponent, canActivate:[AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'login-password', component: LoginPasswordComponent},
  {path: 'forgot-check', component:ForgotCheckComponent},
  {path: 'super-dashboard',component:SuperDashboardComponent, canActivate:[AuthGuard]},
  {path:'super-parameter', component:SuperParameterComponent, canActivate:[AuthGuard]},
  {path:'general-user-create', component:GeneralUserCreateComponent, canActivate:[AuthGuard]},
  {path:'users-verify', component:UsersVerifyComponent, canActivate:[AuthGuard]},
  {path:'general-dashboard', component:GeneralDashboardComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterComponent, canActivate:[AuthGuard]},
  {path:'register-one', component:RegisterOneComponent, canActivate:[AuthGuard]},
  {path:'register-two', component:RegisterTwoComponent, canActivate:[AuthGuard]},
  {path:'register-three', component:RegisterThreeComponent, canActivate:[AuthGuard]},
  {path:'register-four', component:RegisterFourComponent, canActivate:[AuthGuard]},
  {path:'forgot-email',component:ForgotEmailComponent},
  {path:'forgot-email-check', component:ForgotEmailCheckComponent},
  {path:'admin-device-stats', component:AdminDeviceStatsComponent, canActivate:[AuthGuard]},
  {path:'password-success', component:PasswordSuccessComponent, canActivate:[AuthGuard]},
  {path:'device-graph-stat', component: DeviceGraphStatComponent, canActivate:[AuthGuard]},
  {path:'general-user-graph', component:GeneralUserGraphComponent, canActivate:[AuthGuard]},
  {path:'ngx-graph', component:NgxGraphComponent, canActivate:[AuthGuard]},
  {path:'ngx-user-graph', component:NgxUserGraphComponent, canActivate:[AuthGuard]},
  {path:'ponds-graph', component:PondsGraphComponent, canActivate:[AuthGuard]},
  {path:'ngx-printing', component:NgxPrintingComponent, canActivate:[AuthGuard]},
  {path:'ngx-dynamic', component:NgxDynamicComponent, canActivate:[AuthGuard]},
  {path:'demo-login', component:DemoLoginComponent, canActivate:[AuthGuard]},
  {path:'ngx-live', component:NgxLiveComponent, canActivate:[AuthGuard]},
    
  {path:'ocr-code', component:OcrCodeComponent,canActivate:[AuthGuard]},
{path:'thermal', component:ThermalComponent},
{path:'water-page', component:WaterPageComponent},
// {path:'water-pa', component:WaterPageComponent},
{path:'water-graph', component:WaterGraphComponent},
{path:'admin-ocr', component:AdminOcrComponent},
{path:'nav', component:NavBarComponent},


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
