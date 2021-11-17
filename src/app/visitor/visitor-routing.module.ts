import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from '../core/guards/logged/logged.guard';
import { HomeScreenComponent } from './views/home-screen/home-screen.component';
import { LandingScreenComponent } from './views/landing-screen/landing-screen.component';
import { LoginScreenComponent } from './views/login-screen/login-screen.component';
import { RegisterScreenComponent } from './views/register-screen/register-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor/homepage',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingScreenComponent
  },
  {
    path: 'home',
    component: HomeScreenComponent
  },
  {
    path: 'register',
    component: RegisterScreenComponent
  },
  {
    path: 'login',
    component: LoginScreenComponent
  },
  {
    path: '**',
    redirectTo: 'visitor/landing'
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule { }
