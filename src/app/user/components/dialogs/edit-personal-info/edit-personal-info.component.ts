import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/core/models/auth.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.less']
})
export class EditPersonalInfoComponent implements OnInit {

  
  public _id!: string | null;
  public updateForm: FormGroup;
  public user!: User;

  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.updateForm = this.formBuilder.group({
      
      name: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],
      lastName: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],         
      email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"
      )]],
      movilPhone: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      password: ['', [ Validators.minLength(8)]],
      confirmPassword: ['', [ Validators.minLength(8)]],
  }),
  this.fetchUser();

}


  ngOnInit(): void {
  }
  
  async fetchUser() {
    try {
      this._id = this.authService.getId()
      const response: any= await this.userService.getUser(this._id!).toPromise();
      this.user = response.message;
      this.email = response.message.email
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  async onSubmit() {
    let user: Partial<User & Auth> = {
      name: this.updateForm.get('name')!.value,
      lastName: this.updateForm.get('lastName')!.value,
      email: this.updateForm.get('email')!.value,
      movilPhone: this.updateForm.get('movilPhone')!.value,
      password: this.updateForm.get('password')!.value,
  }
    try {
      this._id = this.authService.getId()
      await this.userService.modifyUser(user, this._id!).toPromise();
     
    } catch (error) {
      console.log('error');

    }
  }

}
