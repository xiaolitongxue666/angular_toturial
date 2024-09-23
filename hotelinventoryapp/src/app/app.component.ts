import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {timeout} from 'rxjs/operators';
import {RoomsComponent} from "./rooms/rooms.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {ContainerComponent} from "./container/container.component";
import {EmployeeComponent} from "./employee/employee.component";
import {APP_CONFIG_PROVIDER} from "./AppConfig/appconfig.service"
import {Observable} from "rxjs";
import { InitService } from "./init.service"

@Component({
  selector: 'hinv-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RoomsComponent,
    NgSwitchCase,
    NgSwitch,
    ContainerComponent,
    EmployeeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [APP_CONFIG_PROVIDER, InitService]
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'hotelinventoryapp';
  loginTypes = "Admin";

  data: any; // 用于存储获取到的 JSON 数据
  subscription: Subscription; // 用于存储对 HTTP 请求的订阅

  constructor(private http: HttpClient, private init_service: InitService) {
    this.subscription = Subscription.EMPTY; // 初始化 subscription
  }

  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  }

  async ngOnInit(): Promise<void>{

    // Show init service config
    // this.subscription = this.init_service.init().subscribe(() => {
    //   console.log('Type of config:', typeof this.init_service.config);
    //   console.log('Init service config:', this.init_service.config);
    // });

    try {
      // Wait for the config to be initialized
      await this.init_service.init();

      // After the config is loaded, access it
      this.init_service.config$.subscribe((config) => {
        console.log('Config in ngOnInit:', config);
        // Now you can proceed with other operations that depend on the config
      });
    } catch (error) {
      console.error('Error loading config:', error);
    }

    // By now the config should already be loaded by APP_INITIALIZER
    // console.log('Config in ngOnInit:', this.init_service.config); // Ensure this is defined
    //   this.init_service.config$.subscribe((config) => {
    //     console.log('Config in ngOnInit:', config);
    //     // Now you can proceed with other operations that depend on the config
    //   });

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

  // ngOnDestroy(): void {
  //   // 在组件销毁之前取消订阅
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  // }

}
