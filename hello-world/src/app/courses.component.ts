// Import decorator
import { Component } from "@angular/core";
import {NgForOf} from "@angular/common";
import {CoursesService} from "./courses.service";


// Apply decorator to the class
// Call decorator like a function (decorator function)
// Pass an object with one or more properties to tell Angular how this component works
@Component({
  selector: 'courses',
  standalone: true,
  imports: [
    NgForOf
  ],
  template: `
    <h2>{{ "Title:" + title }}</h2>
    <ul>
      <li *ngFor="let course of courses">
        {{ course }}
      </li>
    </ul>
  `

})
export class CoursesComponent2 {
  title = "List of courses";

  courses: string[];

  constructor(private coursesService: CoursesService) {
    this.courses = this.coursesService.getCourses();
  }

}
