import {OnInit, Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HoverDirective} from "../hover.directive";
import {EmailvalidatorDirective} from "../emailvalidator/emailvalidator.directive";
import {JsonPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'hinv-login',
  standalone: true,
  imports: [
    FormsModule,
    HoverDirective,
    EmailvalidatorDirective,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  email: string='';
  password: string='';

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  login() {
    if(this.email === 'admin@example.com' && this.password === 'password') {
      alert("Login Successful");
      this.route.navigate(['/rooms']);
      // this.route.navigate(['/rooms', 'add']);
      // this.route.navigateByUrl('/rooms/add');
    }
  }
}
