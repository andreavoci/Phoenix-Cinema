import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  template: `
    <div id="aboutUsDiv" class="about-us-container">
      <div class="about-us-header">
        <h2>-About Us-</h2>
      </div>
      <div class="about-us-content">
        <div class="description">
          <p>Situato nel cuore di Rende, il Phoenix Cinema è più di un cinema: è un'esperienza straordinaria. Fondato nel 2012 dai visionari del cinema Aldo, Giovanni e Giacomo, il nostro cinema è stato creato con passione e dedizione per portare il meglio del cinema direttamente a voi.</p>
          <p>Abbiamo plasmato una destinazione cinematografica che celebra il potere delle storie. Ogni visita al Phoenix Cinema è un viaggio attraverso mondi fantastici, un'opportunità per ridere, piangere e condividere emozioni uniche sul grande schermo.</p>
          <p>Le nostre strutture di alta qualità, la vasta selezione di film e l'impegno costante per l'innovazione ci rendono una presenza ineguagliabile nella comunità di Rende e oltre.</p>
          <p>Il nostro cinema è il luogo ideale per serate speciali con amici e familiari. Organizziamo eventi speciali, proiezioni private e molto altro ancora. Siamo qui per soddisfare le vostre esigenze specifiche e per condividere la magia delle storie e il potere delle immagini in movimento.</p>
        </div>
      </div>
      <div class="about-us-image-container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Phoenix_Cinema_frontage_at_night.jpg" alt="About Us Image" class="about-us-image">
      </div>
      <div class="contact-us-box">
        <h3>Contattaci Per Qualsiasi Necessità!</h3>
        <div class="social-media">
          <div class="social-logo">
            <a href="https://www.instagram.com/Phoenix_CinemaRende" target="_blank">
              <img src="https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg" alt="Instagram Logo">
            </a>
            <p>@Phoenix_Rende_Cinema</p>
          </div>
          <div class="social-logo">
            <a href="https://www.facebook.com/PhoenixCinemaRende" target="_blank">
              <img src="https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg" alt="Facebook Logo">
            </a>
            <p>@PhoenixCinemaRende</p>
          </div>
        </div>
      </div>
      <div class="newsletter-box">
        <h4>Iscriviti alla Newsletter</h4>
        <form>
          <div class="input-group">
            <input type="text" placeholder="Nome Utente">
          </div>
          <div class="input-group">
            <input type="password" placeholder="Password">
          </div>
          <div class="input-group">
            <button type="submit">Iscriviti</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .about-us-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
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

    .about-us-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 20px;
    }

    .description {
      color: #333;
      max-width: 60%;
      background: rgba(255, 255, 255, 0.8);
      padding: 20px;
      border: 2px solid #333;
      border-radius: 10px;
    }

    .about-us-image-container {
      text-align: center;
      margin-top: 20px;
    }

    .about-us-image {
      width: 300px;
      height: 200px;
      border: 2px solid #333;
      border-radius: 10px;
      margin: 10px;
    }

    .contact-us-box, .newsletter-box {
      background-color: white;
      padding: 10px;
      border: 2px solid #333;
      border-radius: 10px;
      color: #333;
      text-align: center;
    }

    .social-media {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .social-logo {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }

    .social-logo img {
      max-width: 30px;
      max-height: 30px;
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
  `]
})
export class AboutUsComponent {}
