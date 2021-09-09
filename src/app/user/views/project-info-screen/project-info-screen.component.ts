import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditDisciComponent } from '../../components/dialogs/edit-disci/edit-disci.component';
import { EditPersonalInfoComponent } from '../../components/dialogs/edit-personal-info/edit-personal-info.component';
import { EditSkillsComponent } from '../../components/dialogs/edit-skills/edit-skills.component';


 @Component({
  selector: 'app-project-info-screen',
  templateUrl: './project-info-screen.component.html',
  styleUrls: ['./project-info-screen.component.less']
})
export class ProjectInfoScreenComponent {
 

  constructor(public dialog: MatDialog) {}

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