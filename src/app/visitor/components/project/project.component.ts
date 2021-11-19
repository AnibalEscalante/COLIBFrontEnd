import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { DatePipe } from '@angular/common';

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

  @Output() dates = new EventEmitter<any>();
  
  public showInfo: boolean;
  public projectId: any;
  public colorState: string;
  public showCreateDate: string | null;
  public showFinishDate: string | null;

  constructor(
    private datepipe: DatePipe
  ) {
    this.showInfo = false,
    this.colorState = '',
    this.showCreateDate = '',
    this.showFinishDate = ''
  }

  ngOnInit(): void {
    this.projectId = 'projecto' + this.project._id;
    this.showDate();
  }

  public sendDates() {
    this.dates.emit({
      createDate: this.showCreateDate,
      finishDate: this.showFinishDate
    });
  }
  
  public showComponent(){
    this.showInfo = true;
    this.show.emit(this.showInfo)
  }

  public sendProjectInfo() {
    this.readMoreEvent.emit(this.project);
    this.sendDates();
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

  public showDate() {
    this.showCreateDate = this.datepipe.transform(this.project.createdAt, 'dd/MM/yyyy');
    this.showFinishDate = this.datepipe.transform(this.project.finishDate, 'dd/MM/yyyy');
  }

}
