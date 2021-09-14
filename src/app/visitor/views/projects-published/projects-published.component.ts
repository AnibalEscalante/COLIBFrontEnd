import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-published',
  templateUrl: './projects-published.component.html',
  styleUrls: ['./projects-published.component.less']
})
export class ProjectsPublishedComponent implements OnInit {
  
  info: any;

  constructor() {}

  ngOnInit(): void {
  }
  

  recibir(event: any) {
    this.info = event;
  }

}
