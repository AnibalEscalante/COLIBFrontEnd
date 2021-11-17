<<<<<<< HEAD
import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';
=======
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
>>>>>>> 043ba4e53b5f44f9b558eea2e91f5a483260bbbf

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
  
  private id: string | null;
  public requestsReply: RequestC[] = [];
  public requests: RequestC[] = [];
  public projectId: string | null;
  public idUser: string | null;
  public user: User | null;
  public project: Project | null;
  constructor(
    private userService: UserService,
    private authService: AuthService

  ) { 
    this.id = this.authService.getId();
    this.requestsReply = [];
    this.requests = [];
    this.fetchUserRequestsReply();
    this.fetchUserRequests();
    this.idUser = null;
    this.projectId = null;
    this.project = null;
    this.user = null;
  }

  ngOnInit(): void {
  }
  
  async fetchUserRequestsReply(){
    try {
      const response: any= await this.userService.getRequestsReply(this.id!).toPromise();
      console.log(response);
      
      this.requestsReply = response.message.idRequestResults

      console.log(this.requestsReply);
      console.log(this.projectId);
      
      
    } catch (error) {
      console.log('error');
    }
  }
  async fetchUserRequests(){
    try {
      const response: any= await this.userService.getRequests(this.id!).toPromise();
      console.log(response);
      this.requests = response.message.idRequestsC
      
    } catch (error) {
      console.log('error');
    }
  }
  
  public signOut() {
    this.authService.logout();
  }

}
