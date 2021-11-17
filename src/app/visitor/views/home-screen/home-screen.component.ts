import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {

  public projects: Project[];
  public isshowinfo: boolean;
  public term: string;
  public project: Project | null;
  
  constructor(
    private projectService: ProjectService
  ) {
    this.term = '';
    this.projects = [];
    this.isshowinfo = false;
    this.project = null;
  }
    
  async ngOnInit(): Promise<void> {
    this.projects = await this.fetchProjects();
  }

  public getProject(event: any) {
    this.project = event;
  }

  public reciveIsShowInfo(event: any){
    this.isshowinfo = event;
  }

  private async fetchProjects(): Promise<Project[] | []> {
    try {
      let response = await this.projectService.getAllProject().toPromise();
      if (response) return response;
      else return [];
    } catch (error) {
      console.log('uh que mal :c');
      return [];
    }
  }


}
