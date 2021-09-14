import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.less']
})
export class EditPasswordComponent implements OnInit {
  
  private password = new FormControl('', [Validators.required]);
  private newPassword = new FormControl('', [Validators.required]);
  private reNewPassword = new FormControl('', [Validators.required]);
  private validPassword!: string;
  private validNewPassword!: string;
  private validReNewPassword!: string;
  hidePassword: boolean = true;
  hideNewPassword: boolean = true;
  hideReNewPassword: boolean = true;

  constructor(
    private toastr: ToastrService
  ) {
    this.password.valueChanges.subscribe(value => {
      this.validPassword = value;
    });

    this.newPassword.valueChanges.subscribe(value => {
      this.validNewPassword = value;
    });

    this.reNewPassword.valueChanges.subscribe(value => {
      this.validReNewPassword = value;
    });
  }

  ngOnInit(): void {
  }

  getPassword() {
    return this.password;
  }

  getNewPassword() {
    return this.newPassword;
  }

  getReNewPassword() {
    return this.reNewPassword;
  }

  showNotification() {
    if (this.validNewPassword !== this.validReNewPassword) {
      this.toastr.error('Las contraseñas no son iguales.');
    } else {
      this.toastr.success('La contraseña se guardó exitosamente.');
    }
  }

  getErrorActualPasswordMessage() {
    return this.password.hasError('required') ? 'Se requiere la contraseña actual' : '';
  }

  getErrorNewPasswordMessage() {
    return this.newPassword.hasError('required') ? 'Se requiere la nueva contraseña' : '';
  }

  getErrorReNewPasswordMessage() {
    return this.reNewPassword.hasError('required') ? 'Se requiere repetir la nueva contraseña' : '';
  }

}
