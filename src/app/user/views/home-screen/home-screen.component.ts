import { Component, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {
  
  projects: Project[] = [];
  user!: User;
  constructor(
    private dialog: MatDialog,
    private  projectService: ProjectService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute

  ){
    this.fetchProjects();
    this.fetchUser();
  }
  ngOnInit(): void {

  }
  
  async fetchProjects() {
    try {
      this.projects = await this.projectService.getAllProject().toPromise();

    } catch (error) {
      console.log('uh que mal :c');
    }
  }

  async fetchUser() {
    try {
      this.user = await this.userService.getUser(this.activatedRoute.snapshot.params['idUser']).toPromise()
      console.log(this.user);
      
    } catch (error) {
      console.log('lol');
      
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
  }
}
