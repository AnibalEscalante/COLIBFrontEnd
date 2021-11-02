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

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.fetchUser()
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
      console.log(this.project)
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  } 

  async modifyProject(){
    try {
      this.user
      console.log(this.user);
      
      this._id = this.authService.getId()
      await this.userService.modifyUser(this.user, this._id!).toPromise();
      
      /* this.user.idSavedProjects = this.project */
     
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
