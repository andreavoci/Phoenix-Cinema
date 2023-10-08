import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BigliettoComponent } from './biglietto/biglietto.component';
import { PellicolaComponent } from './pellicola/pellicola.component';
import { ProgrammazioneComponent } from './programmazione/programmazione.component';
import { CarrelloComponent } from './carrello/carrello.component';
import { OrdineComponent } from './ordine/ordine.component';


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
  },
  {
    path:'pellicola',
    component: PellicolaComponent
  },
  {
    path:'pellicola/:id',
    component: ProgrammazioneComponent
  },
  {
    path:'carrello',
    component: CarrelloComponent
  },
  {
    path:'ordini',
    component: OrdineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
