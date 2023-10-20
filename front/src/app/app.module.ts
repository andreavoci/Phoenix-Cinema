import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
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
import { SharedService } from './services/shared.service';
import { AuthGuard } from './services/auth.guard';
import { RegistrazioneComponent } from './registrazione/registrazione.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    BigliettoComponent,
    PellicolaComponent,
    ProgrammazioneComponent,
    CarrelloComponent,
    OrdineComponent,
    ProfileComponent,
    AboutUsComponent,
    RiservataComponent,
    AcquistoComponent,
    RegistrazioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SharedService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
