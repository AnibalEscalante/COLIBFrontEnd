import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { EditDisciComponent } from '../../components/dialogs/edit-disci/edit-disci.component';
import { EditPasswordComponent } from '../../components/dialogs/edit-password/edit-password.component';
import { EditPersonalInfoComponent } from '../../components/dialogs/edit-personal-info/edit-personal-info.component';
import { EditSkillsComponent } from '../../components/dialogs/edit-skills/edit-skills.component';

@Component({
  selector: 'app-user-info-screen',
  templateUrl: './user-info-screen.component.html',
  styleUrls: ['./user-info-screen.component.less']
})
export class UserInfoScreenComponent implements OnInit {


  constructor(
    private contactsDialog: MatDialog
  ) {}
  
  ngOnInit(): void {
  }

  editPersonalInfo() {
    let dialogRef = this.contactsDialog.open(EditPersonalInfoComponent, {
      width: '500px',
      height: 'auto'
    });
  }

  editPassword() {
    let dialogRef = this.contactsDialog.open(EditPasswordComponent, {
      width: '400px',
      height: 'auto',
    });
  }

  openDialogEditDisci() {
    let dialogRef = this.contactsDialog.open(EditDisciComponent, {
      width: '600px',
      height: 'auto'
    });
  }

  openDialogEditSkills() {
    let dialogRef = this.contactsDialog.open(EditSkillsComponent, {
      width: '600px',
      height: 'auto'
    });
  }
}
