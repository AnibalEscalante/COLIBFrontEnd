import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/models/auth.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.less']
})
export class DeleteUserComponent implements OnInit {
  
  public _id: string | null;
  public user: User & Auth | null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.user = null
    this._id = null;
  }

  ngOnInit(): void {
  }
  async deleteUser(){
    try {
      this._id = this.authService.getId()
      await this.userService.deleteUser(this._id!).toPromise();
      this.router.navigate(['/visitor/landing']);
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

}
