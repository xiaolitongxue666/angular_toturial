import {Component} from '@angular/core';
import {RoomList} from "../rooms-list/rooms-list";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {RoomsService} from "../services/rooms.service";

@Component({
  selector: 'hinv-rooms-add',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './rooms-add.component.html',
  styleUrl: './rooms-add.component.scss'
})
export class RoomsAddComponent {

  room: RoomList = {
    roomNumber: "",
    rootType: "",
    amenities: "",
    price: 0,
    photos: "",
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0
  }

  successMessage: string = "";

  // constructor() {};
  constructor(private roomsService: RoomsService) {};

  AddRoom() {
    this.roomsService.addRoom(this.room).subscribe({
      next: (data) => {
        console.log('Room added successfully:', data); // 打印成功添加的房间数据
         this.successMessage = "Room added successfully!"; // 显示成功信息
      },
      error: (err) => {
        // 这里可以添加额外的错误处理逻辑，例如显示更友好的错误信息给用户
        console.error('Error adding room:', err);
        this.successMessage = "Error adding room:";
      }
    });
  }

}
