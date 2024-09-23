import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchCase } from "@angular/common";
import { ContainerComponent } from "./container/container.component";
import { EmployeeComponent } from "./employee/employee.component";
import { APP_CONFIG_PROVIDER } from "./AppConfig/appconfig.service";
import { InitService } from "./init.service";

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgSwitchCase,
    NgSwitch,
    ContainerComponent,
    EmployeeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [APP_CONFIG_PROVIDER]  // Removed InitService from here
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';
  loginTypes = "Admin";

  constructor(private init_service: InitService) {}

  ngOnInit(): void {
    // Log the config directly
    console.log('Init service config:', this.init_service.config);
  }
}
