import { Component } from "@angular/core";
import { Sala } from "../model/sala";
import { Pellicola } from "../model/pellicola";
import { Fornitura } from "../model/fornitura";
import { Fornitore } from "../model/fornitore";
import { Merce } from "../model/merce";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Util } from "../services/util";
import { Fattura } from "../model/fattura";
import { NgForm } from "@angular/forms";
import { Programmazione } from "../model/programmazione";
import { Candidatura } from "../model/candidatura";

@Component({
    selector: 'app-fornitura',
    template:`
    <div class="container">
      <p class="titolo">FORNITURE</p>
      <dialog #popup id="popup">
        <div class="background-blur">
                
          <div class="component-popup" style="width:auto;">
            <p id="error-popup">{{errorPopup_text}}</p>
            <div class="navbar-popup">
                <p class="title-popup">Inserisci Fornitura</p>
                <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="popup.close();" >
                  <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
                </button>
            </div>
            
            <div *ngIf="step_fornitura==1 ;then fornitura1"></div>
            <div *ngIf="step_fornitura==2 ;then fornitura2"></div>
            <div *ngIf="step_fornitura==3 ;then fornitura3"></div>
            <div *ngIf="step_fornitura==4 ;then fornitura4"></div>
          </div>
        </div>
      </dialog>
      <div class="container-buttons">
        <button class="item-button" style="background:green" (click)="popup.show();">
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
            <th>Merci</th>
            <th>Pellicole</th>
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
            <td><span *ngIf="f.merci">[{{f.merci.length}}]</span></td>
            <td><span *ngIf="f.pellicole">[{{f.pellicole.length}}]</span></td>
            <td>{{f.arrivo | date :"dd/MM/yyyy"}}</td>
            <td>{{f.scadenza | date :"dd/MM/yyyy"}}</td>
          </tr>
        </table>
      </div>
    </div>
    <ng-template #fornitura1>      
        <div *ngIf="fornituraModifica;then fornitura1_edit;else fornitura1_new">
          
        </div>
    </ng-template>
    <ng-template #fornitura1_new>
      <form #fornitura1="ngForm" (ngSubmit)="creaFornitura(2,fornitura1.value)">
      <p>Fornitore</p>
      <select name="fornitore" ngModel (click)="errorPopup_animation('',false)">
          <option value="" disabled>scegli un fornitore</option>
          <option *ngFor="let f of fornitori" [ngValue]="f">{{f.ragione_sociale}}</option>
      </select>
      
      <!-- <input name="tipo" ngModel (click)="errorPopup_animation('',false)"> -->
      <div class="footer-popup">
        <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
          <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
        </button>
      </div>
      </form>
    </ng-template>
    
    <ng-template #fornitura1_edit >
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
      <form #fornitura3="ngForm" (ngSubmit)="creaFornitura(4,merci)">
        <div style="display:flex;align-items:center;height:35px;"><p>Pellicola</p>
          <p>[{{pellicole.length}}]</p>
          <button type="button" class="item-button" style="margin:5px;background:orange;width:20px;height:20px;" (click)="errorPopup_animation('',false);creaPellicola(fornitura3)">
              <span class="material-icons" style="font-size:14px;color:white;width:100%;">add</span>
          </button>
        </div>
        <div *ngFor="let p of pellicole">{{p|json}}</div>
        <br>
        <p>Titolo</p>
        <input name="titolo" ngModel (click)="errorPopup_animation('',false)">
        <p>Data uscita</p>
        <input type="date" name="data_uscita" ngModel (click)="errorPopup_animation('',false)">
        <p>Data fine noleggio</p>
        <input type="date" name="fine_noleggio" ngModel (click)="errorPopup_animation('',false)">
        <p>Prezzo noleggio</p>
        <input name="prezzo_noleggio" ngModel (click)="errorPopup_animation('',false)">
        
        <div class="footer-popup">
          <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
            <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
          </button>
        </div>         
      </form>
    </ng-template>
    <ng-template #fornitura4>      
      <form #fornitura4="ngForm" (ngSubmit)="creaFornitura(5,fornitura4.value)">
        
        <p>Importo Fattura</p>
        <input name="importo" ngModel (click)="errorPopup_animation('',false)">
        <p>Emissione Fattura</p>
        <input type="date" name="emissione" ngModel (click)="errorPopup_animation('',false)">
        
        <div class="footer-popup">
          <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
          <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
          </button>
        </div>         
      </form>
    </ng-template>

    <ng-template #fornitura5>      
      <form #fornitura5="ngForm" (ngSubmit)="creaFornitura(6,fornitura5.value)">
        <p>{{fornituraResponse}}</p><br>
        
        <div class="footer-popup">
            <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
            <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
            </button>
        </div>   
      </form>
    </ng-template>
    
    `,
    styleUrls: ["./riservata.css"]
})

export class ResFornituraComponent{
  forniture: Fornitura[] = [];
  fornitori: Fornitore[] = [];
  merci: Merce[] = [];
  pellicole: Pellicola[] = [];
  fornitureSel: number[]=[]
  fornituraCreata : Fornitura | null  = null;
  
  fornituraModifica : Fornitura | null  = null;

  messageError = "";
  errorPopup_text = ""
  checkElimina : boolean = false;
  errorPopup : HTMLElement|null=null;
  step_fornitura = 1
  fornituraResponse="risultato";
  
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
  ngAfterViewInit() {
    this.errorPopup = document.getElementById("error-popup")

  }
  ngOnInit(): void {
    
    this.getForniture()
    this.getFornitori()
  }
  
  
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
      console.log(merce)
      // if(merce.nome=="" || merce.tipo=="" || merce.prezzo=="" || merce.quantita=="" ||merce.nome==null || merce.tipo==null || merce.prezzo==null || merce.quantita==null){
        if(!merce.nome || !merce.tipo || !merce.prezzo || !merce.quantita ){
        this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      }
      else{
        this.merci.push(new Merce(merce.nome,merce.tipo,merce.prezzo,merce.quantita))
        form.resetForm()
      }
    }
  }
  creaPellicola(form:any){
    console.log(form)
    if(form as NgForm){
      const pellicola = form.value;
      console.log(pellicola)
      // if(merce.nome=="" || merce.tipo=="" || merce.prezzo=="" || merce.quantita=="" ||merce.nome==null || merce.tipo==null || merce.prezzo==null || merce.quantita==null){
        if(!pellicola.titolo || !pellicola.data_uscita || !pellicola.fine_noleggio || !pellicola.prezzo_noleggio ){
        this.errorPopup_animation("non puoi lasciare campi vuoti, completali",true)
      }
      else{
        this.pellicole.push(new Pellicola(pellicola.titolo,pellicola.data_uscita,pellicola.fine_noleggio,pellicola.prezzo_noleggio))
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
      // if(form.length==0){
      //   this.errorPopup_animation("Devi aggiungere almeno una merce! usa il pulsante [+]",true)
      // }
      // else{
      if(this.fornituraCreata){
        console.log(step);
        this.fornituraCreata.merci=this.merci;
        this.step_fornitura=step;
      }
      // }
    }
    else if(step==4){
      if(this.fornituraCreata){
        console.log(step);
        this.fornituraCreata.pellicole=this.pellicole;
        this.step_fornitura=step;
      }
    }
    else if(step==5){
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
    
    else if(step==6){
      window.location.reload()
    }
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
      this.fornituraModifica=null
      this.messageError = "Errore! Seleziona la forniture da modificare"
    }
    else if(this.fornitureSel.length>1) {
      this.fornituraModifica=null
      this.messageError = "Errore! Seleziona una sola fornitura da modificare"
    }
    else{
      this.fornituraModifica = this.forniture.find((f) => f.id == this.fornitureSel[0]) as Fornitura|null;
      let myDialog:any = <any>document.getElementById("popup");
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
  
}