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
import { UserGuard } from '../core/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'home',
        component: HomeScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'userinfo',
        component: UserInfoScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'userinfo/:id',
        component: UserInfoScreenComponent,
        data: { routeName: "usuario" },
        canActivate: [UserGuard]
      },
      {
        path: 'contacts',
        component: ContactsScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'myprojects',
        component: MyProjectsScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'projectinfo/:id',
        component: ProjectInfoScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'requests',
        component: RequestsScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'savedprojects',
        component: SavedProjectsScreenComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'collabprojects',
        component: CollabProjectsScreenComponent,
        canActivate: [UserGuard]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
