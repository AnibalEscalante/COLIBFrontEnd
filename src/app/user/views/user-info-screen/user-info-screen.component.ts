import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info-screen',
  templateUrl: './user-info-screen.component.html',
  styleUrls: ['./user-info-screen.component.less']
})
export class UserInfoScreenComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Correo electrónico no valido';
    }

    return this.email.hasError('email') ? 'Correo electrónico no valido' : '';
  }

  ngOnInit(): void {
  }

}
