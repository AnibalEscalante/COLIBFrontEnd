import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import { ProjectComponent } from './components/project/project.component';
import { ContactsScreenComponent } from './views/contacts-screen/contacts-screen.component';
import { UserInfoScreenComponent } from './views/user-info-screen/user-info-screen.component';
import { SavedProjectsScreenComponent } from './views/saved-projects-screen/saved-projects-screen.component';
import { MyProjectsScreenComponent } from './views/my-projects-screen/my-projects-screen.component';
import { RequestsScreenComponent } from './views/requests-screen/requests-screen.component';
import { ProjectInfoScreenComponent } from './views/project-info-screen/project-info-screen.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    NavbarComponent,
    HomeScreenComponent,
    ProjectComponent,
    ContactsScreenComponent,
    UserInfoScreenComponent,
    SavedProjectsScreenComponent,
    MyProjectsScreenComponent,
    RequestsScreenComponent,
    ProjectInfoScreenComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatChipsModule,
    MatFormFieldModule
  ]
})
export class UserModule { }
