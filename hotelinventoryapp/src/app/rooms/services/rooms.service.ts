import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {RoomList} from "../rooms-list/rooms-list";
import {environment} from "../../../environments/environment";
import {AppConfig} from '../../AppConfig/appconfig.interface';
import {APP_SERVICE_CONFIG} from "../../AppConfig/appconfig.service"
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];

  /********* getRooms *********/
  // '$' sign is used to denote observables, means this is a stream of data
  getRooms$: Observable<RoomList[]>; // Declare the observable without initializing it

  // headers = new HttpHeaders({ 'token' : '123456789' });

  constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
  // constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
    console.log('RoomsService initialized...');
    console.log(this.appConfig.aipEndpoint)

    /********* getRooms *********/
    // Ok
    this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe();

    // Ok with shareReplay(1)
    // this.getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    //   shareReplay(1) // share the result of the first call to the server and replay it to subscribers
    // );

    // Initialize getRooms$ after http is initialized

    // Ok with headers
    // this.getRooms$ = this.http.get<RoomList[]>('/api/rooms', { headers: this.headers }).pipe(
    //   shareReplay(1) // share the result of the first call to the server and replay it to subscribers
    // );

    // Fail
    // this.getRooms$ = this.http.get<RoomList[]>('/api/room').pipe(
    //   shareReplay(1) // share the result of the first call to the server and replay it to subscribers
    // );

  }

  getRooms() {
    return this.http.get<RoomList[]>
    (
      '/api/rooms'
    );
  }

  addRoom(room: RoomList) {
    // return this.http.post<RoomList[]>('/api/rooms', room, {
    //   headers: this.headers,
    // });

    // return this.http.post<RoomList[]>('/api/rooms', room);

    return this.http.post<RoomList[]>('/api/rooms', room).pipe();
  }


  editRoom(room: RoomList) {
    // return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);

    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room).pipe();
  }

  deleteRoom(id: String) {
    // return this.http.delete<RoomList[]>(`/api/rooms/${id}`);

    return this.http.delete<RoomList[]>(`/api/rooms/${id}`).pipe();
  }

  getPhotos() {

    // const headers = new HttpHeaders({ 'token' : '123456789' });

    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        // headers : headers,
        reportProgress: true,
        responseType: 'json'
      }
    );

    return this.http.request(request);
  }

}
