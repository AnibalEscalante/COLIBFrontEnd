import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user.model';
import { CreateProjectComponent } from '../dialogs/create-project/create-project.component';
import { EditProfileImgComponent } from '../dialogs/edit-profile-img/edit-profile-img.component';

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
  
  public myUserProfile: boolean;
  public imgExist: boolean;
  public userProfile: boolean;

  constructor(
    public dialog: MatDialog,
  ) {
    /* this.myProfile(); */
    /* this.user = null; */
    this.user = null;
    this.id = null;
    this.idUser = null;
    this.myUserProfile = false;
    this.userProfile = false;
    this.imgExist = false;
  }

  ngOnInit(): void {
    this.verifyImg();
    this.verifyMyProfile();
  }

  public verifyImg() {
    if (this.user) {
      if (this.user.profileImg) {
        this.imgExist = true;
      }
    }
  }

  public verifyMyProfile() {
    if (this.id)
      this.myUserProfile = true;
    else this.userProfile = true;
  }

  openCreateProject(){
    let dialogRef = this.dialog.open(CreateProjectComponent, {
      width:'900px',
      height: 'auto',
    });
  }

  openEditProfileImage(){
    let dialogRef = this.dialog.open(EditProfileImgComponent, {
      width:'500px',
      height: 'auto',
    });
  }
}
