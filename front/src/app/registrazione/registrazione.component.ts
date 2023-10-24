import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, Util } from '../services/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrazione',
  template: `
    <div class="container">
      <div class="registration-form">
        <h2>Registrazione</h2>
        <form #registrationForm="ngForm" (ngSubmit)="register(registrationForm.value)">
          <!-- <div class="form-group">
            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" ngModel required>
          </div>
          <div class="form-group">
            <label for="cognome">Cognome</label>
            <input type="text" id="cognome" name="cognome" ngModel required>
          </div> -->
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" ngModel required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" ngModel required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&*]).{6,}$">
          </div>
          <!-- <div class="form-group">
            <label for="dataNascita">Data di Nascita</label>
            <input type="date" id="dataNascita" name="dataNascita" ngModel required>
          </div> -->
          <div class="button-group">
            <button type="submit">Registrati</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    .container {
      display: flex;
      align-items: flex-start; /* Sposta il contenuto verso l'alto */
      justify-content: center;
      height: 100vh;
      background: gray;
      color: white;
    }

    .registration-form {
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      padding: 40px;
    }

    .form-group {
      margin: 10px 0;
      display: flex;
      align-items: center;
    }

    .form-group label {
      display: inline-block;
      width: 40%;
      text-align: right;
      margin-right: 10px;
    }

    .form-group input {
      width: 80%;
    }

    .button-group {
      text-align: center;
      margin-top: 10px;
    }
    `
  ]
})
export class RegistrazioneComponent {
  constructor(private http: HttpClient) { }

  register(form: any) {
    this.http.post<LoginResponse>(Util.authServerUrl + "/register", form).subscribe(
      success => {
        console.log(success.token)
        AuthService.setToken("token", success.token)
        AuthService.setToken("id", success.id)
        window.location.reload()
      },
      error => {
        console.log(error.error)
        let element = document.getElementById("loginform-error")
        if (element != null) {
          element.innerHTML = error.error
        }
      }
    )
  }

}
