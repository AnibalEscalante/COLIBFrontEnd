import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';

@Component({
  selector: 'app-saved-projects-screen',
  templateUrl: './saved-projects-screen.component.html',
  styleUrls: ['./saved-projects-screen.component.less']
})
export class SavedProjectsScreenComponent implements OnInit {
  
  public projects: Project[] = [

    {
      _id:'1',
      title: 'Proyecto guardado 1',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie nulla mus blandit condimentum eu tempus, egestas potenti cubilia urna etiam donec fringilla gravida non fames volutpat pharetra. Senectus etiam elementum aptent tincidunt habitant himenaeos, commodo potenti dictumst eu quis phasellus feugiat, integer varius quam in pulvinar. Sociosqu habitasse auctor dignissim id faucibus mauris eleifend facilisi facilisis, aenean felis consequat per cursus fames eget aptent, urna quam dis turpis senectus nec gravida ornare. Aliquam posuere diam sollicitudin mollis vestibulum cubilia, nunc vivamus commodo ut porttitor quis, nisi nibh phasellus convallis accumsan. Turpis interdum tortor ligula vestibulum metus posuere condimentum eu pretium, aliquet eleifend volutpat ultrices senectus quisque imperdiet eros, luctus class netus habitant sociosqu dapibus molestie aptent. Sodales duis diam etiam aliquet nunc dictum eu, mollis proin arcu faucibus risus rhoncus metus dui, litora quam egestas per himenaeos aliquam.',
      idColaborators: [
        {
          _id: '1',
          name: 'Jorge',
          lastName: 'Polanco'
        },
        {
          _id: '2',
          name: 'Gabriela',
          lastName: 'Gonzalez'
        },
        {
          _id: '3',
          name: 'Rafael',
          lastName: 'Solis'
        },
      ],
      idDisciplines: [
        {
          _id: '1',
          name: 'Ingeniería en Computación'
        },
        {
          _id: '2',
          name: 'Virología'
        },
      ],
      idSkills: [
        {
          _id: '1',
          name: 'C#'
        },
        {
          _id: '2',
          name: 'Java'
        },
        {
          _id: '3',
          name: 'Phyton'
        },
        {
          _id: '4',
          name: 'Virología animal'
        },
        {
          _id: '5',
          name: 'Virología epidemica'
        },
        {
          _id: '6',
          name: 'Virología marina'
        }
      ],
      finishedDate: '26 de Septiembre, 2021',
      state: 'activo'
    },
    {
      _id:'2',
      title: 'Proyecto guardado 2',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit molestie nulla mus blandit condimentum eu tempus, egestas potenti cubilia urna etiam donec fringilla gravida non fames volutpat pharetra. Senectus etiam elementum aptent tincidunt habitant himenaeos, commodo potenti dictumst eu quis phasellus feugiat, integer varius quam in pulvinar. Sociosqu habitasse auctor dignissim id faucibus mauris eleifend facilisi facilisis, aenean felis consequat per cursus fames eget aptent, urna quam dis turpis senectus nec gravida ornare. Aliquam posuere diam sollicitudin mollis vestibulum cubilia, nunc vivamus commodo ut porttitor quis, nisi nibh phasellus convallis accumsan. Turpis interdum tortor ligula vestibulum metus posuere condimentum eu pretium, aliquet eleifend volutpat ultrices senectus quisque imperdiet eros, luctus class netus habitant sociosqu dapibus molestie aptent. Sodales duis diam etiam aliquet nunc dictum eu, mollis proin arcu faucibus risus rhoncus metus dui, litora quam egestas per himenaeos aliquam.',
      idColaborators: [
        {
          _id: '1',
          name: 'Jorge',
          lastName: 'Polanco'
        },
        {
          _id: '2',
          name: 'Gabriela',
          lastName: 'Gonzalez'
        },
        {
          _id: '3',
          name: 'Rafael',
          lastName: 'Solis'
        },
      ],
      idDisciplines: [
        {
          _id: '1',
          name: 'Ingeniería en Computación'
        },
        {
          _id: '2',
          name: 'Virología'
        },
      ],
      idSkills: [
        {
          _id: '1',
          name: 'C#'
        },
        {
          _id: '2',
          name: 'Java'
        },
        {
          _id: '3',
          name: 'Phyton'
        },
        {
          _id: '4',
          name: 'Virología animal'
        },
        {
          _id: '5',
          name: 'Virología epidemica'
        },
        {
          _id: '6',
          name: 'Virología marina'
        }
      ],
      finishedDate: '26 de Septiembre, 2021',
      state: 'activo'

    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
