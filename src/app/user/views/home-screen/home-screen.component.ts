import { Component, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {
  
  public projects: Project[] = [];
  public _id!: string | null;
  public searchTerm!: string;
  public term!: string;
  public user!: User;
  public isShowComponent: boolean = false;
  public showHideElements: string = 'homeProjects';
  public mySavedProject: Project[] = [];

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public userService: UserService,
    public  projectService: ProjectService

  ){
    this.fetchProjects();
    this.fetchUser();
    this.fetchMySavedProject();
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

  async fetchMySavedProject() {
    try {

      this._id = this.authService.getId()
      const response: any= await this.userService.getSavedProjects(this._id!).toPromise();
      this.mySavedProject= response.message.idSavedProjects;
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  async fetchUser() {
    try {

      this._id = this.authService.getId()
      const response: any= await this.userService.getUser(this._id!).toPromise();
      this.user = response.message;
    }
    catch (error) {
      console.log('Algo ha salido mal');
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
