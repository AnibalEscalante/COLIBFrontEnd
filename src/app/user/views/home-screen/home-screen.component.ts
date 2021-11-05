import { Component, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {
  
  public projects: Project[] = [];
  public searchTerm!: string;
  public term!: string;

  constructor(
    public dialog: MatDialog,
    public  projectService: ProjectService

  ){
    this.fetchProjects();
  }
  ngOnInit(): void {
    
  }
  
  async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise()
 
    } catch (error) {
      console.log('uh que mal :c');
    }
  }


  //show info component//
  projectinfo!: Project;
  recibir(event: any) {
    this.projectinfo = event;
  }

  //show component//
  public isshowinfo!: boolean;
  recibirIsShowInfo(event: any){
    this.isshowinfo = event
  }

  openCreateProject(){

    let dialogRef = this.dialog.open(CreateProjectComponent, {
      width:'900px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchProjects()
    });
  }
}
