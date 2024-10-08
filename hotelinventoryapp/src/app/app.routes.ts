import { Routes } from '@angular/router';
import { EmployeeComponent } from "./employee/employee.component";
import { RoomsComponent } from "./rooms/rooms.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { RoomsBookingComponent } from "./rooms/rooms-booking/rooms-booking.component";
import { RoomsAddComponent } from "./rooms/rooms-add/rooms-add.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  {
    path: 'rooms',
    component: RoomsComponent,
    children: [
      { path: 'add', component: RoomsAddComponent },
      { path: ':id', component: RoomsBookingComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //default route
  { path: '**', component: NotfoundComponent } // 404 route
];
