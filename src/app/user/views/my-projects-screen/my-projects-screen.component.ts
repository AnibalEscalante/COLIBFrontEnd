import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';


@Component({
  selector: 'app-my-projects-screen',
  templateUrl: './my-projects-screen.component.html',
  styleUrls: ['./my-projects-screen.component.less']
})
export class MyProjectsScreenComponent implements OnInit {

  constructor(
    public projectService: ProjectService
  ) {
    this.fetchProjects();
  }
  
  projects: Project[] = [];


   

  ngOnInit(): void {
  }

  async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise();

    } catch (error) {
      console.log('uh que mal :c');
    }
  }

}
