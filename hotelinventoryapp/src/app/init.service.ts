import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  public config: any;

  constructor(private http: HttpClient) {}

  init() {
    console.log("init.service.init() called");

    // Return a promise that resolves when the HTTP request completes
    return lastValueFrom(
      this.http.get('/assets/config.json').pipe(
        tap((config) => {
          this.config = config;
          console.log('Config loaded in InitService:', this.config);
        })
      )
    );
  }
}
