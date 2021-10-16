import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {

  projects: Project[] = [];
  offcanvasProjectIndo!: string;
  public isshowinfo!: boolean;
  
  constructor(
    private  projectService: ProjectService
    ){
      this.fetchProjects();
  }
    
  ngOnInit(): void {

  }
    
    
  project!: Project;

  getProject(event: any) {
    this.project = event;
  }

  recibirIsShowInfo(event: any){
    this.isshowinfo = event
  }

  async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise();

    } catch (error) {
      console.log('uh que mal :c');
    }
  }


}
