import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from 'src/app/core/models/discipline.model';
import { Project } from 'src/app/core/models/project.model';
import { Skill } from 'src/app/core/models/skill.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { DeleteUserComponent } from '../../components/dialogs/delete-user/delete-user.component';
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

  public disciplines: Discipline[];
  public skills: Skill[];
  public myProjects: Project[];
  public user!: User;
  public id: string | null;
  public email: string | null;
  public userUpdate: string = 'user';
  public idUser: string;
  public myProfile: boolean = true;
  public cantProjects: number;

  constructor(
    private contactsDialog: MatDialog,
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.authService.getId();
    this.idUser = this.activatedRoute.snapshot.params['id'];
    this.skills = []
    this.disciplines = []
    this.myProjects = []
    this.email = null
    this.cantProjects = 0;
    this.fetchUser();
  }
  

  async fetchUser() {
    try {
      if (this.idUser) this.myUserProfile() 
      else this.userProfile()
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }
  async myUserProfile(){
    try {
      const response: any = await this.userService.getUser(this.idUser).toPromise();
      this.user = response.message;
      this.disciplines = response.message.idDisciplines;
      this.skills = response.message.idSkills;
      this.email = response.message.email;
      console.log(response);
      
      console.log(this.idUser);
    } catch (error) {
      console.log('Algo ha salido mal');
    }
  }

  async userProfile(){
    try {
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.user = response.message;
      this.disciplines = response.message.idDisciplines;
      this.skills = response.message.idSkills;
      this.email = response.message.email;
      this.myProfile = false;
    } catch (error) {
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
    dialogRef.afterClosed().subscribe(result => {
      this.fetchUser()
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
      height: 'auto',
      data: {disciplines: this.disciplines , isUserProject: 'user'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchUser()
    });
  }

  openDialogEditSkills() {
    let dialogRef = this.contactsDialog.open(EditSkillsComponent, {
      width: '600px',
      height: 'auto',
      data: {skills: this.skills , isUserProject: 'user'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.fetchUser()
    });
  }

  openDialog() {
    let dialogRef = this.contactsDialog.open(DeleteUserComponent, {
      width:'400px',
      height: 'auto',
    });
  }
}
