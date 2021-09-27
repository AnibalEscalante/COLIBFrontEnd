import { Component, Input, OnInit} from '@angular/core';
import { Project } from 'src/app/core/models/project.model';


@Component({
  selector: 'app-my-projects-saved',
  templateUrl: './my-projects-saved.component.html',
  styleUrls: ['./my-projects-saved.component.less']
})
export class MyProjectsSavedComponent implements OnInit {

  @Input()
  public projects!: Project;

  constructor() { }

  ngOnInit(): void {

  }

}
