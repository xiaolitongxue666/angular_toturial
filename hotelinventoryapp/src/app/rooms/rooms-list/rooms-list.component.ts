import {Component, Input} from '@angular/core';
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

  @Input() rooms: RoomList[] = [];

}

