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
    
        <p style="color:white;font-size:25px;padding:10px">FORNITURE</p>
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
    
    `,
    styleUrls: ["./riservata.css"]
})

export class ResFornituraComponent{
    type: number = -1;
  messageError = "";
  prova =[0,1,2,3,4,5];
  sale: Sala[] = [];
  pellicole: Pellicola[] = [];
  forniture: Fornitura[] = [];
  fornitori: Fornitore[] = [];
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
    
    this.getForniture()
    this.getFornitori()
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

}