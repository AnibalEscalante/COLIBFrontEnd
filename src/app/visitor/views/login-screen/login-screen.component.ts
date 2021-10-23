import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {
  
  emailreq = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  registerForm: FormGroup;

  
  getErrorMessage() {
    if (this.emailreq.hasError('required')) {
      return 'Correo electrónico no valido';
    }

    return this.emailreq.hasError('email') ? 'Ese no es un correo electrónico' : '';
  }

  ngOnInit(): void {
  }

  constructor( 

    private authService: AuthService,
    private router: Router, 
    private formBuilder: FormBuilder,

) {

  this.registerForm = this.formBuilder.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]}

  );
}


get email() { return this.registerForm?.get('email'); }
get password() { return this.registerForm?.get('password'); }



async onSubmit() {
  const email = this.email?.value;
  const password = this.password?.value;
  try {
    await this.authService.login(email!,password!).toPromise();
  } catch (error) {
    console.log('xd')
  }

}

}
