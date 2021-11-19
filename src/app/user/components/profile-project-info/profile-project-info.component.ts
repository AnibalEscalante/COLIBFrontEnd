import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/core/models/project.model';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { DeleteProjectComponent } from '../dialogs/delete-project/delete-project.component';
import { EditDisciComponent } from '../dialogs/edit-disci/edit-disci.component';
import { EditProjectComponent } from '../dialogs/edit-project/edit-project.component';
import { EditSkillsComponent } from '../dialogs/edit-skills/edit-skills.component';

@Component({
  selector: 'app-profile-project-info',
  templateUrl: './profile-project-info.component.html',
  styleUrls: ['./profile-project-info.component.less']
})
export class ProfileProjectInfoComponent implements OnInit {
  
  @Input() public projectInfo!: Project;
  @Input() public showFinishDate!: string | null;
  @Input() public showCreateDate!: string | null;
  @Input() public myProjects: Project[] = [];
  @Input() public mySavedProject: Project[] = [];
  @Input() public myProjectsCollab: Project[] = [];


  public response: any;
  public isShowElements: boolean = false;
  public isShowElementsCollab: boolean = false;
  public isShowElementsSaved: boolean = false;
  public user!: User;
  public _id!: string | null;
  public colorState: string = '';
  public idP!: string
  
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private requestService: RequestService,
    private authService: AuthService,
    public datepipe: DatePipe,
    public router: Router,
    private toastr: ToastrService
    ) {
  }
  ngOnInit(): void {
    this.fetchProject();
  }
  
  async fetchProject() {
    try {
  
      this.response = await this.projectService.getProject(this.activatedRoute.snapshot.params['id']).toPromise()
      for(let project of this.myProjects){
        if(project._id ===  this.projectInfo._id){
          this.isShowElements = true;
          return;
        }
      }
      for(let project of this.myProjectsCollab){
        if(project._id ===  this.projectInfo._id){
          this.isShowElementsCollab = true;
          return;
        }
      }
  
      for(let project of this.mySavedProject){
        if(project._id ===  this.projectInfo._id){
          this.isShowElementsSaved = true;
          return;
        }
      }
      
    }
    catch (error) {
      console.log('uh que mal :c');
    }
  }

  async collaborater(){
    this._id = this.authService.getId()
    try {
      await this.requestService.registNewRequest(this._id, this.projectInfo._id!, this.projectInfo.idUser).toPromise();
      this.toastr.success("Peticion enviada con exito, espere hasta que su peticion sea procesada", "", {
        "positionClass": "toast-bottom-center",
      });
    } catch (error) {
      console.log('error')
    }
  }
  
  showState(): string {
    if (this.projectInfo.state === 'Open') {
      this.colorState = '#198754';
    }
    if (this.projectInfo.state === 'Close') {
      this.colorState = '#dc3545';
    }

    return this.colorState;
  }


  openDialog() {
    
    let dialogRef = this.dialog.open(EditProjectComponent, {
      width: '900px',
      height: 'auto',
      data: {id: this.projectInfo._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchProject()
    });
  }

  openDialogEditDisci() {
    let dialogRef = this.dialog.open(EditDisciComponent, {
      width: '900px',
      height: 'auto',
      data: {disciplines: this.projectInfo.idDisciplines, isUserProject: 'project', id: this.projectInfo._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchProject()
    });
  }

  openDialogEditSkills() {
    let dialogRef = this.dialog.open(EditSkillsComponent, {
      width: '900px',
      height: 'auto',
      data: {skills: this.projectInfo.idSkills , isUserProject: 'project' , id: this.projectInfo._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchProject()
    });
  }

  deleteProjectDialog(){
    let dialogRef = this.dialog.open(DeleteProjectComponent, {
      width:'400px',
      height: 'auto',
      data: {idProject: this.activatedRoute.snapshot.params['id']}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/user/myprojects']);
    });
    
  }

}
