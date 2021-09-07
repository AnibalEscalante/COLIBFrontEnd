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
    if (this.password.hasError('required')) {
      return 'Se requiere la contraseña actual';
    }

    return this.password.hasError('password') ? 'Contraseña actual incorrecta' : '';
  }

  getErrorNewPasswordMessage() {
    if (this.newPassword.hasError('required')) {
      return 'Se requiere la nueva contraseña';
    }

    return this.newPassword.hasError('newPassword') ? 'Contraseña no cumple con el formato' : '';
  }

  getErrorReNewPasswordMessage() {
    if (this.reNewPassword.hasError('required')) {
      return 'Se requiere repetir la nueva contraseña';
    }

    if (this.reNewPassword !== this.newPassword) {
      return this.reNewPassword.hasError('Las contraseñas no son iguales');
    }
  
    return this.reNewPassword.hasError('reNewPassword') ? 'Las contraseñas no son iguales' : '';
  }
  

  ngOnInit(): void {
  }

}
