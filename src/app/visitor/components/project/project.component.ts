import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input() 
  project!: Project;

  @Output() readMoreEvent = new EventEmitter<any>();

  @Output() show = new EventEmitter<boolean>();
  
  public showInfo: boolean;
  public projectId: any;
  public colorState: string;

  constructor() {
    this.showInfo = false,
    this.colorState = ''
  }

  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
  }
  
  public showComponent(){
    this.showInfo = true;
    this.show.emit(this.showInfo)
  }

  public sendProjectInfo() {
    this.readMoreEvent.emit(this.project);
  }

  public showState(): string {
    if (this.project.state === 'Open') {
      this.colorState = '#379831';
    }
    if (this.project.state === 'Close') {
      this.colorState = '#dc3545';
    }
    return this.colorState;
  }

}
