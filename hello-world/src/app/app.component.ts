import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CoursesComponent2} from "./courses.component";
import { CourseComponent } from "./course/course.component"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoursesComponent2,
    CourseComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello-world';
}
