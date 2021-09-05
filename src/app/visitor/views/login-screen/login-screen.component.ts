import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor() { }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Correo electrónico no valido';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

}
