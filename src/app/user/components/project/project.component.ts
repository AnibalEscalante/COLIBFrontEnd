import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input()
  public project!: Project;
  
  @Output() projectList= new EventEmitter<Project>();

  @Output() show= new EventEmitter<boolean>();
  
  public showinfo: boolean = false;
  public projectId: any;
  public colorState: string = '';
  public user!: User;
  public _id!: string | null
  public newSavedProject: Project[] = []
  public mySavedProject: Project[] = []

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.fetchUser();
    this.fetchMySavedProject();
  }

  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
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
   

  async modifyProjectUser(){
    try {
      /* for(let project of this.mySavedProject){
        let i= 0;
        if(this.project === project){
          this.mySavedProject.splice(this.project)
        }
        i++
      } */
      this.mySavedProject.push(this.project)
      console.log(this.mySavedProject);
      
      let user: Partial<User> = {
        idSavedProjects: this.mySavedProject
      }

      this._id = this.authService.getId()
      await this.userService.modifyUser(user, this._id!).toPromise();
      
     
    } catch (error) {
      console.log('error');

    }
  }

  mandarInfo() {
    this.projectList.emit(this.project);
  }
  
  showState(): string {
    if (this.project.state === 'Abierto') {
      this.colorState = '#198754';
    }
    if (this.project.state === 'Cerrado') {
      this.colorState = '#dc3545';
    }

    return this.colorState;
  }
}
