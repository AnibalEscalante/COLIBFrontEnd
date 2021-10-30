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
  
  public id!: string | null;
  public user!: User
  public projects!: Project[];

  constructor(
    public projectService: ProjectService,
    public authService: AuthService,
    public userService: UserService
  ) {
    /* this.fetchProjects(); */
    this.fetchUser();
  }
  
  /* projects: Project[] = []; */

  ngOnInit(): void {
  }

  /* async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise();

    } catch (error) {
      console.log('uh que mal :c');
    }
  }
 */
  async fetchUser() {
    try {

      this.id = this.authService.getId()
      const response: any= await this.userService.getSavedProjects(this.id!).toPromise();
      this.user = response.message;
      this.projects = response.message.idSavedProjects
      console.log(this.projects);
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  } 

}
