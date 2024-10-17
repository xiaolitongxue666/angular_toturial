import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {DatePipe, NgForOf, NgOptimizedImage} from '@angular/common';
import {RoomList} from "./rooms-list";
import {RouterLink} from "@angular/router";
import {FilterPipe} from "../filter.pipe";

@Component({
  selector: 'hinv-rooms-list',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    RouterLink,
    FilterPipe
  ],
  templateUrl: './rooms-list.component.html',
  styleUrl: './rooms-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges {

  @Input() rooms: RoomList[] | null = [];

  @Output() selectedRoom = new EventEmitter<RoomList>()

  @Input() filterPrice = 0;

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called");
    // console.log(changes);
  }

  ngOnInit() {

  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}

