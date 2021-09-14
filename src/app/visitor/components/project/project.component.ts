import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {
  
  @Output() pruebaEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  mandarInfo() {
    this.pruebaEvent.emit('hola!');
  }

}
