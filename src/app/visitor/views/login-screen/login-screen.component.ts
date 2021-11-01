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
  public hide = true;
  
  public registerForm: FormGroup;
  public message!: string;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9@$!%*?&.]{8,12}$')]]
      }
    );
  }

  ngOnInit(): void {
  }
  
  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Ingrese un correo electrónico';
    }
    return this.email?.invalid ? 'El dato ingresado no es un correo electónico valido' : '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Ingrese la contraseña';
    }
    return this.password?.invalid ? 'El dato ingresado no es una contraseña valida' : '';
  }

  get email() { return this.registerForm?.get('email'); }
  get password() { return this.registerForm?.get('password'); }

  async onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    try {
      /* if (this.email?.valid && this.password?.valid) {
        await this.authService.login(email!, password!).toPromise();
        this.toastr.success('Inicio de sesión exitoso');
      }
      else {
        this.toastr.error('Datos del inicio de sesión invalidos');
      } */
      await this.authService.login(email!, password!).toPromise();
      this.toastr.success('Inicio de sesión exitoso');
    } catch (error) {
      this.toastr.error('Datos del inicio de sesión invalidos');
    }
    
  }

}
