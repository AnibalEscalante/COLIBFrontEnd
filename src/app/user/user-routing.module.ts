import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CollabProjectsScreenComponent } from './views/collab-projects-screen/collab-projects-screen.component';
import { ContactsScreenComponent } from './views/contacts-screen/contacts-screen.component';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import { MyProjectsScreenComponent } from './views/my-projects-screen/my-projects-screen.component';
import { ProjectInfoScreenComponent } from './views/project-info-screen/project-info-screen.component';
import { RequestsScreenComponent } from './views/requests-screen/requests-screen.component';
import { SavedProjectsScreenComponent } from './views/saved-projects-screen/saved-projects-screen.component';
import { UserInfoScreenComponent } from './views/user-info-screen/user-info-screen.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'home',
        component: HomeScreenComponent
      },
      {
        path: 'userinfo',
        component: UserInfoScreenComponent
      },
      {
        path: 'userinfo/:id',
        component: UserInfoScreenComponent,
        data: {routeName: "usuario"}
      },
      
      {
        path: 'contacts',
        component: ContactsScreenComponent
      },
      {
        path: 'myprojects',
        component: MyProjectsScreenComponent
      },
      {
        path: 'projectinfo/:id',
        component: ProjectInfoScreenComponent
      },
      {
        path: 'requests',
        component: RequestsScreenComponent
      },
      {
        path: 'savedprojects',
        component: SavedProjectsScreenComponent
      },
      {
        path: 'collabprojects',
        component: CollabProjectsScreenComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
