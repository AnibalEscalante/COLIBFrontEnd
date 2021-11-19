import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { EditDisciComponent } from '../dialogs/edit-disci/edit-disci.component';
import { EditProjectComponent } from '../dialogs/edit-project/edit-project.component';
import { EditSkillsComponent } from '../dialogs/edit-skills/edit-skills.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent {
  
  @Input() public projectInfo!: Project;
  @Input() public showHideComponent!: boolean;
  
  public user!: User
  public response: any;
  public showDate!: string | null
  public id!: string | null;
  public showFinishDate!: string | null;
  public myProjects: Project[] = [];
  public myProjectsCollab: Project[] = [];
  public mySavedProject: Project[] = [];
  public showCreateDate!: string | null;
  public isShowElements: boolean = false;
  public isShowElementsCollab: boolean = false;
  public isShowElementsSaved: boolean = false;
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public userService: UserService,
    public requestService: RequestService,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    public projectService: ProjectService

  ) {
  }
  public isShown: boolean = true;
  public colorState: string = '';
  
  ngOnInit(): void {
    this.isShown = this.showHideComponent;
  }

  toggleShow() {
    this.isShown = ! this.showHideComponent;
  }
  
  
  async collaborater(){
    this.id = this.authService.getId()
    try {
      await this.requestService.registNewRequest(this.id, this.projectInfo._id!, this.projectInfo.idUser).toPromise();
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
    this.dates();
    return this.colorState;
  }

  public dates(){
    this.showCreateDate = this.datepipe.transform(this.projectInfo!.createdAt, 'dd/MM/yyyy');
    this.showFinishDate = this.datepipe.transform(this.projectInfo!.finishDate, 'dd/MM/yyyy');
  
  }

  //Dialogs//
  openDialog() {
    
    let dialogRef = this.dialog.open(EditProjectComponent, {
      height: '630px',
      width: '1000px',
    });
  }

  openDialogEditDisci() {
    let dialogRef = this.dialog.open(EditDisciComponent, {
      height: '500px',
      width: '800px',
    });
  }

  openDialogEditSkills() {
    let dialogRef = this.dialog.open(EditSkillsComponent, {
      height: '500px',
      width: '800px',
    });
  }
}
