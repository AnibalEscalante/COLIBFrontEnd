import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './core/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor/landing',
    pathMatch: 'full'
  },
  {
    path: 'visitor',
    loadChildren: () => import('./visitor/visitor.module')
      .then(m => m.VisitorModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),
      canActivate: [UserGuard]
  },
  {
    path: '**',
    redirectTo: 'visitor/landing'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
