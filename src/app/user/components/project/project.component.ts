import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DeleteProjectComponent } from '../dialogs/delete-project/delete-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input()
  public project!: Project;
  
  @Input()
  public user!: User;

  @Input()
  public mySavedProject: Project[] = [];

  @Input()
  public isShowComponent!: boolean;
  
  @Input()
  public showHideElements!: string
  
  @Output() projectList= new EventEmitter<Project>();

  @Output() show= new EventEmitter<boolean>();
  
  public static routeNamesObject = {}
  
  public showSaved: boolean = false;
  public showHideComponent: boolean = false;
  public showHomeProject: boolean = false;
  public showMyProjects: boolean = false;
  public showSavedProjects: boolean = false;
  public showCollabProjects: boolean = false;
  public showinfo: boolean = false;
  public isMySavedProject: boolean = false;
  public projectId: any;
  public colorState: string = '';
  public colorSavedState: string = '';
  public _id!: string | null;
  public newSavedProject: Project[] = [];
  public myProjects: Project[] = [];
  public name: string | null;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { 
    this.name = null;
  }
  
  
  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
    if(this.showHideElements === 'homeProjects'){
      this.showHomeProject = true;
    }
    if (this.showHideElements === 'myProjects'){
      this.showMyProjects = true;
    }
    if (this.showHideElements === 'mySavedProjects'){
      this.showSavedProjects = true;
    }
    if (this.showHideElements === 'myCollabProjects'){
      this.showCollabProjects = true;
    }

    /* this.route.queryParams.subscribe(params => {
      this.project.idCollaborators = params['name'];
    }); */

  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
  }


  async fetchMyProject() {
    try {

      this._id = this.authService.getId()
      const response: any= await this.userService.getMyProjects(this._id!).toPromise();
      this.user = response.message;
      this.myProjects = response.message.idMyProjects
      
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  
////////////////////////////boton guardar projecto//////////////////
  async modifyProjectUser(){
    try {
      for(let project of this.mySavedProject){
        if(this.project._id === project._id){
         this.mySavedProject.splice(this.mySavedProject.findIndex(item => item._id === this.project._id),1);
         this.isMySavedProject = true
        }
      }
      if (!this.isMySavedProject){
        this.mySavedProject.push(this.project)
      }
      
      let user: Partial<User> = {
        idSavedProjects: this.mySavedProject
      }
      this.toast()

      this._id = this.authService.getId()
      await this.userService.modifyUser(user, this._id!).toPromise();
    } catch (error) {
      this.toastr.success('Ha ocurrido un error al guardar el proyecto',);

    }
  }
  toast(){
    if (this.isMySavedProject === false){
      this.toastr.success("Se agregó el proyecto a tus elementos guardados", "", {
        "positionClass": "toast-bottom-center",
      });
    }
    if (this.isMySavedProject === true){
      this.toastr.error("Se eliminó el proyecto de tus elementos guardados", "", {
        "positionClass": "toast-bottom-center",
      });
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
