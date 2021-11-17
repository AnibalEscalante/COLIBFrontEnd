import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/core/models/project.model';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-navbar-request-result',
  templateUrl: './navbar-request-result.component.html',
  styleUrls: ['./navbar-request-result.component.less']
})
export class NavbarRequestResultComponent implements OnInit {
  @Input() public result!: RequestC
  
  public project: Project | null;
  public user : User | null;
  public id: string | null;
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private authService: AuthService,
    private requestService: RequestService,
    private toastr: ToastrService
  ) { 
    this.project = null;
    this.user = null
    this.id = null;
  }

  ngOnInit(): void {
    this.fetchUserProject();
  }

  async fetchUserProject(){
    try {
      const response: any= await this.projectService.getProject(this.result.idProject).toPromise();
      this.project = response.message
      this.id = this.project!.idUser
      this.fetchUser();
    } catch (error) {
      console.log('error');
      
    }
  }

  async fetchUser(){
    try {
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.user = response.message
      console.log(this.user!.name);
      
    } catch (error) {
      console.log('error');
      
    }
  }

  deleteRequest(){
    this.id = this.authService.getId()
    try {

      this.requestService.deleteRequestResult(this.result!._id!, this.id).toPromise();
      
      this.toastr.error("La notificación ha sido borrada", "", {
        "positionClass": "toast-bottom-center",
      });
      
    } catch (error) {
      console.log('error');
      
    }
  }

}
