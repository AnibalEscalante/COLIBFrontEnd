import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-my-projects-screen',
  templateUrl: './my-projects-screen.component.html',
  styleUrls: ['./my-projects-screen.component.less']
})
export class MyProjectsScreenComponent implements OnInit {
  
  public id!: string | null;
  public user!: User
  public projects!: Project[];
  public showHideElements: string = 'myProjects'

  constructor(
    public projectService: ProjectService,
    public authService: AuthService,
    public userService: UserService
    
  ) {
    this.fetchUser();
  }

  ngOnInit(): void {
  }

  async fetchUser() {
    try {

      this.id = this.authService.getId()
      const response: any= await this.userService.getMyProjects(this.id!).toPromise();
      this.user = response.message;
      this.projects = response.message.idMyProjects
      console.log(this.projects);
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  } 
}
