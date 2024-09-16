import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {RoomList} from "../rooms-list/rooms-list";
import {environment} from "../../../environments/environment";
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from "../../AppConfig/appconfig.service"

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];

  constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
    console.log(environment.apiUrl);
    console.log('RoomsService initialized...');
    console.log(this.appConfig.aipEndpoint)
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }


  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: String){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
        responseType: 'json'
        }
      );

    return this.http.request(request);
  }

}
