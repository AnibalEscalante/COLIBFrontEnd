import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent implements OnInit {
  
  @Input() projectInfo!: Project;

  @Input() showHideComponent!: boolean;

  constructor() { }

  isShown: boolean = true;
  public colorState: string = '';

  ngOnInit(): void {
    this.isShown = this.showHideComponent;
  }

  toggleShow() {
    this.isShown = ! this.showHideComponent;
  }

  showState(): string {
    if (this.projectInfo.state === 'Abierto') {
      this.colorState = '#198754';
    }
    if (this.projectInfo.state === 'Cerrado') {
      this.colorState = '#dc3545';
    }

    return this.colorState;
  }

}
