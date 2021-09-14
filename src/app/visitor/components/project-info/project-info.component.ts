import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.less']
})
export class ProjectInfoComponent implements OnInit {
  
  @Input() mostrar: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log(this.mostrar);
    
  }
  

}
