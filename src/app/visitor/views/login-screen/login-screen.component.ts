import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {

  public hide: boolean;
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.hide = true;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9@$!%*?&.]{8,12}$')]]
    });
  }

  ngOnInit(): void {
  }
  
  public getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Ingrese un correo electrónico';
    }
    return this.email?.invalid ? 'El dato ingresado no es un correo electónico valido' : '';
  }

  public getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Ingrese la contraseña';
    }
    return this.password?.invalid ? 'El dato ingresado no es una contraseña valida' : '';
  }

  get email() { return this.loginForm?.get('email'); }
  get password() { return this.loginForm?.get('password'); }

  async onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    try {
      if (email && password) {
        await this.authService.login(email, password).toPromise();
        this.toastr.success('Inicio de sesión exitoso');
      }
    } catch (error) {
      this.toastr.error('Datos del inicio de sesión invalidos');
    }
    
  }

}
