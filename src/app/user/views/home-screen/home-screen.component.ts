import { Component, OnInit } from '@angular/core';
import { CreateProjectComponent } from '../../components/dialogs/create-project/create-project.component';
import {MatDialog} from '@angular/material/dialog';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.less']
})
export class HomeScreenComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  
  public projects: Project[] = [
    {
      _id:'1',
      title: 'Proyecto 1',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie nulla mus blandit condimentum eu tempus, egestas potenti cubilia urna etiam donec fringilla gravida non fames volutpat pharetra. Senectus etiam elementum aptent tincidunt habitant himenaeos, commodo potenti dictumst eu quis phasellus feugiat, integer varius quam in pulvinar. Sociosqu habitasse auctor dignissim id faucibus mauris eleifend facilisi facilisis, aenean felis consequat per cursus fames eget aptent, urna quam dis turpis senectus nec gravida ornare. Aliquam posuere diam sollicitudin mollis vestibulum cubilia, nunc vivamus commodo ut porttitor quis, nisi nibh phasellus convallis accumsan. Turpis interdum tortor ligula vestibulum metus posuere condimentum eu pretium, aliquet eleifend volutpat ultrices senectus quisque imperdiet eros, luctus class netus habitant sociosqu dapibus molestie aptent. Sodales duis diam etiam aliquet nunc dictum eu, mollis proin arcu faucibus risus rhoncus metus dui, litora quam egestas per himenaeos aliquam.',
      collaborators: [
        {
          _id: '1',
          name: 'Jorge',
          lastName: 'Polanco'
        },
        {
          _id: '2',
          name: 'Rafael',
          lastName: 'Solis'
        },
        {
          _id: '3',
          name: 'Gabriela',
          lastName: 'Gonzalez'
        },
      ],
      disciplines: [
        {
          _id: '1',
          name: 'Ingeniería en Computación'
        },
        {
          _id: '2',
          name: 'Virología'
        },
      ],
      finishedDate: '26 de Septiembre, 2021',
      state: 'activo'
    },
    {
      _id:'2',
      title: 'Proyecto 2',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie nulla mus blandit condimentum eu tempus, egestas potenti cubilia urna etiam donec fringilla gravida non fames volutpat pharetra. Senectus etiam elementum aptent tincidunt habitant himenaeos, commodo potenti dictumst eu quis phasellus feugiat, integer varius quam in pulvinar. Sociosqu habitasse auctor dignissim id faucibus mauris eleifend facilisi facilisis, aenean felis consequat per cursus fames eget aptent, urna quam dis turpis senectus nec gravida ornare. Aliquam posuere diam sollicitudin mollis vestibulum cubilia, nunc vivamus commodo ut porttitor quis, nisi nibh phasellus convallis accumsan. Turpis interdum tortor ligula vestibulum metus posuere condimentum eu pretium, aliquet eleifend volutpat ultrices senectus quisque imperdiet eros, luctus class netus habitant sociosqu dapibus molestie aptent. Sodales duis diam etiam aliquet nunc dictum eu, mollis proin arcu faucibus risus rhoncus metus dui, litora quam egestas per himenaeos aliquam.',
      collaborators: [
        {
          _id: '1',
          name: 'Jorge',
          lastName: 'Polanco'
        },
        {
          _id: '2',
          name: 'Rafael',
          lastName: 'Solis'
        },
        {
          _id: '3',
          name: 'Gabriela',
          lastName: 'Gonzalez'
        },
      ],
      disciplines: [
        {
          _id: '1',
          name: 'Ingeniería en Computación'
        },
        {
          _id: '2',
          name: 'Virología'
        },
      ],
      finishedDate: '26 de Septiembre, 2021',
      state: 'activo'

    },
    {
      _id:'3',
      title: 'Proyecto 3',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie nulla mus blandit condimentum eu tempus, egestas potenti cubilia urna etiam donec fringilla gravida non fames volutpat pharetra. Senectus etiam elementum aptent tincidunt habitant himenaeos, commodo potenti dictumst eu quis phasellus feugiat, integer varius quam in pulvinar. Sociosqu habitasse auctor dignissim id faucibus mauris eleifend facilisi facilisis, aenean felis consequat per cursus fames eget aptent, urna quam dis turpis senectus nec gravida ornare. Aliquam posuere diam sollicitudin mollis vestibulum cubilia, nunc vivamus commodo ut porttitor quis, nisi nibh phasellus convallis accumsan. Turpis interdum tortor ligula vestibulum metus posuere condimentum eu pretium, aliquet eleifend volutpat ultrices senectus quisque imperdiet eros, luctus class netus habitant sociosqu dapibus molestie aptent. Sodales duis diam etiam aliquet nunc dictum eu, mollis proin arcu faucibus risus rhoncus metus dui, litora quam egestas per himenaeos aliquam.',
      collaborators: [
        {
          _id: '1',
          name: 'Jorge',
          lastName: 'Polanco'
        },
        {
          _id: '2',
          name: 'Rafael',
          lastName: 'Solis'
        },
        {
          _id: '3',
          name: 'Gabriela',
          lastName: 'Gonzalez'
        },
      ],
      disciplines: [
        {
          _id: '1',
          name: 'Ingeniería en Computación'
        },
        {
          _id: '2',
          name: 'Virología'
        },
      ],
      finishedDate: '26 de Septiembre, 2021',
      state: 'activo'
    }
  ]
  ngOnInit(): void {

  }



  //show info component//
  projectinfo!: Project;
  recibir(event: any) {
    this.projectinfo = event;
  }

  //show component//
  public isshowinfo!: boolean;
  recibirIsShowInfo(event: any){
    this.isshowinfo = event
  }

  openCreateProject(){
    let dialogRef = this.dialog.open(CreateProjectComponent, {
      height: '770px',
      width: '1000px',
    });
  }
}
