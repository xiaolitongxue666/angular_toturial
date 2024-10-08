import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validators} from "@angular/forms";

@Directive({
  selector: '[hinvEmailvalidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailvalidatorDirective,
      multi: true
    }
  ]
})
export class EmailvalidatorDirective implements Validators  {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

}
