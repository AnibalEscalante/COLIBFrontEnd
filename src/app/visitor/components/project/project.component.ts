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

  @Output() show= new EventEmitter<boolean>();
  
  public showinfo: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  showComponent(){
    this.showinfo = true;
    this.show.emit(this.showinfo)
  }

  sendProjectInfo() {
    this.readMoreEvent.emit(this.project);
  }

}
