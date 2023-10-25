import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Sala } from '../model/sala';
import { Pellicola } from '../model/pellicola';
import { Programmazione } from '../model/programmazione';
import { Fornitura } from '../model/fornitura';

@Component({
  selector: 'app-riservata',
  template: `
    <div class="container">
      <br><br><br>
      
      <br>
      <button type="button" class="button" routerLink="/riservata">BACK</button>
      <br>
      <div *ngIf="type==0 ;then prova0"></div>
      <div *ngIf="type==1 ;then prova1"></div>
      <div *ngIf="type==2 ;then prova2"></div>
      <div *ngIf="type==3 ;then prova3"></div>
      <div *ngIf="type==-1 ;then nochoice"></div>
    </div>
    <ng-template #prova0>
      CREAZIONE PROGRAMMAZIONE
      <form #newprogform="ngForm" (ngSubmit)="newProgrammazione(newprogform.value)">
        
        <select name="pellicola" ngModel>
          <option value="" disabled>Scegli una pellicola</option>
          <option *ngFor="let p of pellicole" [ngValue]="p">{{p.titolo}}</option>
        </select><br><br>
        <select name="sala" ngModel>
          <option value="" disabled>Scegli una sala</option>
          <option *ngFor="let s of sale" [ngValue]="s">{{s.nome}}</option>
        </select><br><br>
        
        <input type="text" name="prezzo" ngModel placeholder="prezzo"><br><br>

        <input type="datetime-local" name="orario" ngModel><br><br>
        <button type="submit">Crea programmazione</button>
      </form>
      
    </ng-template>
    
    <ng-template #prova1>
      CREAZIONE SALA
      <form #newsalaform="ngForm" (ngSubmit)="newSala(newsalaform.value)">
        
      <input type="text" name="nome" ngModel placeholder="nome"><br><br>
      
      <input type="text" name="capienza" ngModel placeholder="capienza"><br><br>
       
        <button type="submit">Crea Sala</button>
      </form>
      
    </ng-template>

    <ng-template #prova2>
      VISUALIZZAZIONE PELLICOLE
      <div class="table-div">
      <table>
        <tr class="title">
          <th>Titolo</th>
          <th>Regista</th>
          <th>Attori</th>
          <th>Trama</th>
          <th>Durata</th>
          <th>Generi</th>
          <th>PEGI</th>
          <th>Prezzo</th>
          <th>Uscita</th>
          <th>Fine noleggio</th>
        </tr>
        <tr class="row" *ngFor="let p of pellicole">
          <td>{{p.titolo}}</td>
          <td>{{p.regista}}</td>
          <td>{{p.attori}}</td>
          <td>{{p.trama}}</td>
          <td>{{p.durata}}</td>
          <td>{{p.generi}}</td>
          <td>{{p.pegi}}</td>
          <td>{{p.prezzo_noleggio}}</td>
          <td>{{p.data_uscita | date :"dd/MM/yyyy"}}</td>
          <td>{{p.fine_noleggio | date :"dd/MM/yyyy"}}</td>
        </tr>
      </table>
      </div>
    </ng-template>

    
    <ng-template #prova3>
      VISUALIZZAZIONE FORNITURE
      <dialog #dialogo>
        
        <div class="background-blur">
            
          <div class="component-div">
              <button (click)="dialogo.close()">chiudi</button>
          </div>
        </div>
      </dialog>
   <button type="button" class="button" (click)="dialogo.show();"> POPUP </button>

      <div class="table-div">
      <table>
        <tr class="title">
          <th>ID</th>
          <th>Fornitore</th>
          <th>Fattura</th>
          <th>Tipo</th>
          <th>Prezzo</th>
          <th>Quantità</th>
          <th>Merci</th>
          <th>Arrivo</th>
          <th>Scadenza</th>
        </tr>
        <tr class="row" *ngFor="let f of forniture">
          <td>{{f.id}}</td>
          <td>{{f.fornitore.id}}</td>
          <td>{{f.fattura.id}}</td>
          <td>{{f.tipo}}</td>
          <td>{{f.prezzo}}</td>
          <td>{{f.quantita}}</td>
          <td>[{{f.merci.length}}]</td>
          <td>{{f.arrivo | date :"dd/MM/yyyy"}}</td>
          <td>{{f.scadenza | date :"dd/MM/yyyy"}}</td>
        </tr>
      </table>
      </div>
    </ng-template>


      
    <ng-template #nochoice>
      <button type="button" class="button" routerLink="/riservata/0" (click)="res(0)">Prova 0</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/1" (click)="res(1)">Prova 1</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/2" (click)="res(2)">Prova 2</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/3" (click)="res(3)">Prova 3</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/4" (click)="res(4)">Prova 4</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/5" (click)="res(5)">Prova 5</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/6" (click)="res(6)">Prova 6</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/7" (click)="res(7)">Prova 7</button>
      <br>   
    </ng-template>
  `,
  styles: [ `

    .component-div{
            position: fixed;
            border-radius:10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            padding: 150px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            /* display: block; */   /* Assicura che il popup sia sopra lo sfondo sfocato */
        }
        
      .background-blur {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%; /* Sostituisci 'sfondo.jpg' con il percorso dell'immagine di sfondo */
          background-size: cover;
          backdrop-filter: blur(5px);
          z-index:1;/* Applica l'effetto di sfondo sfocato */
        /* Assicura che lo sfondo sia dietro il popup */
      }

    .container {
      width: 100vw;
      background: gray;
      height: 100%;
      min-height: calc(100vh - 80px);
      display: flex;
      overflow: auto;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }

    
.table-div {
  width: 100%;
  height: 100%;
}
table {
  /* table-layout:fixed; */
  border-collapse: collapse;
  width: 100%;
}

.title {
  background-color: #fa680c;
  text-align: left;
}

.title td, .title th {
  border:3px solid black;
  text-align: left;
  padding: 8px;
  white-space: nowrap; /* Evita la riduzione di spazi */
  text-overflow: ellipsis; /* Tronca il testo e mostra "..." se è troppo lungo */
  height: 20px;
}
.row td,.row th {
  text-align: center;
  
  border-left:4px solid black;
  border-right:4px solid black;
  border-bottom:2px solid black;
  padding: 8px;
  white-space: nowrap; /* Evita la riduzione di spazi */
      text-overflow: ellipsis; /* Tronca il testo e mostra "..." se è troppo lungo */
      height: 20px;
}

.row:nth-child(even) {
  background-color: #fa8e4b;
}
.row:nth-child(odd) {
  background-color: #faad7d;
}
  `,
  ]
})

export class RiservataComponent {
  type: number = -1;
  prova =[0,1,2,3,4,5];
  sale: Sala[] = [];
  pellicole: Pellicola[] = [];
  forniture: Fornitura[] = [];
  //-1:all  |  0:bho
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (this.route.snapshot.paramMap.get('type')){
      this.type = Number(this.route.snapshot.paramMap.get('type'));
      if(this.type==0){
        this.getPellicole()
        this.getSale()
      }
      if(this.type==2){
        this.getPellicole()
      }
      
      if(this.type==3){
        this.getForniture()
      }
      
      if(this.type==4){
        this.getSale()
      }
    }
    console.log(this.type)  
  }
  
  
  //prova 3
  getForniture(){
    this.http.get<Fornitura[]>(Util.fornitureServerUrl).subscribe(result=>{
      this.forniture = result;
    })
  }

  //prova 2
  getPellicole(){
    this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result=>{
      this.pellicole = result;
    })
  }
  //prova 4
  getSale(){
    this.http.get<Sala[]>(Util.saleServerUrl).subscribe(result=>{
      this.sale = result;
    })
  }

  //prova 0
  newProgrammazione(form: any){
    console.log(form)
    this.http.post<HttpResponse<Programmazione>>(Util.programmazioniServerUrl+"/create",form).subscribe(result=>{
      console.log(result);
      
    })
  }

  //prova 1
  newSala(form: any){
    console.log(form)
    this.http.post<HttpResponse<Programmazione>>(Util.saleServerUrl+"/create",form).subscribe(result=>{
      console.log(result);
      
    })
  }

  
  //prova 1
  
    // id:number;
    // pellicola:Pellicola;
    // sala:Sala;
    // posti:Array<Posto>;
    // prezzo:number;
    // orario:Date;


  //fine prova 0

  res(o:number){
      
  }
  
}
