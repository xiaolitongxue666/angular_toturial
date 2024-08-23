import {Component} from '@angular/core';
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Room, RoomList} from './rooms';

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    DatePipe
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

  roomList: RoomList[] = [
    {
      rootType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
    },
    {
      rootType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV',
      price: 300,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('12-Nov-2021'),
      checkoutTime: new Date('13-Nov-2021'),
    },
    {
      rootType: 'Private Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV',
      price: 1000,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('14-Nov-2021'),
      checkoutTime: new Date('15-Nov-2021'),
    }
  ]

  toggle() {
    this.numberOfRooms = this.numberOfRooms === 10 ? 5 : 10;
  }
}
