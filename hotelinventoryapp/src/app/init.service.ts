import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  // public config: any;
  private configLoaded: boolean = false;
  // BehaviorSubject to hold the config value
  private configSubject = new BehaviorSubject<any>(null);
  public config$ = this.configSubject.asObservable(); // Observable for components to subscribe

  constructor(private http: HttpClient) {
  }

  // init () {
  //   return this.http
  //     .get('/assets/config.json')
  //     // .get('https://jsonplaceholder.typicode.com/todos/1')
  //     .pipe(tap((config) =>(this.config = config)));
  // }

  // init(): Observable<any> {
  //   const start = performance.now();
  //   if (this.configLoaded) {
  //     // If the config is already loaded, return it as an Observable using `of`
  //     console.log("Config already loaded");
  //     return of(this.config);
  //   } else {
  //     // Load the config via HTTP only if not already loaded
  //     return this.http.get('/assets/config.json').pipe(
  //       tap((config) => {
  //         this.config = config;
  //         this.configLoaded = true;
  //         const end = performance.now();
  //         console.log(`Config loaded in ${end - start} ms`);
  //       })
  //     );
  //   }
  // }

  // Change this method to return a promise for APP_INITIALIZER
  init(): Promise<void> {
    return this.http
      .get('/assets/config.json')
      .pipe(
        tap((config) => {
          this.configSubject.next(config); // Push the config into BehaviorSubject
          console.log('Config loaded in InitService:', config);
        })
      )
      .toPromise()
      .then(() => {
        // Return void to satisfy Promise<void>
        return;
      });
  }

}
