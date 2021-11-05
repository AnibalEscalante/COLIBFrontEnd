import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { EditDisciComponent } from '../../components/dialogs/edit-disci/edit-disci.component';
import { EditProjectComponent } from '../../components/dialogs/edit-project/edit-project.component';
import { EditSkillsComponent } from '../../components/dialogs/edit-skills/edit-skills.component';


 @Component({
  selector: 'app-project-info-screen',
  templateUrl: './project-info-screen.component.html',
  styleUrls: ['./project-info-screen.component.less']
})
export class ProjectInfoScreenComponent {
  
  public projectInfo!: Project;
  public response: any;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
    ) {
      this.fetchProject()
  }

  
  async fetchProject() {
    try {
      this.response = await this.projectService.getProject(this.activatedRoute.snapshot.params['id']).toPromise();
      this.projectInfo = this.response.message;
      console.log(this.projectInfo);
      this.projectInfo.idDisciplines
      console.log(this.projectInfo.finishDate);
      
      
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