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
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.less']
})
export class RequestsComponent implements OnInit {
  
  @Input() public request: RequestC | null;
  
  public id: string | null;
  public senderName!: string;
  public projectName!: string;
  public projectInfo: Project | null;
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthService,
    private requestService: RequestService,
    private toastr: ToastrService
  ) {
    this.projectInfo = null;
    this.request = null;
    this.id = null;
   }

  ngOnInit(): void {
    this.fetchUserSender();
    this.fetchProjectUserSender();
  }

  async fetchUserSender(){
    try {
      console.log(this.request)
      this.id = this.request!.idUserSender
      const response: any= await this.userService.getUser(this.id!).toPromise();
      this.senderName = response.message.name
      console.log(this.senderName);
      
      
    } catch (error) {
      console.log('error');
    }
  }

  async fetchProjectUserSender(){
    try {
      console.log(this.request)
      this.id = this.request!.idProject
      const response: any= await this.projectService.getProject(this.id!).toPromise();
      this.projectInfo = response.message;
      this.projectName = response.message.title
      console.log(this.projectName);
      
    } catch (error) {
      console.log('error');
      
    }
  }
  async collaborater(){
    this.id = this.authService.getId()
    try {
      await this.requestService.registNewRequestReply(this.id, this.request!.idProject, this.request!.idUserSender).toPromise();
      
      this.toastr.success("Peticion enviada con exito, espere hasta que su peticion sea procesada", "", {
        "positionClass": "toast-bottom-center",
      });
    } catch (error) {
      console.log('error')
    }
  }

}
