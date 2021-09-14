import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input()
  public projects!: Project;

  @Output() pruebaEvent = new EventEmitter<any>();
  
  @Output() projectList= new EventEmitter<Project>();

  constructor() { }

  ngOnInit(): void {

  }

  mandarInfo() {
    this.projectList.emit(this.projects);
  } 

}
