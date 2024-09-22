import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InitService {
  public config: any;

  constructor(private http: HttpClient) { }

  init () {
    return this.http
      .get('/assets/config.json')
      // .get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(tap((config) =>(this.config = config)));
  }

}
