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
  public user!: User & Auth;
  public userEmail!: string;

  public emailreq = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { 
    this.updateForm = this.formBuilder.group({
      nickName: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],
      name: ['', [Validators.pattern('[a-zA-Z]{2,32}')]],
      lastName: ['',  [Validators.pattern('[a-zA-Z]{2,32}')]],         
      email: ['', [Validators.email]],
      movilPhone: ['',[Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]]
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
      this.emailreq = response.message.email
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

  get nickName() {
    return this.updateForm?.get('nickName')?.value;
  }
  get name() {
    return this.updateForm?.get('name')?.value;
  }
  get lastName() {
    return this.updateForm?.get('lastName')?.value;
  }
   get email () {
    return this.updateForm?.get('email')?.value;
  } 
  get movilPhone() {
    return this.updateForm?.get('movilPhone')?.value;
  }
 

  async onSubmit() {
      let user: Partial<User & Auth> = {
        nickName : this.nickName ? this.nickName : this.user.nickName,
        name:  this.name ? this.name : this.user.name,
        lastName: this.lastName ? this.lastName: this.user.lastName,
        email: this.email ? this.email: this.user.email,
        movilPhone: this.movilPhone ? this.movilPhone : this.user.movilPhone
      }
      try {
        this._id = this.authService.getId()
        await this.userService.modifyUser(user, this._id!).toPromise();
       
      } catch (error) {
        console.log('error');
  
      }
  }

}
