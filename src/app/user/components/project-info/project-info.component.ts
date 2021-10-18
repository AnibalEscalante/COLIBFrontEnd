import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { EditDisciComponent } from '../dialogs/edit-disci/edit-disci.component';
import { EditProjectComponent } from '../dialogs/edit-project/edit-project.component';
import { EditSkillsComponent } from '../dialogs/edit-skills/edit-skills.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent {
  
  @Input() projectInfo!: Project;

  @Input() showHideComponent!: boolean;
  
  constructor(public dialog: MatDialog) {}

  public isShown: boolean = true;
  public colorState: string = '';
  
  ngOnInit(): void {
    this.isShown = this.showHideComponent;
  }

  toggleShow() {
    this.isShown = ! this.showHideComponent;
  }
  
  ngDoCheck() {
    console.log(this.projectInfo);
    console.log(this.showHideComponent)
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
