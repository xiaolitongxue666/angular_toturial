import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {RoomsService} from "../services/rooms.service";
import {RoomList} from "../rooms-list/rooms-list";
import {JsonPipe, NgIf} from "@angular/common";
import { checkinBeforeCheckoutValidator } from './checkin-before-checkout.validator';
// Reactive Forms
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  templateUrl: './rooms-booking.component.html',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  roomId: number = 0;
  roomList: RoomList[] = [];
  error$ = new Subject<string>();
  modified_room: RoomList | undefined;

  // Reactive Form
  roomBookingForm : FormGroup;

  constructor(private router: ActivatedRoute,
              private roomsService: RoomsService) {

    // Reactive Form
    this.roomBookingForm = new FormGroup({
      roomNumber: new FormControl('', [Validators.required]),
      roomType: new FormControl('', [Validators.required]),
      amenities: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      photos: new FormControl('', [Validators.required]),
      checkinTime: new FormControl('', [Validators.required]),
      checkoutTime: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)])

    },
      {
        validators: checkinBeforeCheckoutValidator()
      }
    );

  }

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
          // 使用 patchValue 设置表单值
          this.roomBookingForm.patchValue(this.modified_room);
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

  onSubmit() {
    if (this.roomBookingForm.valid) {
      const roomData: RoomList = {
        ...this.roomBookingForm.value,
        checkinTime: new Date(this.roomBookingForm.value.checkinTime),
        checkoutTime: new Date(this.roomBookingForm.value.checkoutTime),
      };
      console.log('提交的房间数据:', roomData);
      //  在此处处理提交的数据，例如发送到后端
      this.roomsService.editRoom(roomData).subscribe((data) => {
        this.roomList = data;
      })
    }
  }

  resetForm() {
    this.roomBookingForm.reset();
  }

}
