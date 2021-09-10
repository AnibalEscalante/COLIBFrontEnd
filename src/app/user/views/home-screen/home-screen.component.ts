import { Component, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCreateProject(){
    let dialogRef = this.dialog.open(CreateProjectComponent, {
      height: '770px',
      width: '1000px',
    });
  }
}
