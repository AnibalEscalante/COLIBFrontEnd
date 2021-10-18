import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-saved-projects-screen',
  templateUrl: './saved-projects-screen.component.html',
  styleUrls: ['./saved-projects-screen.component.less']
})
export class SavedProjectsScreenComponent implements OnInit {
  
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
