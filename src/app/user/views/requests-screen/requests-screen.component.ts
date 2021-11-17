import { Component, OnInit } from '@angular/core';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-requests-screen',
  templateUrl: './requests-screen.component.html',
  styleUrls: ['./requests-screen.component.less']
})
export class RequestsScreenComponent implements OnInit {
  
  public id: string | null;
  public user!: User;
  public myRequests: RequestC[];
  constructor(
    private authService: AuthService,
    private userService: UserService

  ) {
    this.id = this.authService.getId();
    this.fetchUserRequests();
    this.fetchUser();
    this.myRequests = [];

  }

  ngOnInit(): void {
  }

  async fetchUserRequests() {
    try {
      const response: any= await this.userService.getRequests(this.id!).toPromise();
      this.user = response.message;
      this.myRequests = response.message.idRequestsC
      console.log(this.myRequests)
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  async fetchUser() {
    try {
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.user = response.message;
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

}
