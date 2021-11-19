import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent implements OnInit {
  
  @Input() projectInfo!: Project | null;

  @Input() showHideComponent!: boolean;
  
  public isShow: boolean;
  public colorState: string;
  public showCreateDate: string | null;
  public showFinishDate: string | null;

  constructor(
  ) {
    this.colorState = '';
    this.isShow = true;
    this.showCreateDate = '';
    this.showFinishDate = '';
  }

  ngOnInit(): void {
    this.isShow = this.showHideComponent;
  }

  public toggleShow() {
    this.isShow = ! this.showHideComponent;
  }

  public showState(): string {
    if (this.projectInfo) {
      if (this.projectInfo.state === 'Open') {
        this.colorState = '#379831';
      }
      if (this.projectInfo.state === 'Close') {
        this.colorState = '#dc3545';
      }
    }
    return this.colorState;
  }

}
