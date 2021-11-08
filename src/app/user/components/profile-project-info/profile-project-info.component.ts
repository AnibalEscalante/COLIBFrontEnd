import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';
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
  public response: any;
  public showFinishDate!: string | null;
  public showCreateDate!: string | null;
  public user!: User;
  public myProjects: Project[] = []
  public _id!: string | null;
  public isShowElements: boolean = false;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    public datepipe: DatePipe
    ) {
  }
  ngOnInit(): void {
    for(let project of this.myProjects){
      if(project._id ===  this.projectInfo._id){
        this.isShowElements = true;
        console.log(this.isShowElements);
        
      }
    }
    this.fetchProject();
      this.fetchMyProject();
  }
  
  async fetchProject() {
    try {
      this.response = await this.projectService.getProject(this.activatedRoute.snapshot.params['id']).toPromise();
      this.projectInfo = this.response.message;
      this.projectInfo.idDisciplines
      this.showFinishDate = this.datepipe.transform(this.projectInfo.finishDate, 'dd/MM/yyyy');
      this.showCreateDate = this.datepipe.transform(this.projectInfo.createdAt, 'dd/MM/yyyy');
      console.log(this.projectInfo._id);
      for(let project of this.myProjects){
        if(project._id ===  this.projectInfo._id){
          this.isShowElements = true;
          console.log(this.isShowElements);
          
        }
      }
    }
    catch (error) {
      console.log('uh que mal :c');
    }
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

}
