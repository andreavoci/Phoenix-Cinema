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
import { ProfileComponent } from './profile/profile.components';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { RiservataComponent } from './riservata/riservata.component';
import { AcquistoComponent } from './acquisto/acquisto.component';
import { AuthGuard } from './services/auth.guard';
import { RegistrazioneComponent } from './registrazione/registrazione.component';
import { ResFornitoreComponent } from './riservata/fornitore.component';
import { ResBiglietteriaComponent } from './riservata/biglietteria.component';
import { ResHrComponent } from './riservata/hr.component';
import { ResFornituraComponent } from './riservata/fornitura.component';
import { ResProiezioneComponent } from './riservata/proiezione.component';


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
  },
  {
    path:'profilo',
    component: ProfileComponent
  },
  {
    path:'about-us',
    component: AboutUsComponent
  },
  {
    path:'riservata',
    component: RiservataComponent
  },
  {
    path:'riservata/:type',
    component: RiservataComponent
  },
  {
    path: 'acquisto/:id',
    component: AcquistoComponent
  },
  {
    path: 'registrazione',
    component: RegistrazioneComponent
  },
  {
    path: 'riservato/fornitore',
    component: ResFornitoreComponent
  },
  {
    path: 'riservato/biglietteria',
    component: ResBiglietteriaComponent
  },
  {
    path: 'riservato/hr',
    component: ResHrComponent
  },
  {
    path: 'riservato/fornitura',
    component: ResFornituraComponent
  },
  {
    path: 'riservato/proiezione',
    component: ResProiezioneComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
