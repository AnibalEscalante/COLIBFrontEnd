import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UserService } from '../../../../core/services/user/user.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile-img',
  templateUrl: './edit-profile-img.component.html',
  styleUrls: ['./edit-profile-img.component.less']
})
export class EditProfileImgComponent implements OnInit {
  
  public user: User | null;
  public id: string;
  public imagePath: string;
  public imgURL: any;
  public loading: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.user = null;
    this.id = authService.getId();
    this.imagePath = '';
    this.loading = true;
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.fetchUser();
    this.imgURL = this.user?.profileImg;
  }

  private async fetchUser(): Promise<User | null> {
    try {
      const response: any = await this.userService.getUser(this.id).toPromise();
      if (response) {
        this.loading = false;
        return response.message;
      }
      else {
        this.loading = false;
        return null;
      }
    } catch (error) {
      console.log('algo salió mal');
      this.loading = false;
      return null;
    }
  }

  public async changeProfileImage() {
    try {
      if (this.user) {
        this.user.profileImg = this.imgURL;
        await this.userService.modifyUser(this.user, this.id).toPromise();
        this.toastr.success('La foto de perfil se guardó correctamente.');
        window.location.reload();
      }
    } catch (error) {
      console.log('algo salió mal');
      this.toastr.error('Ocurrió un error al guarda la foto de perfil.');
    }
  }

  public cancel() {
    this.toastr.warning('No se guardaron los cambios');
  }

  public previewImg(files: any) {
    if (files.length === 0) return;
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.warning('El documento subido solo puede ser una imagen.');      
      return;
    }
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

}
