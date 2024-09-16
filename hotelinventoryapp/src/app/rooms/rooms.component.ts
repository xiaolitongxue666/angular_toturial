import {Component, ViewChild} from '@angular/core';
import {JsonPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Room} from './rooms';
import {RoomsListComponent} from "./rooms-list/rooms-list.component";
import {RoomList} from "./rooms-list/rooms-list";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";
import { Observable } from 'rxjs';
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'hinv-rooms',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    RoomsListComponent,
    JsonPipe,
    HeaderComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  providers: [RoomsService]
})
export class RoomsComponent {
  hotelName = 'Hilton Hotel';
  imageUrl = 'https://p1.itc.cn/q_70/images01/20211122/76b8d5be7e06432882a65b0059200b18.png';
  isLoading = false;
  numberOfRooms = 10;
  roomList: RoomList[];

  stream = new Observable<string>(observer => {
    // observer.next() will be emitted a new data so whoever is subscribing to this stream will get the new data
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

  constructor(private roomsService: RoomsService) {
    this.roomList = [];
  }

  // 静态查询意味着 Angular 会在组件初始化阶段（ngOnInit 之前）就尝试查找 HeaderComponent 的实例。
  // 如果在初始化阶段就找到了，那么 headerComponent 属性就会被赋值，否则它将保持 undefined。
  @ViewChild(HeaderComponent, { static : true }) headerComponent: HeaderComponent | undefined;

  ngAfterViewInit() {
    if (this.headerComponent) {
      // 使用 headerComponent
      this.headerComponent.title = 'Rooms';
    } else {
      // 处理 headerComponent 为 undefined 的情况
      console.error('headerComponent is undefined');
    }
  }

  // subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
  ngOnInit(): void {

    this.stream.subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('rooms stream completed');
      }
    });

    this.roomsService.getRooms().subscribe((rooms) => {
      this.roomList = rooms;
    });

    // this.roomsService.getPhotos().subscribe((photos) => {
    //   console.log(photos);
    // });

    interface Photo {
      albumId: number;
      id: number;
      title: string;
      url: string;
      thumbnailUrl: string;
    }

    let totalSize: number | undefined;

    // Helper function to format bytes to human-readable sizes
    function formatBytes(bytes: number, decimals = 2) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    this.roomsService.getPhotos().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        console.log('Request has been sent.');
      } else if (event.type === HttpEventType.DownloadProgress) {
        // Display formatted bytes
        console.log(`Downloaded ${formatBytes(event.loaded)} so far, unable to determine total size.`);
      } else if (event.type === HttpEventType.ResponseHeader) {
        console.log('Response headers received.');
      } else if (event.type === HttpEventType.Response) {
        const photos = event.body as Array<Photo>;
        console.log(photos);
      } else {
        console.log(`Unknown event type: ${event.type}`);
        console.log(event);
      }
    });






  }


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

  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      rootType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 550,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    // If you use ChangeDetectionStrategy.OnPush, need to manually trigger change detection
    //this.roomList.push(room);

    // Manually trigger change detection
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });

  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      rootType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 550,
      photos: 'https://pix10.agoda.net/hotelImages/2296893/29598206/97da276e6eec9d266fa6da5d08192cb9.jpg',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })

  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomList = data;
    })
  }

}
