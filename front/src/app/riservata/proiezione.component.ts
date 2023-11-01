import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Programmazione } from "../model/programmazione";
import { Posto } from "../model/posto";
import { Util } from "../services/util";

@Component({
    selector: 'app-proiezione',
    template:`
        <div class="container">
            <br><br><br>
            <p class="titolo">VISUALIZZAZIONE PROGRAMMAZIONI</p>
            <dialog #dialogoAddProg>
            <div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Inserisci Dipendente</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAddProg.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #dipendentiForm="ngForm" (ngSubmit)="creaProgrammazione(dipendentiForm.value)">
          <br>
          <p>Nome</p>
          <input name="nome" ngModel (click)="errorPopup_animation('',false)">
          <p>Cognome</p>
          <input name="cognome" ngModel (click)="errorPopup_animation('',false)">
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
          <input name="nome" ngModel [(ngModel)]="programmazioneSelezionata.nome" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Cognome</p>
          <input name="cognome" ngModel [(ngModel)]="programmazioneSelezionata.cognome" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>CF</p>
          <input name="cf" ngModel [(ngModel)]="programmazioneSelezionata.cf" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Genere</p>
          <input name="genere" ngModel [(ngModel)]="programmazioneSelezionata.genere" (click)="errorPopup_animation('',false)">
          <p>Data di Nascita</p>
          <input type="date" name="data" [(ngModel)]="programmazioneSelezionata.data_nascita" ngModel (click)="errorPopup_animation('',false)">
          <p>Indirizzo</p>
          <input name="indirizzo" ngModel [(ngModel)]="programmazioneSelezionata.indirizzo" (click)="errorPopup_animation('',false)">
          <p>Telefono</p>
          <input name="telefono" ngModel [(ngModel)]="programmazioneSelezionata.telefono" (click)="errorPopup_animation('',false)">
          
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
      <button class="item-button" style="background:green" (click)="dialogoAddProg.show();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">add</span>
      </button>
      
      <button class="item-button" style="background:red" (click)="eliminaProgrammazione();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
      </button>

      <button class="item-button" style="background:blue" (click)="modificaProgrammazione();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>

      <p class="button-item">{{messageErrorProg}}</p>
      <div *ngIf="checkEliminaProg==true">
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazioneProgrammazione()">Conferma</button>
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazioneProgrammazione()">Annulla</button>
      </div>
    </div>

    <div class="table-div">
    <table>
      <tr class="title">
        <th></th>
        <th>ID</th>
        <th>Titolo Pellicola</th>
        <th>Sala</th>
        <th>Spettatori</th>
        <th>Orario</th>
      </tr>
      <tr class="row" *ngFor="let pr of programmazioni">
        <td><input type="checkbox" [value]=pr.id (change)="onCheckChangeProg($event)" style="width:20px;height:20px"></td>
        <td>{{pr.id}}</td>
        <td>{{pr.pellicola.titolo}}</td>
        <td>{{pr.sala.nome}}</td>
        <td>{{getPostiOccupati(pr.posti)}}</td>
        <td>{{pr.orario | date: "dd/MM/yyyy"}}</td>        
      </tr>
    </table>
    </div>
        </div>
    `,
    styleUrls: ["./riservata.css"],
    styles: [``]
})

export class ResProiezioneComponent{
    @ViewChild("dialogoModifica") dialogoModificaProg: ElementRef | undefined;
    checkEliminaProg : boolean = false;
    errorPopup : HTMLElement|null=null;
    errorPopup_text = "";
    messageErrorProg = "";
    editingProg: boolean = false
    programmazioneSel: number[]=[]
    programmazioni: Programmazione[] = []
    programmazioneSelezionata: any = {}
    
    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

    ngAfterViewInit() {
        this.errorPopup = document.getElementById("error-popup")
    }

    ngOnInit(): void {
        this.getProgrammazioni()
    }

    onCheckChangeProg(event:any){
        if(event.target.checked){
          this.programmazioneSel.push(event.target.value)
        }
        else{
          this.programmazioneSel = this.programmazioneSel.filter(pr=>pr !== event.target.value)
        }
        this.messageErrorProg="";
        this.checkEliminaProg=false;
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

      annullaEliminazioneProgrammazione(){
        this.messageErrorProg= ""
        this.checkEliminaProg = false;
    
      }
      
      confermaEliminazioneProgrammazione(){
        this.messageErrorProg = "Eliminate"
        
        this.http.post<HttpResponse<String>>(Util.programmazioniServerUrl+"/delete",this.programmazioneSel).subscribe(
          success => {
            window.location.reload()
          },
          error => {
          }
        )
        this.checkEliminaProg = false;
      }

    getProgrammazioni(){
        this.http.get<Programmazione[]>(Util.programmazioniServerUrl).subscribe(result=>{
            this.programmazioni=result;
            console.log(this.programmazioni)
        })
    }

    creaProgrammazione(form: any) {
        this.http.post<Programmazione>(Util.programmazioniServerUrl+"/create",form).subscribe(result=>{
            console.log(result)
        })
    }

    eliminaProgrammazione(){
        if(this.programmazioneSel.length==0){
            this.messageErrorProg = "Errore! Seleziona prima i dipendenti da eliminare"
            this.checkEliminaProg = false;
          }
          else{
            this.messageErrorProg = "Sei sicuro di volerli eliminare?"
            this.checkEliminaProg = true;
          }
    }

    modificaProgrammazione(){
        if(this.programmazioneSel.length==0){
            this.editingProg=false
            this.messageErrorProg = "Errore! Seleziona prima i dipendenti da modificare"
          }
          else if(this.programmazioneSel.length>1) {
            this.editingProg=false
            this.messageErrorProg = "Errore! Seleziona un solo dipendente da modificare"
          }
          else{
            this.editingProg=true
            this.programmazioneSelezionata = this.programmazioni.find((pr) => pr.id == this.programmazioneSel[0]);
            if(this.dialogoModificaProg){
              this.dialogoModificaProg.nativeElement.showModal();
            }
          }
    }

    update(form:any){
        this.http.post<Programmazione>(Util.programmazioniServerUrl+"/update",form).subscribe(result=>{
          window.location.reload();
        })
    }

    getPostiOccupati(posti: Array<Posto>):number{
        const occupati: Posto[] = posti.filter(posto => posto.stato === 'OCCUPATO');
        return occupati.length;
    }
}