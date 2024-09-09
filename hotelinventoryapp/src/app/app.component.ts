import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {ContainerComponent} from "./container/container.component";
import {EmployeeComponent} from "./employee/employee.component";
import {APP_CONFIG_PROVIDER} from "./AppConfig/appconfig.service"

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [RouterOutlet, RoomsComponent, NgSwitchCase, NgSwitch, ContainerComponent, EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [APP_CONFIG_PROVIDER]
})
export class AppComponent implements AfterViewInit {
  title = 'hotelinventoryapp';

  loginTypes = "Admin";

  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  }

}
