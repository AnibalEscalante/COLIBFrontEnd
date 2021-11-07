import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';
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
  
  
  public _id!: string | null
  public user!: User
  public showDate!: string | null
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public userService: UserService,
    public datepipe: DatePipe

  ) {
    /* this.myFunction(); */
  }
  public isShown: boolean = true;
  public colorState: string = '';
  
  ngOnInit(): void {
    this.isShown = this.showHideComponent;
  }

  toggleShow() {
    this.isShown = ! this.showHideComponent;
  }

 /*  myFunction(){
    this.showDate = this.datepipe.transform(this.projectInfo.finishDate, 'yyyy-MM-dd');
    console.log(this.showDate);
    
   } */
  
  /* ngDoCheck() {
    console.log(this.projectInfo);
    console.log(this.showHideComponent)
  } */
  /* async fetchUser() {
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
  } */

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
