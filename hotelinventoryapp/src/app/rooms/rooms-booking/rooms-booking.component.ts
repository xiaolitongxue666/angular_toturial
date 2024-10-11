import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {RoomsService} from "../services/rooms.service";
import {RoomList} from "../rooms-list/rooms-list";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  templateUrl: './rooms-booking.component.html',
  imports: [
    JsonPipe
  ],
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  roomId: number = 0;
  roomList: RoomList[] = [];
  error$ = new Subject<string>();
  modified_room: RoomList | undefined;

  constructor(private router: ActivatedRoute, private roomsService: RoomsService) { }

  ngOnInit() {
    // Get the roomId from the URL
    this.router.paramMap.subscribe((params) => {
      this.roomId = parseInt(<string>params.get('id'), 10);
    });

    // Programmatically subscribe to rooms$
    this.roomsService.getRooms$.pipe(
      map(rooms => {
        this.roomList = rooms; // Store rooms in roomList
        this.modified_room = this.roomList.find(room => room.roomNumber === this.roomId.toString());
        if (this.modified_room) {
          console.log('Found Room:', this.modified_room);
        } else {
          console.log('No room found with the specified room number.');
        }
      }),
      catchError((err) => {
        this.error$.next(err.message);
        return of([]);
      })
    ).subscribe();
  }
}
