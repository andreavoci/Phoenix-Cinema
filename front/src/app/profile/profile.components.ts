import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import { User } from "../model/user";

@Component({
  selector: 'app-profile',
  template: `
    <div class="container" *ngIf="user">
      <div class="header">
        <h1>Profilo Personale</h1>
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
          </div>
          <div class="info">
            <strong>Password:</strong>
            <span *ngIf="!isEditingPassword">{{ showPassword ? user.password : '******' }}</span>
            <input *ngIf="isEditingPassword" [(ngModel)]="newPassword" />
            <button (click)="toggleEdit('password')">Modifica</button>
            <button (click)="toggleShowPassword()">Mostra Password</button>
            <button (click)="saveChanges()" class="save-button">Salva Modifiche</button>
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
        <!-- Tabella degli ordini o dello storico -->
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

  saveChanges() {
    if (this.user) {
      if (this.isEditingEmail) {
        this.user.email = this.newEmail;
      }
      if (this.isEditingPassword) {
        this.user.password = this.newPassword;
      }
      //Chiamaata http che dovrebbe aggiornare i mail e password su DB 
      this.http.put(Util.userServerUrl + "/" + this.userId, this.user).subscribe((response) => {
        console.log("Modifiche salvate con successo sul DB", response);
      });
      // E reimposta i flag di modifica su false
      this.isEditingEmail = false;
      this.isEditingPassword = false;
    }
  }

}
