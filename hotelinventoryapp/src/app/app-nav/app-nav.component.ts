import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {RouterLink, RouterOutlet} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'hinv-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrl: './app-nav.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterOutlet,
  ]
})
export class AppNavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  private router = inject(Router);

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']); // 注销后跳转到登录页面
  }

}
