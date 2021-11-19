import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-saved-projects-screen',
  templateUrl: './saved-projects-screen.component.html',
  styleUrls: ['./saved-projects-screen.component.less']
})
export class SavedProjectsScreenComponent implements OnInit {
  
  public id: string | null;
  public user!: User
  public projects!: Project[];
  public showSavedProject: boolean = true;
  public showHideElements: string = 'mySavedProjects'
  public mySavedProject: Project[] = [];

  constructor(
    public projectService: ProjectService,
    public authService: AuthService,
    public userService: UserService
  ) {
    this.id = this.authService.getId()
    this.fetchUserSavedProjects();
    this.fetchUser();
    this.fetchMySavedProject();
  }
  

  ngOnInit(): void {
  }

  async fetchUserSavedProjects() {
    try {
      const response: any= await this.userService.getSavedProjects(this.id!).toPromise();
      this.user = response.message;
      this.projects = response.message.idSavedProjects
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

  async fetchMySavedProject() {
    try {
      const response: any= await this.userService.getSavedProjects(this.id!).toPromise();
      this.mySavedProject= response.message.idSavedProjects;
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

}
