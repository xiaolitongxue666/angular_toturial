import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses = ['Angular', 'React', 'Vue'];

  getCourses() {
    return this.courses;
  }

  addCourse(course: string) {
    this.courses.push(course);
  }
}
