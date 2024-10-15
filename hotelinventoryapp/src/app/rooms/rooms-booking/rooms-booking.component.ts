import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {RoomsService} from "../services/rooms.service";
import {RoomList} from "../rooms-list/rooms-list";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {checkinBeforeCheckoutValidator} from './checkin-before-checkout.validator';
// Reactive Forms
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  templateUrl: './rooms-booking.component.html',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  roomId: number = 0;
  roomList: RoomList[] = [];
  error$ = new Subject<string>();
  modified_room: RoomList | undefined;

  // Reactive Form
  roomBookingForm: FormGroup;

  constructor(private router: ActivatedRoute,
              private roomsService: RoomsService,
              private fb: FormBuilder) {

    // Reactive Form normal
    // this.roomBookingForm = new FormGroup({
    //   roomNumber: new FormControl('', [Validators.required]),
    //   roomType: new FormControl('', [Validators.required]),
    //   amenities: new FormControl('', [Validators.required]),
    //   price: new FormControl('', [Validators.required, Validators.min(0)]),
    //   photos: new FormControl('', [Validators.required]),
    //   checkinTime: new FormControl('', [Validators.required]),
    //   checkoutTime: new FormControl('', [Validators.required]),
    //   rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)])
    //
    // },
    // Reactive Form nested in FormGroup
    // this.roomBookingForm = new FormGroup({
    //   roomNumber: new FormControl('', [Validators.required]),
    //   roomType: new FormControl('', [Validators.required]),
    //   roomDetails: new FormGroup({
    //     amenities: new FormControl('', [Validators.required]),
    //     photos: new FormControl('', [Validators.required]),
    //   }),
    //   price: new FormControl('', [Validators.required, Validators.min(0)]),
    //   checkinTime: new FormControl('', [Validators.required]),
    //   checkoutTime: new FormControl('', [Validators.required]),
    //   rating: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)])
    // },
    // Reactive Form nested in FormBuilder
    // this.roomBookingForm = this.fb.group({
    //   roomNumber: ['', Validators.required],
    //   roomType: ['', Validators.required],
    //   roomDetails: this.fb.group({
    //     amenities: ['', Validators.required],
    //     photos: ['', Validators.required],
    //   }),
    //   price: ['', [Validators.required, Validators.min(0)]],
    //   checkinTime: ['', Validators.required],
    //   checkoutTime: ['', Validators.required],
    //   rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
    //     guest: this.fb.array([this.createGuestGroup()])
    // },
    //
    //   {
    //     validators: checkinBeforeCheckoutValidator()
    //   }
    // );
    this.roomBookingForm = this.createRoomBookingForm();
  }

  createRoomBookingForm(): FormGroup {
    return this.fb.group({
        roomNumber: ['', Validators.required],
        roomType: ['', Validators.required],
        roomDetails: this.fb.group({
          amenities: ['', Validators.required],
          photos: ['', Validators.required],
        }),
        price: ['', [Validators.required, Validators.min(0)]],
        checkinTime: ['', Validators.required],
        checkoutTime: ['', Validators.required],
        rating: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
        guest: this.fb.array([this.createGuestGroup()])
      },
      {
        validators: checkinBeforeCheckoutValidator()
      });
  }

  createGuestGroup(): FormGroup {
    return this.fb.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  get guestArray(): FormArray {  // Getter for easy access in the template
    return this.roomBookingForm.get('guest') as FormArray;
  }

  addGuest() {
    this.guestArray.push(this.createGuestGroup());
  }

  removeGuest(index: number) {
    this.guestArray.removeAt(index);
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

    // Value changes
    this.roomBookingForm.get('roomType')?.valueChanges.subscribe(value => {
      console.log('RoomType value changed:', value);
      // 在这里可以执行其他操作，比如更新其他控件的值
    });


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

  useDefaultForm() {
    this.roomBookingForm.setValue({
      roomNumber: '101',
      roomType: 'Deluxe Room',
      roomDetails: {
        amenities: 'Free Wi-Fi, Air Conditioning, Balcony, Bathroom, Kitchen, Dining Area',
        photos: 'https://via.placeholder.com/150'
      },
      price: 120,
      checkinTime: new Date(),
      checkoutTime: new Date( ),
      rating: 5,
      guest: [
        {
          guestName: 'John Doe',
          guestEmail: 'john.doe@example.com',
          guestPhone: '1234567890'
        }
      ]
    });
  }

}
