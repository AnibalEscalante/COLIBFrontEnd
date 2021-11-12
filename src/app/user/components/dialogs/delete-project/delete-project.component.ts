import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/models/project.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.less']
})
export class DeleteProjectComponent implements OnInit {

  public _id: string | null;
  public project: Project | null;
  

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {idProject: string},
  ) { 
    this.project = null
    this._id = null;
    
  }

  ngOnInit(): void {
  }
  async deleteProject(){
    try {
      await this.projectService.deleteProject(this.data.idProject).toPromise();
      console.log(this.data.idProject)
      
    }
    catch (error) {
      console.log('Algo ha salido mal');
    }
  }


}
