import { Component, ElementRef, ViewChild } from "@angular/core";
import { Candidatura } from "../model/candidatura";
import { Dipendente } from "../model/dipendente";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Util } from "../services/util";
import { Mansione } from "../model/mansione";

@Component({
    selector: 'app-hr',
    template:`
    <div class="container">
        <br><br><br>
    <p class="titolo">VISUALIZZAZIONE CANDIDATURE</p>
    <div class="container-buttons">  
      <button class="item-button" style="background:red" (click)="eliminaCandidato();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
      </button>
      <p class="button-item">{{messageErrorCand}}</p>
      <div *ngIf="checkEliminaCand==true">
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazioneCandidatura()">Conferma</button>
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazioneCandidatura()">Annulla</button>
      </div>
    </div>
    <div class="table-div">
    <table>
      <tr class="title">
        <th></th>
        <th>ID</th>
        <th>Nome</th>
        <th>Cognome</th>
        <th>Mansione Richiesta</th>
        <th>Email</th>
      </tr>
      <tr class="row" *ngFor="let c of candidature">
        <td><input type="checkbox" [value]=c.id (change)="onCheckChangeCand($event)" style="width:20px;height:20px"></td>
        <td>{{c.id}}</td>
        <td>{{c.name}}</td>
        <td>{{c.surname}}</td>
        <td>{{c.jobTitle}}</td>
        <td>{{c.email}}</td>
      </tr>
    </table>
    </div>

    <p class="titolo">VISUALIZZAZIONE DIPENDENTI</p>
    <dialog #dialogoAdd>
    <div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Inserisci Dipendente</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAdd.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #dipendentiForm="ngForm" (ngSubmit)="creaDipendente(dipendentiForm.value)">
          <br>
          <p>Email</p>
          <input name="email" ngModel (click)="errorPopup_animation('',false)">
          <p>CF</p>
          <input name="cf" ngModel (click)="errorPopup_animation('',false)">
          <p>Genere</p>
          <input name="genere" ngModel (click)="errorPopup_animation('',false)">
          <p>Data di Nascita</p>
          <input type="date" name="data" ngModel (click)="errorPopup_animation('',false)">
          <p>Indirizzo</p>
          <input name="indirizzo" ngModel (click)="errorPopup_animation('',false)">
          <p>Telefono</p>
          <input name="telefono" ngModel (click)="errorPopup_animation('',false)">
          <p>Mansione</p>
          <select name="mansione" ngModel (click)="errorPopup_animation('',false)">
            <option *ngFor="let mansione of mansioni" [ngValue]="mansione">{{mansione}}</option>
          </select>
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

<dialog #dialogoModifica>
<div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Modifica Dipendente</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModifica.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #dipendentiFormModifica="ngForm" (ngSubmit)="update(dipendentiFormModifica.value)">
          <br>
          <p>Nome</p>
          <input name="nome" ngModel [(ngModel)]="nameValue" (click)="errorPopup_animation('',false)">
          <p>Cognome</p>
          <input name="cognome" ngModel [(ngModel)]="cognomeValue" (click)="errorPopup_animation('',false)">
          <p>Email</p>
          <input name="email" ngModel [(ngModel)]="emailValue" (click)="errorPopup_animation('',false)">
          <p>CF</p>
          <input name="cf" ngModel [(ngModel)]="dipendenteSelezionato.cf" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Genere</p>
          <input name="genere" ngModel [(ngModel)]="dipendenteSelezionato.genere" (click)="errorPopup_animation('',false)">
          <p>Data di Nascita</p>
          <input type="date" name="data" [(ngModel)]="dipendenteSelezionato.data_nascita" ngModel (click)="errorPopup_animation('',false)">
          <p>Indirizzo</p>
          <input name="indirizzo" ngModel [(ngModel)]="dipendenteSelezionato.indirizzo" (click)="errorPopup_animation('',false)">
          <p>Telefono</p>
          <input name="telefono" ngModel [(ngModel)]="dipendenteSelezionato.telefono" (click)="errorPopup_animation('',false)">
          <p>Mansione</p>
          <select name="mansione" ngModel [(ngModel)]="dipendenteSelezionato.mansione" (click)="errorPopup_animation('',false)">
            <option *ngFor="let mansione of mansioni" [ngValue]="mansione">{{mansione}}</option>
          </select>
          <p>userID</p>
          <input name="userID" ngModel [(ngModel)]="userIDValue" [readOnly]="true" (click)="errorPopup_animation('',false)">
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
      <button class="item-button" style="background:green" (click)="dialogoAdd.show();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">add</span>
      </button>
      
      <button class="item-button" style="background:red" (click)="eliminaDipendente();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
      </button>

      <button class="item-button" style="background:blue" (click)="modificaDipendente();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>

      <p class="button-item">{{messageErrorDip}}</p>
      <div *ngIf="checkEliminaDip==true">
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazioneDipendente()">Conferma</button>
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazioneDipendente()">Annulla</button>
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
        <th>CF</th>
        <th>Genere</th>
        <th>Data di Nascita</th>
        <th>Indirizzo</th>
        <th>Telefono</th>
        <th>Mansione</th>
      </tr>
      <tr class="row" *ngFor="let d of dipendenti">
        <td><input type="checkbox" [value]=d.id (change)="onCheckChangeDip($event)" style="width:20px;height:20px"></td>
        <td>{{d.id}}</td>
        <td>{{d.userID.nome}}</td>
        <td>{{d.userID.cognome}}</td>
        <td>{{d.userID.email}}</td>
        <td>{{d.cf}}</td>
        <td>{{d.genere}}</td>
        <td>{{d.data_nascita | date: "dd/MM/yyyy"}}</td>
        <td>{{d.indirizzo}}</td>
        <td>{{d.telefono}}</td>
        <td>{{d.mansione}}</td>
      </tr>
    </table>
    </div>
  </div>`,
  styleUrls: ["./riservata.css"],
    styles: [`
  `]
})

export class ResHrComponent{
    @ViewChild("dialogoModifica") dialogoModifica: ElementRef | undefined;
    candidature: Candidatura[] = [];
    dipendenti: Dipendente[] = [];
    checkEliminaCand : boolean = false;
    checkEliminaDip : boolean = false;
    errorPopup : HTMLElement|null=null;
    errorPopup_text = "";
    messageErrorCand = "";
    messageErrorDip = "";
    editing: boolean = false
    dipendentiSel: number[]=[]
    candidatiSel: number[]=[]
    mansioneSel: Mansione | null = null;
    emailValue:string = "";
    nameValue:string = "";
    cognomeValue:string = "";
    userIDValue:number = -1;
    dipendenteSelezionato: any = {};
    mansioni: string[] = this.enumValues(Mansione)

    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
    
    ngAfterViewInit() {
        this.errorPopup = document.getElementById("error-popup")
    }

    ngOnInit(): void {
        this.getCandidature()
        this.getDipendenti()
    }

    enumValues(enumType: any): string[]{
        return Object.keys(enumType).map(key => enumType[key]);
    }

    onCheckChangeDip(event:any){
        if(event.target.checked){
          this.dipendentiSel.push(event.target.value)
        }
        else{
          this.dipendentiSel = this.dipendentiSel.filter(d=>d !== event.target.value)
        }
        this.messageErrorDip="";
        this.checkEliminaDip=false;
      }

      onCheckChangeCand(event:any){
        if(event.target.checked){
          this.candidatiSel.push(event.target.value)
        }
        else{
          this.candidatiSel = this.candidatiSel.filter(c=>c !== event.target.value)
        }
        this.messageErrorCand="";
        this.checkEliminaCand=false;
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

      annullaEliminazioneCandidatura(){
        this.messageErrorCand = ""
        this.checkEliminaCand = false;
    
      }
      
      confermaEliminazioneCandidatura(){
        this.messageErrorCand = "Eliminati"
        
        this.http.post<HttpResponse<String>>(Util.candidatureServerUrl+"/delete",this.candidatiSel).subscribe(
          success => {
            window.location.reload()
          },
          error => {
            window.location.reload()
          }
        )
        this.checkEliminaCand = false;
      }

      annullaEliminazioneDipendente(){
        this.messageErrorDip = ""
        this.checkEliminaDip = false;
    
      }
      
      confermaEliminazioneDipendente(){
        this.messageErrorDip = "Eliminati"
        
        this.http.post<HttpResponse<String>>(Util.dipendentiServerUrl+"/delete",this.dipendentiSel).subscribe(
          success => {
            window.location.reload()
          },
          error => {
            window.location.reload()
          }
        )
        this.checkEliminaDip = false;
      }

      eliminaCandidato(){
        if(this.candidatiSel.length==0){
          this.messageErrorCand = "Errore! Seleziona prima i candidati da eliminare"
          this.checkEliminaCand = false;
        }
        else{
          this.messageErrorCand = "Sei sicuro di volerli eliminare?"
          this.checkEliminaCand = true;
        }
      }
      

    getCandidature(){
        this.http.get<Candidatura[]>(Util.candidatureServerUrl).subscribe(result=>{
          this.candidature=result;
          this.candidature=this.candidature.sort((a, b) => a.id - b.id);
          console.log(result)
        })
      }
    
      creaDipendente(form: any) {
        this.http.post<Dipendente>(Util.dipendentiServerUrl+"/create",form).subscribe(result=>{
            window.location.reload();
        })
      }

      eliminaDipendente(){
        if(this.dipendentiSel.length==0){
            this.messageErrorDip = "Errore! Seleziona prima i dipendenti da eliminare"
            this.checkEliminaDip = false;
          }
          else{
            this.messageErrorDip = "Sei sicuro di volerli eliminare?"
            this.checkEliminaDip = true;
          }
      }

      modificaDipendente(){
        if(this.dipendentiSel.length==0){
          this.editing=false
          this.messageErrorDip = "Errore! Seleziona prima i dipendenti da modificare"
        }
        else if(this.dipendentiSel.length>1) {
          this.editing=false
          this.messageErrorDip = "Errore! Seleziona un solo dipendente da modificare"
        }
        else{
          this.editing=true
          this.dipendenteSelezionato = this.dipendenti.find((d) => d.id == this.dipendentiSel[0]);
          this.emailValue = this.dipendenteSelezionato.userID.email;
          this.nameValue = this.dipendenteSelezionato.userID.nome;
          this.cognomeValue = this.dipendenteSelezionato.userID.cognome;
          this.userIDValue = this.dipendenteSelezionato.userID.id;
          if(this.dialogoModifica){
            this.dialogoModifica.nativeElement.showModal();
          }
        }
      }

      update(form:any){
        // const postForm = {
        //   form: form,
        //   id: this.dipendenteSelezionato.userID.id
        // };
        this.http.post<Dipendente>(Util.dipendentiServerUrl+"/update",form).subscribe(result=>{
          window.location.reload();
        })
      }
    
      getDipendenti(){
        this.http.get<Dipendente[]>(Util.dipendentiServerUrl).subscribe(result=>{
          this.dipendenti=result;
          this.dipendenti = this.dipendenti.sort((a, b) => a.id - b.id);
          console.log(result)
        })
      }
}