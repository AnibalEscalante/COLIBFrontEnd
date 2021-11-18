import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-navbar-request',
  templateUrl: './navbar-request.component.html',
  styleUrls: ['./navbar-request.component.less']
})
export class NavbarRequestComponent implements OnInit {
  
  @Input() public request!: RequestC
  public project: Project | null;
  public user : User | null;
  public id: string | null;
  constructor(
    private projectService: ProjectService,
    private userService: UserService
  ) { 
    this.project = null;
    this.user = null
    this.id = null;
  }

  ngOnInit(): void {
    this.fetchUserProject();
  }

  async fetchUserProject(){
    try {
      const response: any= await this.projectService.getProject(this.request.idProject).toPromise();
      this.project = response.message
      this.id = this.project!.idUser
      this.fetchUser();
    } catch (error) {
      console.log('error');
      
    }
  }

  async fetchUser(){
    try {
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.user = response.message
      console.log(this.user!.name);
      
    } catch (error) {
      console.log('error');
      
    }
  }

}
