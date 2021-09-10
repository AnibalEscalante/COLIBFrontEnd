import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.less']
})
export class EditPasswordComponent implements OnInit {
  
  password = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required]);
  reNewPassword = new FormControl('', [Validators.required]);
  validPassword!: string;
  validRePassword!: string;
  hide = true;

  constructor(
    private toastr: ToastrService
  ) {
    this.newPassword.valueChanges.subscribe(value => {
      this.validPassword = value;
    });

    this.reNewPassword.valueChanges.subscribe(value => {
      this.validRePassword = value;
    });
  }

  ngOnInit(): void {
  }

  showNotification() {
    if (this.validPassword !== this.validRePassword) {
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
