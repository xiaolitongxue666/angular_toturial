import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'hinv-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  empName: string = 'John';

  ngOnInit() {
  }

}
