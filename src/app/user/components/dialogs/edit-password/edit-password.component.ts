import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.less']
})
export class EditPasswordComponent implements OnInit {
  
  public newPassword = new FormControl('', [Validators.required]);
  public reNewPassword = new FormControl('', [Validators.required]);
  private validNewPassword!: string;
  private validReNewPassword!: string;
  public hidePassword: boolean = true;
  public hideNewPassword: boolean = true;
  public hideReNewPassword: boolean = true;
  public updatePassword: FormGroup;
  public _id!: string | null;
  public passwordNew!: string;

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.newPassword.valueChanges.subscribe(value => {
      this.validNewPassword = value;
    });

    this.reNewPassword.valueChanges.subscribe(value => {
      this.validReNewPassword = value;
    }),
    this.updatePassword = this.formBuilder.group({
      password: ['', [ Validators.minLength(8)]],
      confirmPassword: ['', [ Validators.minLength(8)]],
    }),
    {
    validator: this.MustMatch('password', 'confirmPassword')
    }
  }

  ngOnInit(): void {
  }

  get newPasword() {
    return this.updatePassword?.get('password')?.value;
  }
  
  public async onSubmit() {
  
    this._id = this.authService.getId()
    this.passwordNew = this.newPasword
    try {
      await this.userService.modifyPassword(this.passwordNew, this._id!).toPromise();
     
    } catch (error) {
      console.log('error');

    }
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

  getErrorNewPasswordMessage() {
    return this.newPassword.hasError('required') ? 'Se requiere la nueva contraseña' : '';
  }

  getErrorReNewPasswordMessage() {
    return this.reNewPassword.hasError('required') ? 'Se requiere repetir la nueva contraseña' : '';
  }
  
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
    
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }     

}
