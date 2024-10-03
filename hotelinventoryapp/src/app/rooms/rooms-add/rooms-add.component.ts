import { Component } from '@angular/core';
import {RoomList} from "../rooms-list/rooms-list";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";


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

    room : RoomList = {
      roomNumber: "",
      rootType: "",
      amenities: "",
      price: 0,
      photos: "",
      checkinTime: new Date(),
      checkoutTime: new Date(),
      rating: 0
    }

}
