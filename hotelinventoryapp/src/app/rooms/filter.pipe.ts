import { Pipe, PipeTransform } from '@angular/core';
import {RoomList} from "./rooms-list/rooms-list";

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[] | null, price: number): RoomList[] {
    // 检查 rooms 是否为 null
    if (!rooms) {
      return []; // 或者 return rooms; 取决于你的需求
    }
    return rooms.filter(room => room.price <= price);
  }

}
