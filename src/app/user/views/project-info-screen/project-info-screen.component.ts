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
    const dialogRef = this.dialog.open(EditPersonalInfoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditDisci() {
    const dialogRef = this.dialog.open(EditDisciComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditSkills() {
    const dialogRef = this.dialog.open(EditSkillsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}