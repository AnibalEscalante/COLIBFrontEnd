import { DatePipe } from '@angular/common';
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
  public name: string;

  constructor(
    private datepipe: DatePipe
  ) {
    this.colorState = '';
    this.isShow = true;
    this.showCreateDate = '';
    this.showFinishDate = '';
    this.name = ''
  }

  ngOnInit(): void {
    this.isShow = this.showHideComponent;
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
    this.showDate();
    return this.colorState;
  }

  public showDate() {
    this.showCreateDate = this.datepipe.transform(this.projectInfo!.createdAt, 'dd/MM/yyyy');
    this.showFinishDate = this.datepipe.transform(this.projectInfo!.finishDate, 'dd/MM/yyyy');
  }

}
