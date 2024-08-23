import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  hotelName = 'Hilton Hotel';
  imageUrl = 'https://p1.itc.cn/q_70/images01/20211122/76b8d5be7e06432882a65b0059200b18.png';
  isLoading = false;
  numberOfRooms = 10;

  toggle() {
    this.numberOfRooms = this.numberOfRooms === 10? 5 : 10;
  }
}
