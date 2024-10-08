import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {filter, Subscription} from 'rxjs';
import {timeout} from 'rxjs/operators';
import {RoomsComponent} from "./rooms/rooms.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {ContainerComponent} from "./container/container.component";
import {EmployeeComponent} from "./employee/employee.component";
// import {APP_CONFIG_PROVIDER} from "./AppConfig/appconfig.service"
import {Observable} from "rxjs";
import { InitService } from "./init.service"
// Angular material imports
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppNavComponent} from "./app-nav/app-nav.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RoomsComponent,
    NgSwitchCase,
    NgSwitch,
    ContainerComponent,
    EmployeeComponent,
    RouterLink,
    // Angular material imports
    MatSlideToggleModule,
    MatToolbarModule,
    AppNavComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // providers: [APP_CONFIG_PROVIDER]  // Removed InitService from here
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'hotelinventoryapp';
  loginTypes = "Admin";

  data: any; // 用于存储获取到的 JSON 数据
  subscription: Subscription; // 用于存储对 HTTP 请求的订阅

  constructor(
    private http: HttpClient,
    private init_service: InitService,
    private router: Router,
  )
  {
    this.subscription = Subscription.EMPTY; // 初始化 subscription
  }

  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  }

  ngOnInit(): void {

    // Show init service config
    console.log('Init service config:', this.init_service.config);

    // Show router events
    // this.router.events.subscribe((event) => {
    //   console.log('Router event:', event);
    // });

    // Show page loading progress
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      console.log('NavigationStart Started event:', event);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      console.log('NavigationEnd Completed event:', event);
    });


    // 在 ngOnInit 中订阅 fetchData()
    //   this.subscription = this.fetchData().subscribe({
    //     next: (data) => {
    //       // 处理成功获取到的数据
    //       this.data = data;
    //       console.log('数据已获取：', this.data); // 打印获取到的 JSON 数据
    //     },
    //     error: (error) => {
    //       // 处理请求错误
    //       console.error('请求错误：', error);
    //       // Provide feedback to the user
    //     },
    //     complete: () => {
    //       // 处理请求完成
    //       console.log('请求完成');
    //     }
    //   });

  }

  // 获取数据的方法
  // fetchData(): Observable<any> {
  //   // 使用 HttpClient 发送 GET 请求到指定的 URL
  //
  //   // return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(timeout(8000));
  //
  //   // return this.http.get('http://localhost:3000/api/Rooms/').pipe(timeout(8000));
  //
  //   return this.http.get('/api/Rooms/').pipe(timeout(8000));
  // }

  ngOnDestroy(): void {
    // 在组件销毁之前取消订阅
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
