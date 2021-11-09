import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-collab-projects-screen',
  templateUrl: './collab-projects-screen.component.html',
  styleUrls: ['./collab-projects-screen.component.less']
})
export class CollabProjectsScreenComponent implements OnInit {

  public id!: string | null;
  public user!: User
  public projects!: Project[];
  public showHideElements: string = 'myCollabProjects'

  constructor(
    public projectService: ProjectService,
    public authService: AuthService,
    public userService: UserService
    
  ) {
    this.fetchUser();
    this.fetchUserCollab();
  }

  ngOnInit(): void {
  }

  async fetchUserCollab() {
    try {

      this.id = this.authService.getId()
      const response: any= await this.userService.getCollabProjects(this.id!).toPromise();
      this.user = response.message;
      this.projects = response.message.idCollaboratingProjects;
      console.log(this.projects);
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

  async fetchUser() {
    try {
      this.id = this.authService.getId()
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.user = response.message;
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
}
