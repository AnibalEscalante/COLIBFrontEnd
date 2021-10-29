import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/core/models/auth.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

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
  public updatePassword: FormGroup;
  public _id!: string | null;
  public passwordNew!: string;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.password.valueChanges.subscribe(value => {
      this.validPassword = value;
    });

    this.newPassword.valueChanges.subscribe(value => {
      this.validNewPassword = value;
    });

    this.reNewPassword.valueChanges.subscribe(value => {
      this.validReNewPassword = value;
    }),
    this.updatePassword = this.formBuilder.group({
      oldPassword: ['', [ Validators.minLength(8)]],
      newPassword: ['', [ Validators.minLength(8)]],
      confirmPassword: ['', [ Validators.minLength(8)]],
    })

  }

  ngOnInit(): void {
  }
  
  async onSubmit() {
  
    this.passwordNew = this.updatePassword.get('newPassword')!.value
    
    try {
      this._id = this.authService.getId()
      await this.userService.modifyPassword(this.passwordNew, this._id!).toPromise();
     
    } catch (error) {
      console.log('error');

    }
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
