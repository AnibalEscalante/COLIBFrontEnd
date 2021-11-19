import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { CreateProjectComponent } from '../dialogs/create-project/create-project.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Input()
  public user!: User | null;

  @Input()
  public id: string | null;
  
  @Input()
  public idUser: string | null;
  
  public myUserProfile: boolean = false;

  public userProfile: boolean = false;
  constructor(
    public dialog: MatDialog,
  ) {
    this.myProfile();
    /* this.user = null; */
    this.id = null;
    this.idUser = null;
  }

  myProfile(){

  }

  ngOnInit(): void {
    if (this.id)
      this.myUserProfile = true;
    else this.userProfile = true
  }

  openCreateProject(){

    let dialogRef = this.dialog.open(CreateProjectComponent, {
      width:'900px',
      height: 'auto',
    });
  }
}
