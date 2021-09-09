import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { ProjectsPublishedComponent } from './views/projects-published/projects-published.component';
import { RegisterScreenComponent } from './views/register-screen/register-screen.component';

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
        path: 'publications',
        component: ProjectsPublishedComponent
      },
    ]
  },
  {
    path: 'register',
    component: RegisterScreenComponent
  },
  {
    path: 'login',
    component: LoginScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
