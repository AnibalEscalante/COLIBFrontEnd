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
  
  public showinfo: boolean = false;
  public projectId: any;
  public colorState: string = '';

  constructor() {}

  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
  }

  sendProjectInfo() {
    this.readMoreEvent.emit(this.project);
  }

  showInfo() {
    console.log(this.project);
  }

  showState(): string {
    if (this.project.state === 'Abierto') {
      this.colorState = '#198754';
    }
    if (this.project.state === 'Cerrado') {
      this.colorState = '#dc3545';
    }

    return this.colorState;
  }

}
