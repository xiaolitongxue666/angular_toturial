import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [RouterOutlet, RoomsComponent, NgSwitchCase, NgSwitch],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotelinventoryapp';

  loginTypes = "Admin";
}
