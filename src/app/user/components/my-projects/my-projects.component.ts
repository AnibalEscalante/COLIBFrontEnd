import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.less']
})
export class MyProjectsComponent implements OnInit {
  @Input()
  public project!: Project;

  constructor() { }

  ngOnInit(): void {

  }


}
