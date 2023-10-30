import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Sala } from '../model/sala';
import { Pellicola } from '../model/pellicola';
import { Programmazione } from '../model/programmazione';
import { Fornitura } from '../model/fornitura';
import { Fornitore } from '../model/fornitore';
import { Merce } from '../model/merce';
import { NgForm } from '@angular/forms';
import { Fattura } from '../model/fattura';
import { Candidatura } from '../model/candidatura';
import { Dipendente } from '../model/dipendente';

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
      <div *ngIf="type==4 ;then prova4"></div>
      <div *ngIf="type==7 ;then prova7"></div>
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
      <dialog #dialogo id="dialogo">
        <div class="background-blur">
          
          <div class="component-popup" style="width:auto;">
          <p id="error-popup">{{errorPopup_text}}</p>
            <div class="navbar-popup">
              <p class="title-popup">Inserisci Fornitura</p>
              
              <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogo.close();" >
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
              </button>
            </div>
            
            <div *ngIf="step_fornitura==1 ;then fornitura1"></div>
            <div *ngIf="step_fornitura==2 ;then fornitura2"></div>
            <div *ngIf="step_fornitura==3 ;then fornitura3"></div>
            <div *ngIf="step_fornitura==4 ;then fornitura4"></div>
      
            
            <!-- <p>Merci</p>
            <input name="tipo">
            <p>Fattura</p>
            <input name="tipo"> -->

            <!-- <button (click)="dialogo.close()" >chiudi</button> -->
          
          </div>
        </div>
        <ng-template #fornitura1>      
          <form #fornitura1="ngForm" (ngSubmit)="creaFornitura(2,fornitura1.value)">
            <p>Fornitore</p>
            <select name="fornitore" ngModel (click)="errorPopup_animation('',false)">
              <option value="" disabled>Scegli un fornitore</option>
              <option *ngFor="let f of fornitori" [ngValue]="f">{{f.ragione_sociale}}</option>
            </select>
            <p>Tipo</p>
            <input name="tipo" ngModel (click)="errorPopup_animation('',false)">
            <div class="footer-popup">
              <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
              </button>
            </div>         
          </form>
        </ng-template>
        
        <ng-template #fornitura2>      
          <form #fornitura2="ngForm" (ngSubmit)="creaFornitura(3,merci)">
            <div style="display:flex;align-items:center;height:35px;"><p>Merce</p>
            <p>[{{merci.length}}]</p>
            <button type="button" class="item-button" style="margin:5px;background:orange;width:20px;height:20px;" (click)="errorPopup_animation('',false);creaMerce(fornitura2)">
              <span class="material-icons" style="font-size:14px;color:white;width:100%;">add</span>
            </button>
            </div>
            <div *ngFor="let m of merci">{{m|json}}</div>
            <br>
            <!-- <select name="fornitore" ngModel (click)="errorPopup_animation('',false)">
              <option value="" disabled>Scegli un fornitore</option>
              <option *ngFor="let f of fornitori" [ngValue]="f">{{f.ragione_sociale}}</option>
            </select> -->
            <p>Nome</p>
            <input name="nome" ngModel (click)="errorPopup_animation('',false)">
            <p>Tipo</p>
            <input name="tipo" ngModel (click)="errorPopup_animation('',false)">
            <p>Prezzo</p>
            <input name="prezzo" ngModel (click)="errorPopup_animation('',false)">
            <p>Quantità</p>
            <input name="quantita" ngModel (click)="errorPopup_animation('',false)">
            
            <div class="footer-popup">
              <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
              </button>
            </div>         
          </form>
        </ng-template>
        <ng-template #fornitura3>      
          <form #fornitura3="ngForm" (ngSubmit)="creaFornitura(4,fornitura3.value)">
            <p>Fattura</p><br>
          
            <p>Importo</p>
            <input name="importo" ngModel (click)="errorPopup_animation('',false)">
            <p>Emissione</p>
            <input type="date" name="emissione" ngModel (click)="errorPopup_animation('',false)">
           
            <div class="footer-popup">
              <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
              </button>
            </div>         
          </form>
        </ng-template>
        
        <ng-template #fornitura4>      
          <form #fornitura4="ngForm" (ngSubmit)="creaFornitura(5,fornitura4.value)">
            <p>{{fornituraResponse}}</p><br>
          
            <div class="footer-popup">
              <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
              </button>
            </div>   
          </form>
        </ng-template>
      </dialog>

      <!-- <button type="button" class="button" (click)="dialogo.show();"> POPUP </button> -->
      <div class="container-buttons">
        <button class="item-button" style="background:green" (click)="dialogo.show();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">add</span>
        </button>
        
        <button class="item-button" style="background:red" (click)="eliminaFornitura();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
        </button>

        <button class="item-button" style="background:blue" (click)="modificaFornitura();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>

        <p class="button-item">{{messageError}}</p>
        <div *ngIf="checkElimina==true">
          <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazione()">Conferma</button>
          <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazione()">Annulla</button>
        </div>
      </div>

      <div class="table-div">
        <table>
          <tr class="title">
            <th></th>
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
            <td><input type="checkbox" [value]=f.id (change)="onCheckChange($event)" style="width:20px;height:20px"></td>
            <td>{{f.id}}</td>
            <td><span *ngIf="f.fornitore">{{f.fornitore.ragione_sociale}}</span></td>
            <td><span *ngIf="f.fattura">{{f.fattura.id}}</span></td>
            <td>{{f.tipo}}</td>
            <td>{{f.prezzo}}</td>
            <td>{{f.quantita}}</td>
            <td><span *ngIf="f.merci">[{{f.merci.length}}]</span></td>
            <td>{{f.arrivo | date :"dd/MM/yyyy"}}</td>
            <td>{{f.scadenza | date :"dd/MM/yyyy"}}</td>
          </tr>
        </table>
      </div>
    </ng-template>

    <ng-template #prova4>
      VISUALIZZAZIONE SALE
      <div class="table-div">
      <table>
        <tr class="title">
          <th>ID</th>
          <th>Nome</th>
          <th>Capienza</th>
        </tr>
        <tr class="row" *ngFor="let s of sale">
          <td>{{s.id}}</td>
          <td>{{s.nome}}</td>
          <td>{{s.capienza}}</td>
        </tr>
      </table>
      </div>
    </ng-template>

    <ng-template #prova7>
      VISUALIZZAZIONE CANDIDATURE
      <div class="table-div">
      <table>
        <tr class="title">
          <th>ID</th>
          <th>Nome</th>
          <th>Mansione Richiesta</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr class="row" *ngFor="let c of candidature">
          <td>{{c.id}}</td>
          <td>{{c.name}}</td>
          <td>{{c.jobTitle}}</td>
          <td>{{c.email}}</td>
          <td>{{c.phone}}</td>
        </tr>
      </table>
      </div>

      VISUALIZZAZIONE DIPENDENTI
      <dialog #dialogo>
      <div class="background-blur">
          
          <div class="component-popup" style="width:auto;">
          <p id="error-popup">{{errorPopup_text}}</p>
            <div class="navbar-popup">
              <p class="title-popup">Inserisci Dipendente</p>
              
              <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogo.close();" >
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
              </button>
            </div>
            <div>      
          <form #dipendentiForm="ngForm" (ngSubmit)="creaDipendente()">
            <br>
            <p>Nome</p>
            <input name="nome" ngModel (click)="errorPopup_animation('',false)">
            <p>Tipo</p>
            <input name="tipo" ngModel (click)="errorPopup_animation('',false)">
            <p>Prezzo</p>
            <input name="prezzo" ngModel (click)="errorPopup_animation('',false)">
            <p>Quantità</p>
            <input name="quantita" ngModel (click)="errorPopup_animation('',false)">
            
            <div class="footer-popup">
              <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
              </button>
            </div>         
          </form>
        </div>
      </div>
    </div> 
  </dialog>

      <div class="container-buttons">
        <button class="item-button" style="background:green" (click)="dialogo.show();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">add</span>
        </button>
        
        <button class="item-button" style="background:red" (click)="eliminaFornitura();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
        </button>
        <p class="button-item">{{messageError}}</p>
        <div *ngIf="checkElimina==true">
          <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazione()">Conferma</button>
          <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazione()">Annulla</button>
        </div>
      </div>

      <div class="table-div">
      <table>
        <tr class="title">
          <th></th>
          <th>ID</th>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr class="row" *ngFor="let d of dipendenti">
          <td><input type="checkbox" [value]=d.id (change)="onCheckChange($event)" style="width:20px;height:20px"></td>
          <td>{{d.id}}</td>
          <td>{{d.nome}}</td>
          <td>{{d.cognome}}</td>
          <td>{{d.userID.email}}</td>
          <td>{{d.telefono}}</td>
          
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

    #error-popup{
      display:flex; 
      flex-direction:column;
      position:fixed;
      border-radius:10px 10px 0px 0px;
      top: 0px;
      left: 0;
      width:100%;
      height:40px;
      font-size:11px;
      
      color:white;
      background:red;
      padding:2px;

      text-align:center;
      /* justify-content:center; */
      /* width:100%; */       
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
      
      transition: top 0.5s ease;
    }
    .component-popup{
      position: fixed;
      border-radius:10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 50px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      /* display: block; */   /* Assicura che il popup sia sopra lo sfondo sfocato */
    }
    .navbar-popup{
      position:fixed;
      border-radius:10px 10px 0px 0px;
      background:black;
      top: 0;
      left: 0;
      width:100%;
      height:40px;
      display:flex;
      justify-content:flex-end;
    }
    .footer-popup{
      position:fixed;
      border-radius:0px 0px 10px 10px;
      background:white;
      bottom: 0;
      left: 0;
      width:100%;
      display:flex;
      justify-content:flex-end;

    }
    .title-popup{
      display:flex;
      flex-direction:column;
      color:white;
      width:100%;
      height:40px;
      justify-content:center;
      text-align:center;
    }

      .container-buttons{
        display:flex;
        justify-content: flex-start;
        align-items: center;
        text-align:center;
        width:100%;
        height:40px;
        margin:5px 0px 5px 0px;
      }

      .item-button{
        border:2px solid rgba(0,0,0,0.3);
        border-radius:8px;
        margin:0px 5px 0px 5px;
        height:40px;
        width:40px;
        display: flex; 
        color: white;
        cursor:pointer;
        text-align: center;
        align-items: center;
      }
      .item-button:hover{
        box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.3);
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
  messageError = "";
  prova =[0,1,2,3,4,5];
  sale: Sala[] = [];
  pellicole: Pellicola[] = [];
  forniture: Fornitura[] = [];
  fornitori: Fornitore[] = [];
  candidature: Candidatura[] = [];
  dipendenti: Dipendente[] = [];
  checkElimina : boolean = false;
  errorPopup : HTMLElement|null=null;
  errorPopup_text = ""
  step_fornitura = 1
  fornituraCreata : Fornitura | null  = null;
  merci: Merce[] = [];
  fornituraResponse="risultato";
  editing: boolean = false
  //-1:all  |  0:bho
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
  ngAfterViewInit() {
    this.errorPopup = document.getElementById("error-popup")

  }
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
        this.getFornitori()
        
      }
      
      if(this.type==4){
        this.getSale()
      }

      if(this.type==7){
        this.getCandidature()
        this.getDipendenti()
      }
    }
    console.log(this.type)  
  }
  
  
  //prova 3
  fornitureSel: number[]=[]
  getForniture(){
    this.http.get<Fornitura[]>(Util.fornitureServerUrl).subscribe(result=>{
      this.forniture = result;
    })
  }
  getFornitori(){
    this.http.get<Fornitore[]>(Util.fornitoriServerUrl).subscribe(result=>{
      this.fornitori = result;
      console.log(this.fornitori)
    })
  }

  onCheckChange(event:any){
    if(event.target.checked){
      this.fornitureSel.push(event.target.value)
    }
    else{
      this.fornitureSel = this.fornitureSel.filter(f=>f !== event.target.value)
    }
    this.messageError="";
    this.checkElimina=false;
  }
  errorPopup_animation(text:string,visible:boolean){

    if(this.errorPopup){
      if(visible){
        this.errorPopup.style.top="-30px"
      }
      else{
        this.errorPopup.style.top="0"
      }
      this.errorPopup_text=text;
    }
  }
  creaMerce(form:any){
    if(form as NgForm){
      const merce = form.value;
      if(merce.nome=="" || merce.tipo=="" || merce.prezzo=="" || merce.quantita==""){
        this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      }
      else{
        this.merci.push(new Merce(merce.nome,merce.tipo,merce.prezzo,merce.quantita))
        form.resetForm()
      }
    }


  }

  creaFornitura(step:number,form:any){
    console.log(form)
    if(step==2){
      console.log(form)
      if(form.fornitore=="" || form.tipo==""){
        this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      }
      else{
        console.log(step)
        this.fornituraCreata = new Fornitura();
        console.log(this.fornituraCreata)
        this.fornituraCreata.fornitore=form.fornitore
        console.log(this.fornituraCreata)
        this.fornituraCreata.tipo=form.tipo
        console.log(this.fornituraCreata)
        this.step_fornitura=step;
      }
    }
    else if(step==3){
      console.log(form)
      if(form.length==0){
        this.errorPopup_animation("Devi aggiungere almeno una merce! usa il pulsante [+]",true)
      }
      else{
        if(this.fornituraCreata){
          console.log(step);
          this.fornituraCreata.merci=this.merci;
          this.step_fornitura=step;
        }
      }
    }
    
    else if(step==4){
      console.log(form)
      if(form.importo=="" || form.emissione==""){
        this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      }
      else{
        if(this.fornituraCreata){
          console.log(step);
          this.fornituraCreata.fattura=new Fattura(form.importo,form.emissione)
          
          console.log(this.fornituraCreata)
            
      
          this.http.post(Util.fornitureServerUrl+"/create",this.fornituraCreata, { responseType: 'text' }).subscribe(
           
            success => {
              this.fornituraResponse="Fornitura creata correttamente"
              console.log(success)
            },
            error => {

              this.fornituraResponse="Errore creazione fornitura"
              console.log(error)
            }
          )
          
      
          console.log(form)
          this.step_fornitura=step;

        }
      }

    }
    
    else if(step==5){
      // exkit
      // console.log(form)
      // if(form.importo=="" || form.emissione==""){
      //   this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      // }
      // else{
      //   console.log(step)
      //   this.step_fornitura=step;
      // }
      
      window.location.reload()
    }
    // console.log(step)
    // this.errorPopup_animation("ATTENZIONE! perderai i dati fino ad ora inseriti. Per confermare premere di nuovo sulla [x]",true)
  }

  eliminaFornitura(){
    if(this.fornitureSel.length==0){
      this.messageError = "Errore! Seleziona prima le forniture da eliminare"
      this.checkElimina = false;
    }
    else{
      this.messageError = "Sei sicuro di volerle eliminare?"
      this.checkElimina = true;
    }
  }
  
  modificaFornitura(){
    if(this.fornitureSel.length==0){
      this.editing=false
      this.messageError = "Errore! Seleziona prima le forniture da modificare"
    }
    else if(this.fornitureSel.length>1) {
      this.editing=false
      this.messageError = "Errore! Seleziona una sola fornitura da modificare"
    }
    else{
      this.editing=true

      
      let myDialog:any = <any>document.getElementById("dialogo");
      myDialog.showModal();


    }
  }

  annullaEliminazione(){
    this.messageError = ""
    this.checkElimina = false;

  }
  
  confermaEliminazione(){
    this.messageError = "Eliminati"
    
    this.http.post<HttpResponse<String>>(Util.fornitureServerUrl+"/delete",this.fornitureSel).subscribe(
      success => {
        window.location.reload()
      },
      error => {
        window.location.reload()
      }
    )
    this.checkElimina = false;
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

  getCandidature(){
    this.http.get<Candidatura[]>(Util.candidatureServerUrl).subscribe(result=>{
      this.candidature=result;
      console.log(result)
    })
  }

  creaDipendente() {

  }

  getDipendenti(){
    this.http.get<Dipendente[]>(Util.dipendentiServerUrl).subscribe(result=>{
      this.dipendenti=result;
      console.log(result)
    })
  }
  
}
