import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { RequestC } from 'src/app/core/models/requestC.model';
import { User } from 'src/app/core/models/user.model';
import { ProjectService } from 'src/app/core/services/project/project.service';
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
  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {
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
      this.projectName = response.message.title
      console.log(this.projectName);
      
    } catch (error) {
      console.log('error');
      
    }
  }

}
