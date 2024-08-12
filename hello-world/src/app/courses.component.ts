// Import decorator
import { Component } from "@angular/core";

// Apply decorator to the class
// Call decorator like a function (decorator function)
// Pass an object with one or more properties to tell Angular how this component works
@Component({
  selector: 'courses',
  standalone: true,
  template: '<h2>Courses</h2>'

})
export class CoursesComponent {

}
