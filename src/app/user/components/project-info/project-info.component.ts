import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { EditDisciComponent } from '../dialogs/edit-disci/edit-disci.component';
import { EditPersonalInfoComponent } from '../dialogs/edit-personal-info/edit-personal-info.component';
import { EditSkillsComponent } from '../dialogs/edit-skills/edit-skills.component';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent {
  
  @Input() Projectinfo!: Project;

  @Input() showHideComponent!: boolean;
  
  constructor(public dialog: MatDialog) {}

  isShown: boolean = true;
  
  ngOnInit(): void {
    this.isShown = this.showHideComponent;
  }

  toggleShow() {
    this.isShown = ! this.showHideComponent;
  }
  
  ngDoCheck() {
    console.log(this.Projectinfo);
    console.log(this.showHideComponent)
  }


  //Dialogs//
  openDialog() {
    
    let dialogRef = this.dialog.open(EditPersonalInfoComponent, {
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
