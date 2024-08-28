import {Component} from '@angular/core';
import {DatePipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {RoomList} from "./rooms-list";

@Component({
  selector: 'hinv-rooms-list',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss'
})
export class RoomsListComponent {

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

}
