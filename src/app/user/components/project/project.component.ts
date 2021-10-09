import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input()
  public project!: Project;
  
  @Output() projectList= new EventEmitter<Project>();

  @Output() show= new EventEmitter<boolean>();
  
  public showinfo: boolean = false;
  public projectId: any;
  public colorState: string = '';

  constructor() { }

  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
  }
  
  mandarInfo() {
    this.projectList.emit(this.project);
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
