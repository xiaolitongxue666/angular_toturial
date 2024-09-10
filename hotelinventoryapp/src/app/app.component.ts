import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';
import {RoomsComponent} from "./rooms/rooms.component";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {ContainerComponent} from "./container/container.component";
import {EmployeeComponent} from "./employee/employee.component";
import {APP_CONFIG_PROVIDER} from "./AppConfig/appconfig.service"
import {Observable} from "rxjs";

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
  providers: [APP_CONFIG_PROVIDER]
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'hotelinventoryapp';
  loginTypes = "Admin";

  data: any; // 用于存储获取到的 JSON 数据
  subscription: Subscription; // 用于存储对 HTTP 请求的订阅

  constructor(private http: HttpClient) {
    this.subscription = Subscription.EMPTY; // 初始化 subscription
  }

  @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef;

  ngAfterViewInit() {
    const componentRef = this.vcr.createComponent(RoomsComponent);
    componentRef.instance.numberOfRooms = 50;
  }

  ngOnInit(): void {
    // 在 ngOnInit 中订阅 fetchData()
    this.subscription = this.fetchData().subscribe(
      (data) => {
        // 处理成功获取到的数据
        this.data = data;
        console.log('数据已获取：', this.data); // 打印获取到的 JSON 数据
      },
      (error) => {
        // 处理请求错误
        console.error('请求错误：', error);
        // Provide feedback to the user
      },
      () => {
        // 处理请求完成
        console.log('请求完成');
      }
    );
  }

  // 获取数据的方法
  fetchData(): Observable<any> {
    // 使用 HttpClient 发送 GET 请求到指定的 URL

    // return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(timeout(8000));

    /*
        在 Angular 项目中，访问 localhost:3000 时出现跨域资源共享 (CORS) 问题，
        通常是因为 Angular 应用和你的 API 服务器运行在不同的端口上。
        解决方法:
        1 - 在 API 服务器上配置 CORS:
        2 - 在 Angular 项目中配置代理:
    */
    // return this.http.get('http://localhost:3000/api/Rooms/').pipe(timeout(8000));

    return this.http.get('/api/Rooms/').pipe(timeout(8000));
  }

  ngOnDestroy(): void {
    // 在组件销毁之前取消订阅
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
