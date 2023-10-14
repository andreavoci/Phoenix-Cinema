import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import { User } from "../model/user";


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-profile',
  template: `
  <div class="container" *ngIf="user">
  <div class="header">
    <h1>Profilo Personale</h1>
    <button class="logout-button" (click)="logout()">Logout</button>
    <div class="user-info">
      <div class="info">
        <strong>Nome:</strong> {{ user.nome }}
      </div>
      <div class="info">
        <strong>Cognome:</strong> {{ user.cognome }}
      </div>
      <div class="info">
        <strong>Email:</strong>
        <span *ngIf="!isEditingEmail">{{ user.email }}</span>
        <input *ngIf="isEditingEmail" [(ngModel)]="newEmail" />
        <button (click)="toggleEdit('email')">Modifica</button>
        <div *ngIf="isEditingEmail">
          <div class="error-message" *ngIf="emailError">{{ emailError }}</div>
          <button (click)="saveEmail()" class="save-button">Salva Email</button>
          <button (click)="cancelEdit('email')" class="cancel-button">Annulla</button>
        </div>
      </div>
      <div class="info">
        <strong>Password:</strong>
        <span *ngIf="!isEditingPassword">{{ showPassword ? user.password : '******' }}</span>
        <input *ngIf="isEditingPassword" [(ngModel)]="newPassword" />
        <button (click)="toggleEdit('password')">Modifica</button>
        <button (click)="toggleShowPassword()">Mostra Password</button>
        <div *ngIf="isEditingPassword">
          <div class="password-criteria">
            <h4>Criteri di sicurezza:</h4>
          <ul>
            <li>Almeno 6 caratteri</li>
            <li>Almeno una lettera maiuscola</li>
            <li>Almeno una lettera minuscola</li>
            <li>Almeno un numero</li>
            <li>Almeno un carattere speciale (!,@,#,$,%,^,&,*)</li>
          </ul>
          </div>
          <div class="error-message" *ngIf="passwordError">{{ passwordError }}</div>
          <button (click)="savePassword()" class="save-button">Salva Password</button>
          <button (click)="cancelEdit('password')" class="cancel-button">Annulla</button>
        </div>
      </div>
    </div>
  </div>
  <button
    type="submit"
    class="button show-history-button"
    (click)="toggleTable()"
  >
    <span class="left-button">Ordini</span> / <span class="right-button">Storico</span>
  </button>
  <table *ngIf="showOrders || showHistory" class="table">
    <tr>
      <th>Titolo</th>
      <th>Data</th>
      <th>Quantità</th>
    </tr>
    <tr *ngFor="let order of (showOrders ? orders : history)">
      <td>{{ order.titolo }}</td>
      <td>{{ order.data }}</td>
      <td>{{ order.quantita }}</td>
    </tr>
  </table>
</div>

  `,
  styles: [
    `
      .container {
        width: 100%;
        background: gray;
        height: 100%;
        min-height: calc(100vh - 80px);
        display: flex;
        overflow: auto;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
      }
      .header {
        background: #000000;
        color: white;
        padding: 10px;
        text-align: left;
        width: 100%;
        margin-bottom: 20px;
        justify-content: space-between; /* Sposta a destra */
      }

      .user-info {
        display: flex;
        flex-direction: column;
      }

      .info {
        margin-bottom: 10px;
      }

      .button {
        background-color: white;
        color: black;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 16px;
        margin: 10px 0;
        display: inline-block;
        transition: background-color 0.2s;
        text-align: center;
        margin-bottom: 20px;
      }

      .show-history-button {
        background-color: white;
        color: black;
        width: 15%;
        display: flex;
        justify-content: space-between;
        transition: background-color 0.2s;
        text-align: center;
        margin-bottom: 20px;
      }

      .table {
        width: 80%;
        border-collapse: collapse;
        border: 1px solid #ddd;
        background-color: white;
        margin-top: 20px;
      }

      .table th, .table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      .error-message {
        color: red;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  readonly profile = "profile";
  userId = -1;
  showOrders: boolean = false;
  showHistory: boolean = false;
  isEditingEmail: boolean = false;
  isEditingPassword: boolean = false;
  showPassword: boolean = false;
  newEmail: string = '';
  newPassword: string = '';
  emailError: string | null = null;
  passwordError: string | null = null;

  orders: any[] = [
    { titolo: 'Ordine 1', data: '01/10/2023', quantita: 5 },
    { titolo: 'Ordine 2', data: '02/10/2023', quantita: 3 },
    { titolo: 'Ordine 3', data: '03/10/2023', quantita: 7 },
  ];

  history: any[] = [
    { titolo: 'Biglietto 1', data: '01/10/2022', quantita: 1 },
    { titolo: 'Biglietto 2', data: '02/10/2022', quantita: 2 },
    { titolo: 'Biglietto 3', data: '03/10/2022', quantita: 1 },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    if (AuthService.getToken('id')) {
      this.userId = Number(AuthService.getToken('id'));
    }
    const authToken = AuthService.getToken("token");

    this.http.get<User>(Util.userServerUrl + "/" + this.userId).subscribe((result) => {
      this.user = result;
      console.log(result);
    });
  }

  toggleEdit(field: string) {
    if (field === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
    } else if (field === 'password') {
      this.isEditingPassword = !this.isEditingPassword;
    }
  }

  toggleTable() {
    if (this.showOrders) {
      this.showOrders = false;
      this.showHistory = true;
    } else {
      this.showOrders = true;
      this.showHistory = false;
    }
    
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  saveEmail() {
    if (this.isEditingEmail) {
      if (!emailRegex.test(this.newEmail)) {
        // Imposta un messaggio di errore per l'email
        this.emailError = 'L\'indirizzo email non è valido';
      } else {
          if (this.user){
            // L'email è valida, procedi con l'aggiornamento dell'email
            this.user.email = this.newEmail;
          }
        // Resetta l'errore
        this.emailError = null;
        // Esegui il salvataggio
        this.saveChanges();
      }
    }
    this.isEditingEmail = false;
  }

  savePassword() {
    if (this.isEditingPassword) {
      if (!this.isPasswordValid(this.newPassword)) {
        // Imposta un messaggio di errore per la password
        this.passwordError = 'La password non rispetta i criteri di sicurezza';
      } else {
        // La password è valida, procedi con l'aggiornamento della password
          if (this.user){
            this.user.password = this.newPassword;
          }
        // Resetta l'errore
        this.passwordError = null;
        // Esegui il salvataggio
        this.saveChanges();
      }
    }
    this.isEditingPassword = false;
  }

  saveChanges() {
    // Chiamaata http che dovrebbe aggiornare i mail e password su DB 
    this.http.put(Util.userServerUrl + "/" + this.userId, this.user).subscribe((response) => {
      console.log("Modifiche salvate con successo sul DB", response);
    });
    // Reimposta i flag di modifica su false
    this.isEditingEmail = false;
    this.isEditingPassword = false;
  }

  isPasswordValid(password: string): boolean {
    // Aggiungi qui i criteri di sicurezza desiderati
    const minLength = 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  }

  logout(){
    console.log("delete")

   AuthService.deleteToken("token")
   AuthService.deleteToken("id")
   window.location.reload()
  }

  cancelEdit(field: string) {
    if (field === 'email') {
      this.isEditingEmail = false;
    } else if (field === 'password') {
      this.isEditingPassword = false;
    }
  }

}
