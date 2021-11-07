import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
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
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public datepipe: DatePipe
    ) {
      this.fetchProject();
  }
  ngOnInit(): void {
  }
  
  async fetchProject() {
    try {
      this.response = await this.projectService.getProject(this.activatedRoute.snapshot.params['id']).toPromise();
      this.projectInfo = this.response.message;
      this.projectInfo.idDisciplines
      this.showFinishDate = this.datepipe.transform(this.projectInfo.finishDate, 'dd/MM/yyyy');
      this.showCreateDate = this.datepipe.transform(this.projectInfo.createdAt, 'dd/MM/yyyy');
      console.log(this.projectInfo.createdAt);
    }
    catch (error) {
      console.log('uh que mal :c');
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
