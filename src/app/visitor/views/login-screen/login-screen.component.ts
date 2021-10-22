import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.less']
})
export class LoginScreenComponent implements OnInit {
  
  emailreq = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor( 
      private userService: UserService,
      private router: Router, 
      private formBuilder: FormBuilder,

  ) {

    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]}

    );
  }
  
  getErrorMessage() {
    if (this.emailreq.hasError('required')) {
      return 'Correo electrónico no valido';
    }

    return this.emailreq.hasError('email') ? 'Ese no es un correo electrónico' : '';
  }

  registerForm: FormGroup;
  messageFlag = 0;

  
  
  ngOnInit(): void {
  }

  get email() { return this.registerForm?.get('email'); }
  get password() { return this.registerForm?.get('password'); }

  
  idUser!:string;

  async onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    try {
      const response = await this.userService.login(email!,password!).toPromise();
      this.idUser = response.message;
      this.router.navigate(['/user/home',this.idUser]);  
      console.log(this.idUser);
      
      this.messageFlag = 0;
    } catch (error) {
      this.messageFlag = 1;
    }

  }

  return() {
    this.router.navigate(['']);
  }

}
