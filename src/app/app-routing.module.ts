import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'visitor/home',
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
    .then(m => m.UserModule)
  },
  /* {
    path: '**',
    redirectTo: 'visitor/home'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
