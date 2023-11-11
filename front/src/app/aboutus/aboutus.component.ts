import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { Mansione } from '../model/mansione';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-about-us',
  template: `
  <div id="aboutUsDiv" class="about-us-container">
      <div class="about-us-header">
        <h2>About Us</h2>
      </div>
      <div class="section">
        <div class="description">
          <strong>Situato nel cuore di Rende, il Phoenix Cinema è più di un cinema: è un'esperienza straordinaria. Fondato nel 2006 dai visionari del cinema Aldo, Giovanni e Giacomo, il nostro cinema è stato creato con passione e dedizione per portare il meglio del cinema direttamente a voi.</strong>
          <strong>Abbiamo plasmato una destinazione cinematografica che celebra il potere delle storie. Ogni visita al Phoenix Cinema è un viaggio attraverso mondi fantastici, un'opportunità per ridere, piangere e condividere emozioni uniche sul grande schermo.</strong>
          <strong>Le nostre strutture di alta qualità, la vasta selezione di film e l'impegno costante per l'innovazione ci rendono una presenza ineguagliabile nella comunità di Rende e oltre.</strong>
          <strong>Il nostro cinema è il luogo ideale per serate speciali con amici e familiari. Organizziamo eventi speciali, proiezioni private e molto altro ancora. Siamo qui per soddisfare le vostre esigenze specifiche e per condividere la magia delle storie e il potere delle immagini in movimento.</strong>
        </div>
      </div>
      <div class="section">
        <div class="member">
          <img src="https://www.agidi.it/upload/artisti/imgslide/17/thumbnail/GDX_%C2%A9Giovanni%20De%20Sandre_6576_500x500.jpg" alt="Aldo Image" class="member-image">
          <div class="member-description">
            <strong>Aldo</strong>
            <p> è il cuore pulsante di Phoenix Cinema. La sua visione e passione per il cinema hanno dato vita a questa avventura straordinaria. Aldo è il creatore di opportunità e il motore di questa esperienza cinematografica unica.</p>
          </div>
        </div>
        <div class="member">
          <img src="https://www.agidi.it/upload/artisti/imgslide/16/thumbnail/GDX_%C2%A9Giovanni%20De%20Sandre_6554_500X500.jpg" alt="Giovanni Image" class="member-image">
          <div class="member-description">
            <strong>Giovanni</strong>
            <p> è la mente strategica dietro il successo di Phoenix Cinema. Il suo impegno nel garantire un ambiente di lavoro stimolante è fondamentale per il benessere dei dipendenti e la qualità dell'esperienza offerta al pubblico.</p>
          </div>
        </div>
        <div class="member">
          <img src="https://www.agidi.it/upload/artisti/imgslide/13/thumbnail/GDX_%C2%A9Giovanni%20De%20Sandre_6536_LD_quad.jpg" alt="Giacomo Image" class="member-image">
          <div class="member-description">
            <strong>Giacomo</strong>
            <p> Con la sua dedizione e il suo impegno costante, Giacomo contribuisce in modo significativo a rendere questo cinema un luogo straordinario. La sua presenza rassicurante e la sua passione per l'arte cinematografica sono evidenti in tutto ciò che fa.</p>
          </div>
        </div>
      </div>
      <br><br><br>
        <div style="text-align: center;">
        <h3 style="color: white; text-align: center;">Candidati per un Lavoro</h3>
        </div>
        <br><br>
        <p style="color: white;">Siamo sempre alla ricerca di persone appassionate per unirsi al nostro team. Lavorare al Phoenix Cinema è un'opportunità unica per far parte del mondo del cinema. Candidati oggi e condividi la tua passione!</p>
        <br><br><br>
        <div>
        <label for="jobSelect" style="color: white;">Seleziona un lavoro: </label>
            <select id="jobSelect" name="jobTitle" [(ngModel)]="selectedJob">
              <option *ngFor="let mansione of mansioni" [ngValue]="mansione">{{mansione}}</option>
            </select>
        </div>
        <br>
        <div style="text-align: center;">
        <button (click)="submitApplication()" style="color: white; width: 200px;">Candidati</button>
        </div>
        <!-- <div class="section">
        <div *ngIf="showApplicationForm" class="application-form">
          <form #candidaturaForm="ngForm" (ngSubmit)="submitApplication(candidaturaForm.value)">
            <label for="jobSelect" style="color: white;">Seleziona un lavoro: </label>
            <select id="jobSelect" name="jobTitle" [(ngModel)]="selectedJob">
              <option *ngFor="let mansione of mansioni" [ngValue]="mansione">{{mansione}}</option>
            </select><br><br>
            <label for="name" style="color: white;">Nome:</label><br><br>
            <input type="text" id="name" name="name" [(ngModel)]="applicantName"><br><br>
            <label for="surname" style="color: white;">Cognome:</label><br><br>
            <input type="text" id="surname" name="surname" [(ngModel)]="applicantSurname"><br><br>
            <label for="email" style="color: white;">Email:</label><br><br>
            <input type="email" id="email" name="email" [(ngModel)]="applicantEmail"><br><br>
            <label for="phone" style="color: white;">Numero di telefono:</label><br><br>
            <input type="tel" id="phone" name="phone" [(ngModel)]="applicantPhone"><br><br>
            <button type="submit" style="color: white;">Invia Candidatura</button>
          </form>
        </div>
      </div> -->
      <br><br><br>
      <div class="social-news-container" style="display: flex; justify-content: space-between;">
        <div class="newsletter-box column" style="flex: 1; text-align: center; background-color: white;">
          <h4 style="text-align: center;">Iscriviti alla Newsletter</h4>
          <form>
            <div class="input-group">
              <input type="text" placeholder="Indirizzo Email" #emailInput>
            </div>
            <div class="input-group" style="text-align: center;">
              <button type="button" (click)="subscribe(emailInput.value)">Iscriviti</button>
            </div>
            <div *ngIf="!isEmailValid" class="error-message" style="text-align: center;">
              Indirizzo email non valido.
            </div>
            <div *ngIf="subscriptionConfirmed" class="confirmation-message" style="text-align: center;">
              Ottimo! Abbiamo ricevuto la tua iscrizione.
            </div>
          </form>
        </div>
        <div class="center-logo" style="display: flex; align-items: center; justify-content: center;">
          <img src="http://localhost:4200/assets/image/logo-phoenix.png" alt="Logo del Cinema">
        </div>
        <div class="contact-us-box column" style="flex: 1; background-color: white; padding: 10px; border: 2px solid #333; border-radius: 10px; color: #333; text-align: center; margin-left: 20px;">
          <h3>Contattaci Per Qualsiasi Necessità!</h3>
          <div class="social-media">
            <div class="social-logo">
              <a href="https://www.instagram.com/Phoenix_CinemaRende" target="_blank">
                <img src="https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg" alt="Instagram Logo">
              </a>
              <strong>@Phoenix_Rende_Cinema</strong>
            </div>
            <div class="social-logo">
              <a href="https://www.facebook.com/PhoenixCinemaRende" target="_blank">
                <img src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg" alt="Facebook Logo">
              </a>
              <strong>@PhoenixCinemaRende</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-us-container {
      display: flex;
      background: rgb(250,108,20);
      background: radial-gradient(circle, rgba(250,108,20,1) 0%, rgba(90,30,4,1) 100%);
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
    }
    .social-news-container {
      display: flex;
      justify-content: space-between;
      width: 70%;
      margin-top: 20px;
    }
    .newsletter-box {
      flex: 1;
      text-align: left;
      padding: 0 10px;
      background-color: white;
      border: 2px solid #333;
      border-radius: 10px;
      margin-right: 10px;
    }
    .about-us-header {
      font-size: 24px;
      color: #333;
      background-color: white;
      padding: 10px;
      border: 2px solid #333;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
    .description {
      color: #333;
      max-width: 60%;
      background: rgba(255, 255, 255, 0.9);
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
      margin: 0 auto;
      text-align: center;
    }
    .member {
      text-align: center;
      max-width: 30%;
    }
    .member-image {
      width: 130px;
      height: 130px;
      border: 2px solid #333;
      border-radius: 50%;
    }
    .member-description {
      max-width: 100%;
      color: white;
    }
    .contact-us-box,
    .newsletter-box {
      background-color: white;
      padding: 10px;
      border: 2px solid #333;
      border-radius: 10px;
      color: #333;
      text-align: center;
    }
    .confirmation-message,
    .error-message {
      color: #00FF00;
    }
    .error-message {
      color: #FF0000;
    }
    .social-media {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 10px;
      background-color: white;
      border: 2px solid #333;
      border-radius: 10px;
      color: #333;
    }
    .social-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 11px;
    }
    .social-logo img {
      max-width: 30px;
      max-height: 30px;
    }
    .center-logo img {
      max-width: 90px;
      max-height: 90px;
      border-radius: 50%;
      background-color: white;
      padding: 5px;
      border: 2px solid #333;
    }
    .input-group {
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #333;
      border-radius: 5px;
    }
    button {
      width: 100%;
      padding: 10px;
      border: 2px solid #333;
      border-radius: 5px;
      background-color: #333;
      color: white;
      cursor: pointer;
    }

    .application-form {
      margin-top: 20px;
      text-align: center;
    }
  `]
})
export class AboutUsComponent {
  subscriptionConfirmed: boolean = false;
  isEmailValid: boolean = true;
  showApplicationForm: boolean = false;
  selectedJob: string = "";
  applicantName: string = "";
  applicantSurname: string = "";
  applicantEmail: string = "";
  applicantPhone: string = "";
  mansioni: string[] = this.enumValues(Mansione);
  userId = -1
  user: User | null = null

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    if (AuthService.getToken('id')) {
      this.userId = Number(AuthService.getToken('id'));
    }
    const authToken = AuthService.getToken("token");
    this.getUser();
  }

  getUser(){
    this.http.get<User>(Util.userServerUrl + "/" + this.userId).subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }

  enumValues(enumType: any): string[]{
    return Object.keys(enumType).map(key => enumType[key]);
}

  subscribe(email: string) {
    if (this.validateEmail(email)) {
      this.subscriptionConfirmed = true;
      this.isEmailValid = true;
    } else {
      this.isEmailValid = false;
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  openApplicationForm() {
    this.showApplicationForm = true;
  }

  submitApplication() {
    if(this.user){
    const form = {
      nome: this.user?.nome,
      cognome: this.user?.cognome,
      email: this.user?.email,
      jobTitle: this.selectedJob
    }
    console.log(form);
    this.http.post(Util.candidatureServerUrl+"/submit", form)
      .subscribe(response => {
        console.log('Candidatura inviata con successo', response);
      }, error => {
        console.error("Errore nell'invio della candidatura", error);
      });
  }else{
    window.location.href = '/login'
  }
}
}

