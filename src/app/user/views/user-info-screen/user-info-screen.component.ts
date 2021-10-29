import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'src/app/core/models/auth.model';
import { Discipline } from 'src/app/core/models/discipline.model';
import { Project } from 'src/app/core/models/project.model';
import { Skill } from 'src/app/core/models/skill.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DisciplineService } from 'src/app/core/services/discipline/discipline.service';
import { UserService } from 'src/app/core/services/user/user.service';
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
  public skills!: Skill[];
  public allDisciplines!: Discipline[];
  public user!: User;
  public _id!: string | null;
  public email!: string | null;

  constructor(
    private contactsDialog: MatDialog,
    private disciplineService: DisciplineService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.fetchDiscipline()
    this.fetchUser()
  }
  
  async fetchDiscipline() {
    try {
      this.allDisciplines = await this.disciplineService.getallDiscipline().toPromise();
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }

  async fetchUser() {
    try {
      this._id = this.authService.getId()
      const response: any= await this.userService.getUser(this._id!).toPromise();
      this.user = response.message;
      this.disciplines = response.message.idDisciplines
      this.skills = response.message.idSkills
      this.email = response.message.email
    }
    catch (error) {
      console.log('Algo ha salido mal');
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
