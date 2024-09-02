import {Component} from '@angular/core';
import {JsonPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Room} from './rooms';
import {RoomsListComponent} from "./rooms-list/rooms-list.component";
import {RoomList} from "./rooms-list/rooms-list";

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RoomsListComponent,
    JsonPipe,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  hotelName = 'Hilton Hotel';
  imageUrl = 'https://p1.itc.cn/q_70/images01/20211122/76b8d5be7e06432882a65b0059200b18.png';
  isLoading = false;
  numberOfRooms = 10;

  // !: 这是一个非空断言运算符。它告诉 TypeScript 编译器，这个变量在使用之前一定会被赋值，所以不需要进行空值检查。
  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  toggle() {
    this.numberOfRooms = this.numberOfRooms === 10 ? 5 : 10;
  }

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

  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      rootType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 550,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
    };

    // If use ChangeDetectionStrategy.OnPush, need to manually trigger change detection
    //this.roomList.push(room);

    // Manually trigger change detection
    this.roomList = [...this.roomList, room];

  }
}
