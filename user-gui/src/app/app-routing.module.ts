import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateSuccessComponent } from './pages/user-create/user-create-success/user-create-success.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';

const routes: Routes = [
  {
    path: 'user-create',
    component: UserCreateComponent,
  },
  {
    path: 'user-create-success',
    component: UserCreateSuccessComponent,
  },
  {
    path: '',
    redirectTo: '/user-create',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
