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
  
  @Output() projectList= new EventEmitter<Project>();

  @Output() show= new EventEmitter<boolean>();
  
  public showinfo: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
  }
  
  mandarInfo() {
    this.projectList.emit(this.projects);
  } 
}
