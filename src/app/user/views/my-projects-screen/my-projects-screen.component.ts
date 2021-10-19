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


 /*  window: any.onscroll = {myFunction()};

  header = document.getElementById("myHeader");
  sticky = this.header!.offsetTop;

    myFunction() {
    if (window.pageYOffset > this.sticky) {
      this.header!.classList.add("sticky");
    } else {
      this.header!.classList.remove("sticky");
    }
  } */

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
