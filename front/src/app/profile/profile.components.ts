import { Programmazione } from './../model/programmazione';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import { User } from "../model/user";
import { Ordine } from '../model/ordine';
import { AuthBody } from '../model/authbody';
import { Dipendente } from '../model/dipendente';


const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

@Component({
  selector: 'app-profile',
  template: `
  
    <ng-component *ngIf="dipendente;then riservato;else utente"></ng-component>
      

      <ng-template #riservato >
        <div class="container" *ngIf="dipendente && user">
        <div class="container-l">
          
          <div class="block" style="height: 40%; align-items:center;">
            <span class="material-icons" style="font-size:125px;color:rgb(250,108,20);width:100%;">account_circle</span>
            <p style="font-size:22px;font-weight:bold">{{dipendente.nome}} {{dipendente.cognome}}</p> 
            <p style="font-size:14px;">{{dipendente.mansione}}</p>  
            <p style="font-size:12px;">PHOENIX CINEMA</p> 
            <p style="font-size:10px;">id: {{dipendente.id}}</p>
            <button (click)="logout()" class="logout-btn">Logout</button>
          </div>
          <div class="block" style="height: 50%">
            comunicazioni
          </div>

        </div>
        <div class="container-r">

          <div class="block" style="justify-content:start;height: auto;">
            <span class="info-row">
              <p class="label">Nome<p>
              <p class="info">{{dipendente.nome}}<p>
            </span>
            <span class="info-row">
              <p class="label">Cognome<p>
              <p class="info">{{dipendente.cognome}}<p>
            </span>
            <span class="info-row">
              <p class="label">Email<p>
              <p class="info">{{user.email}}<p>
            </span>
            <span class="info-row">
              <p class="label">Genere<p>
              <p class="info">{{dipendente.genere}}<p>
            </span>
            <span class="info-row">
              <p class="label">Telefono<p>
              <p class="info">{{dipendente.telefono}}<p>
            </span>
            <span class="info-row">
              <p class="label">Indirizzo<p>
              <p class="info">{{dipendente.indirizzo}}<p>
            </span>
            <span class="info-row">
              <p class="label">Data nascita<p>
              <p class="info">{{dipendente.data_nascita |date :"dd/MM/yyyy"}}<p>
            </span>
          </div>
          <div style="height: 40%;flex-direction:row; padding:0px 5%;">
            <button *ngFor="let pg of pagineGestione" class="btn-operazione" [routerLink]="['../riservata/'+pg]">{{pg.toUpperCase()}}</button>
          </div>

        </div> 
      </div>
    </ng-template>

    <ng-template #utente >
        <div class="container" *ngIf="user">
        <div class="container-l">
          
          <div class="block" style="height: 40%; align-items:center;">
            <span class="material-icons" style="font-size:125px;color:rgb(250,108,20);width:100%;">account_circle</span>
            <p style="font-size:22px;font-weight:bold">{{user.nome}} {{user.cognome}}</p>   
            <p style="font-size:12px;">PHOENIX CINEMA</p> 
            <p style="font-size:10px;">id: {{user.id}}</p>
            <button (click)="logout()" class="logout-btn">Logout</button>

          </div>
          <div class="block" style="height: 50%">
            comunicazioni
          </div>

        </div>
        <div class="container-r">

          <div class="block" style="justify-content:start;height: auto;">
            <span class="info-row">
              <p class="label">Nome<p>
              <p class="info">{{user.nome}}<p>
            </span>
            <span class="info-row">
              <p class="label">Cognome<p>
              <p class="info">{{user.cognome}}<p>
            </span>
            <span class="info-row">
              <p class="label">Email<p>
              <p class="info">{{user.email}}<p>
            </span>
          </div>
          <div style="display:flex;height: 60%;flex-direction:column; padding:0px 5%;align-items:center;">
            <button class="btn-operazione" style="width: 80%;">CARRELLO</button>
            <button class="btn-operazione" style="width: 80%;">ORDNI</button>
            <button class="btn-operazione" style="width: 80%;">BIGLIETTI</button>
          </div>

        </div> 
      </div>
    </ng-template>
  `,
  styles: [
    `
      .container {
        width: 100%;
        background: rgb(250,108,20);
        background: radial-gradient(circle, rgba(250,108,20,1) 0%, rgba(90,30,4,1) 100%);
        height: 100%;
        min-height: calc(100vh - 80px);
        display: flex;
        overflow: auto;
        align-items: center;
        flex-direction:row;
        justify-content: flex-start;
      }
      
      .container-l{
        width: 35%;
        height: 100%;
        padding:0px 2% 0px 5%;
      }
      .container-r{
        width: 65%;
        height: 100%;
        padding:0px 5% 0px 2%;
      }
      .block{
        display:flex;
        flex-direction:column;
        justify-content:center;
        text-align:center;
        background: white;
        margin: 20px 0px;
        height: 100px;
        border-radius:8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      .info-row{
        display:flex;
        flex-direction:row;
        margin: 2px 15px;
        padding: 10px 0px;
        border-bottom:2px solid lightgray
      }
      .label{
        display:flex;
        font-weight:bold;
        width:25%;
      }
      .info{
        width:75%;
        display:flex;
      }
      .btn-operazione{
        cursor:pointer;
        justify-content:center;
        text-align:center;
        background: white;
        width:48%;
        margin:1%;
        padding: 20px;
        border-radius:8px;
        border:1px solid gray;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        font-size:15px;
        font-weight:bold;
      }
      
      .btn-operazione:hover{
        background: lightgray
      }
      .logout-btn{
        justify-content:center;
        text-align:center;
        background: rgb(250,108,20);
        color:white;
        padding: 5px;
        margin:10px;
        width:30%;
        border-radius:8px;
        border:1px solid gray;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        font-size:10px;
        font-weight:bold;
        
      }
      .logout-btn:hover{
        background:orange;
      }

    `,
  ],
})
export class ProfileComponent implements OnInit {
  
  userId = -1
  user : User | null = null
  dipendente : Dipendente | null = null
  pagineGestione : string[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
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
      if(result.ruolo!="CLIENTE"){
        this.getDipendente();
      }
    });
  }

  getDipendente(){
    this.http.get<Dipendente>(Util.dipendentiServerUrl+"/"+this.userId).subscribe(result=>{
      this.dipendente=result;
      console.log(result)
        this.pagineGestione = Util.getPagineGestione(result.mansione)
        console.log(this.pagineGestione)
      })
  }

  logout(){
    console.log("delete")

    AuthService.deleteToken("token")
    AuthService.deleteToken("id")
    window.location.href = '/'
  }

  // getOrdini() {
  //   var authbody:AuthBody = new AuthBody(this.userId,"empty");
  //   console.log(authbody);
  //   this.http.post<Ordine[]>(Util.ordiniServerUrl, authbody).subscribe(result=>{
  //     this.ordini=result;
  //     console.log(result);
  //   })
  // }

  // getPosti(o:Ordine): string{
  //   var lun:number = o.biglietti.length;
  //   var posto:string = "";
  //   for(let index = 0; index<lun; index++){
  //   var programmazione:Programmazione = o.biglietti[index].programmazione;
  //   for(const p of programmazione.posti){
  //     if(p.id === o.biglietti[index].posto){
  //       posto += p.numero+" ";
  //     }
  //   }
  // }
  //   return posto;
  // }

}