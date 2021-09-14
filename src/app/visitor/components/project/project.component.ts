import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Input() project!: Project;
  @Output() readMoreEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  sendProjectInfo() {
    this.readMoreEvent.emit(this.project);
  }

}
