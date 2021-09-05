import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info-screen',
  templateUrl: './user-info-screen.component.html',
  styleUrls: ['./user-info-screen.component.less']
})
export class UserInfoScreenComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  reNewPassword = new FormControl('', [Validators.required]);
  hide = true;

  constructor() { }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Correo electrónico no valido' : '';
  }

  getErrorActualPasswordMessage() {
    if (this.email.hasError('required')) {
      return 'Es requerida la contraseña actual';
    }

    return this.email.hasError('password') ? 'Contraseña actual incorrecta' : '';
  }

  getErrorNewPasswordMessage() {
    if (this.email.hasError('required')) {
      return 'Es requerida la nueva contraseña';
    }

    return this.email.hasError('password') ? 'Contraseña no cumple con el formato' : '';
  }

  getErrorReNewPasswordMessage() {
    if (this.email.hasError('required')) {
      return 'Es requerido volver a ingresar la nueva contraseña';
    }

    return this.email.hasError('password') ? 'Las contraseñas no son iguales' : '';
  }

  ngOnInit(): void {
  }

}
