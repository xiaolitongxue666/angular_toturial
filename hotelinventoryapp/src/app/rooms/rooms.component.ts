import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {Room} from './rooms';
import {RoomsListComponent} from "./rooms-list/rooms-list.component";

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RoomsListComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  hotelName = 'Hilton Hotel';
  imageUrl = 'https://p1.itc.cn/q_70/images01/20211122/76b8d5be7e06432882a65b0059200b18.png';
  isLoading = false;
  numberOfRooms = 10;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  toggle() {
    this.numberOfRooms = this.numberOfRooms === 10 ? 5 : 10;
  }
}
