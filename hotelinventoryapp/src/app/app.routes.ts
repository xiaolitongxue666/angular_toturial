import { Routes } from '@angular/router';
import { EmployeeComponent } from "./employee/employee.component";
import { RoomsComponent } from "./rooms/rooms.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { RoomsBookingComponent } from "./rooms/rooms-booking/rooms-booking.component";
import { RoomsAddComponent } from "./rooms/rooms-add/rooms-add.component";
import { loginCanActivateGuard } from './guards/login-can-activate.guard';
import { loginCanMatchGuard } from './guards/login-can-match.guard';
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent, canActivate: [loginCanActivateGuard] }, // 需要登录
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivate: [loginCanActivateGuard], // 需要登录
    children: [
      {
        path: 'add',
        loadComponent: () => import('./rooms/rooms-add/rooms-add.component').then(m => m.RoomsAddComponent),
        // canActivate: [loginCanActivateGuard] // 需要登录
        data: { role: 'super_admin' },
        canMatch: [loginCanMatchGuard]
      },
      // { path: ':id', component: RoomsBookingComponent, canActivate: [loginCanActivateGuard] } // 需要登录
    ]
  },
  { path: 'rooms/:id', component: RoomsBookingComponent, canActivate: [loginCanActivateGuard] }, // 需要登录
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // 默认路由
  { path: '**', component: NotfoundComponent } // 404 路由
];
