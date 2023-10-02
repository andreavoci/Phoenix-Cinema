import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BigliettoComponent } from './biglietto/biglietto.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'user',
    component: UserComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'biglietto',
    component: BigliettoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
