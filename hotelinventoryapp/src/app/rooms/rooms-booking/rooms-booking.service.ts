import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomsBookingService {

  constructor(private http: HttpClient) { }

  bookRoom(booking: any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', booking);
  }

}
