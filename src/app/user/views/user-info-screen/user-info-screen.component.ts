import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Discipline } from 'src/app/core/models/discipline.model';
import { Project } from 'src/app/core/models/project.model';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
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

  public disciplines!: Discipline[];
  constructor(
    private contactsDialog: MatDialog,
    private disciplineService: DisciplineService
  ) {
    this.fetchDiscipline()
  }
  
  async fetchDiscipline() {
    try {
      this.disciplines = await this.disciplineService.getallDiscipline().toPromise();
      console.log(this.disciplines);
      
    }
    catch (error) {
      console.log('uh que mal :c');
    }
  }
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
