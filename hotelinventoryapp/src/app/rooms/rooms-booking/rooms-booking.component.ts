import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'hinv-rooms-booking',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './rooms-booking.component.html',
  styleUrl: './rooms-booking.component.scss'
})
export class RoomsBookingComponent implements OnInit {

  roomId: number = 0;

  roomId$ !: Observable<number>;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {

    // Use subscription
    // this.router.params.subscribe((params) => {
    //   console.log(params);
    //   this.roomId = params['id'];
    // });

    // Use snapshot
    // Snapshots will never update the data, so it's better to use subscription instead.
    // this.roomId = this.router.snapshot.params['id'];

    this.roomId$ = this.router.params.pipe(
      map(params => parseInt(params['id'], 10)) // Corrected map operator
    );

  }

}
