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

  constructor(
    public projectService: ProjectService,
    public authService: AuthService,
    public userService: UserService,
    
  ) {
   /*  this.fetchProjects(); */
    this.fetchUser();
  }
  
  


  ngOnInit(): void {
  }

  /* async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise();

    } catch (error) {
      console.log('uh que mal :c');
    }
  } */

  async fetchUser() {
    try {

      this.id = this.authService.getId()
      const response: any= await this.userService.getMyProjects(this.id!).toPromise();
      this.projects = response.message.idMyProjects
      console.log(this.projects);
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  } 

}
