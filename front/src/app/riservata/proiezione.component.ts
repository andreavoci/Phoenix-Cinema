import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Programmazione } from "../model/programmazione";
import { Posto } from "../model/posto";
import { Util } from "../services/util";
import { Pellicola } from "../model/pellicola";
import { Sala } from "../model/sala";
import { Fornitura } from "../model/fornitura";

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
            <p class="title-popup">Inserisci Programmazione</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAddProg.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #programmazioneForm="ngForm" (ngSubmit)="creaProgrammazione(programmazioneForm.value)">
          <br>
          <br>
          <p>Pellicola</p>
          <select name="pellicola" ngModel [(ngModel)]="programmazioneSelezionata.pellicola"  (click)="errorPopup_animation('',false)">
            <option *ngFor="let p of pellicole" [ngValue]="p">{{p.titolo}}</option>
          </select>         
          <p>Sala</p>
          <select name="sala" ngModel [(ngModel)]="programmazioneSelezionata.sala"  (click)="errorPopup_animation('',false)">
            <option *ngFor="let s of sale" [ngValue]="s">{{s.nome}}</option>
          </select>
          <p>Prezzo</p>
          <input name="prezzo" ngModel [(ngModel)]="programmazioneSelezionata.prezzo"  (click)="errorPopup_animation('',false)">
          <p>Orario</p>
          <input type="datetime-local" name="orario" ngModel [(ngModel)]="programmazioneSelezionata.orario"  (click)="errorPopup_animation('',false)">
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

<dialog #dialogoModificaProg>
<div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Modifica Programmazione</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModificaProg.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #programmazioneFormModifica="ngForm" (ngSubmit)="updatePellicola(programmazioneFormModifica.value)">
          <br>
          <p>ID Pellicola</p>
          <input name="pellicola" ngModel [(ngModel)]="programmazioneSelezionata.pellciola" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Sala</p>
          <input name="sala" ngModel [(ngModel)]="programmazioneSelezionata.sala" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Orario</p>
          <input type="datetime" name="orario" ngModel [(ngModel)]="programmazioneSelezionata.orario" [readOnly]="true" (click)="errorPopup_animation('',false)">
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
        <th>Durata</th>
        <th>Prezzo</th>
      </tr>
      <tr class="row" *ngFor="let pr of programmazioni">
        <td><input type="checkbox" [value]=pr.id (change)="onCheckChangeProg($event)" style="width:20px;height:20px" *ngIf="getPostiOccupati(pr.posti)==0"></td>
        <td>{{pr.id}}</td>
        <td>{{pr.pellicola.titolo}}</td>
        <td>{{pr.sala.nome}}</td>
        <td>{{getPostiOccupati(pr.posti)}} / {{pr.sala.capienza}}</td>
        <td>{{pr.orario | date: "dd/MM/yyyy HH:mm"}}</td> 
        <td>{{pr.pellicola.durata}} min</td>
        <td>{{pr.prezzo | currency: 'EUR'}}</td>       
      </tr>
    </table>
    </div>
    
    <p class="titolo">VISUALIZZAZIONE PELLICOLE</p>
    <dialog #dialogoAddPell>
            <div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Inserisci Pellicole</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAddPell.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        
      </div>
    </div>
  </div> 
</dialog>
<dialog #dialogoModificaPellicola>
<div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Modifica Pellicole</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModificaPellicola.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
          <form #pellicoleForm="ngForm" (ngSubmit)="updatePellicola(pellicoleForm.value)">
          <br>
          <p>ID</p>
          <input name="id_pellicola" ngModel [(ngModel)]="pellicolaSelezionata.id" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Titolo</p>
          <input name="titolo" ngModel [(ngModel)]="pellicolaSelezionata.titolo" (click)="errorPopup_animation('',false)">
          <p>Data Uscita</p>
          <input type="date" name="data" ngModel [(ngModel)]="pellicolaSelezionata.data_uscita" [readOnly]="true" (click)="errorPopup_animation('',false)">
          <p>Durata</p>
          <input name="durata" ngModel [(ngModel)]="pellicolaSelezionata.durata" (click)="errorPopup_animation('',false)">
          <p>Generi</p>
          <input name="generi" ngModel [(ngModel)]="pellicolaSelezionata.generi" (click)="errorPopup_animation('',false)">
          <p>Pegi</p>
          <input name="pegi" ngModel [(ngModel)]="pellicolaSelezionata.pegi" (click)="errorPopup_animation('',false)">
          <p>Trama</p>
          <input name="trama" ngModel [(ngModel)]="pellicolaSelezionata.trama" (click)="errorPopup_animation('',false)">
          <p>Regista</p>
          <input name="regista" ngModel [(ngModel)]="pellicolaSelezionata.regista" (click)="errorPopup_animation('',false)">
          <p>Attori</p>
          <input name="attori" ngModel [(ngModel)]="pellicolaSelezionata.attori" (click)="errorPopup_animation('',false)">
          <p>Trailer</p>
          <input name="trailer" ngModel [(ngModel)]="pellicolaSelezionata.trailer" (click)="errorPopup_animation('',false)">
          <p>Locandina</p>
          <input name="locandina" ngModel [(ngModel)]="pellicolaSelezionata.locandina" (click)="errorPopup_animation('',false)">
          <p>Fornitura</p>
          <input name="id_fornitura" ngModel [(ngModel)]="idFornituraPell" [readOnly]="true" (click)="errorPopup_animation('',false)">
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
      <button class="item-button" style="background:red" (click)="eliminaPellicola();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
      </button>

      <button class="item-button" style="background:blue" (click)="modificaPellicola();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>

      <p class="button-item">{{messageErrorPellicola}}</p>
      <div *ngIf="checkEliminaPellicola==true">
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazionePellicola()">Conferma</button>
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazionePellicola()">Annulla</button>
      </div>
    </div>

    <div class="table-div">
    <table>
      <tr class="title">
        <th></th>
        <th>ID</th>
        <th>Titolo</th>
        <th>Data Uscita</th>
        <th>Durata</th>
        <th>Generi</th>
        <th>Pegi</th>
        <th>Regista</th>
        <th>Attori</th>
        <th>Prezzo Noleggio</th>
        <th>Trama</th>
        <th>Fine Noleggio</th>
        <!-- <th>ID Fornitura</th> -->
      </tr>
      <tr class="row" *ngFor="let pe of pellicole">
        <td><input type="checkbox" [value]=pe.id (change)="onCheckChangePell($event)" style="width:20px;height:20px"></td>
        <td>{{pe.id}}</td>
        <td>{{pe.titolo}}</td>
        <td>{{pe.data_uscita | date:"dd/MM/yyyy"}}</td>
        <td>{{pe.durata}}min</td>
        <td>{{pe.generi}}</td>
        <td>{{pe.pegi}}</td>
        <td>{{pe.regista}}</td>
        <td>{{pe.attori}}</td>
        <td>{{pe.prezzo_noleggio | currency: 'EUR'}}</td>
        <td>{{pe.trama}}</td>
        <td>{{pe.fine_noleggio | date: "dd/MM/yyyy"}}</td>
        <!-- <td>{{pe.fornitura.id}}</td>    -->
      </tr>
    </table>
    </div>

            <p class="titolo">VISUALIZZAZIONE SALE CINEMATOGRAFICHE</p>
            <dialog #dialogoAddSala>
            <div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Inserisci Sala</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAddSala.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>     
        <form #salaForm="ngForm" (ngSubmit)="creaSala(salaForm.value)">
          <br>
          <br>
          <p>Nome</p>
          <input name="nome" ngModel [(ngModel)]="salaSelezionata.nome"  (click)="errorPopup_animation('',false)">     
          <p>Capienza</p>
          <input name="capienza" ngModel [(ngModel)]="salaSelezionata.capienza"  (click)="errorPopup_animation('',false)">
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

<dialog #dialogoModificaSala>
<div class="background-blur">
        
        <div class="component-popup" style="width:auto;">
        <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Modifica Sala</p>
            
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModificaSala.close();" >
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>      
        <form #salaFormModifica="ngForm" (ngSubmit)="updateSala(salaFormModifica.value)">
          <br>
          <p>Nome</p>
          <input name="nome" ngModel [(ngModel)]="salaSelezionata.nome"  (click)="errorPopup_animation('',false)">     
          <p>Capienza</p>
          <input name="capienza" ngModel [(ngModel)]="salaSelezionata.capienza"  (click)="errorPopup_animation('',false)">
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
      <button class="item-button" style="background:green" (click)="dialogoAddSala.show();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">add</span>
      </button>
      
      <button class="item-button" style="background:red" (click)="eliminaSala();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
      </button>

      <button class="item-button" style="background:blue" (click)="modificaSala();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>

      <p class="button-item">{{messageErrorSala}}</p>
      <div *ngIf="checkEliminaSala==true">
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazioneSala()">Conferma</button>
        <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazioneSala()">Annulla</button>
      </div>
    </div>

    <div class="table-div">
    <table>
      <tr class="title">
        <th></th>
        <th>ID</th>
        <th>Nome</th>
        <th>Capienza</th>
      </tr>
      <tr class="row" *ngFor="let s of sale">
        <td><input type="checkbox" [value]=s.id (change)="onCheckChangeSala($event)" style="width:20px;height:20px"></td>
        <td>{{s.id}}</td>
        <td>{{s.nome}}</td>
        <td>{{s.capienza}}</td>  
      </tr>
    </table>
    </div>
    <p class="titolo">NOW PLAYING</p>
    <div class="container-film">
            <div *ngFor="let pr of programmazioni">
              <p *ngIf="pr.orario == this.dataCorrente">ciao</p>
            </div>
        </div>
    </div>
    `,
    styleUrls: ["./riservata.css"],
    styles: [`
    .container-film {
            flex-flow: row wrap;
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        a{
            flex: 0 0 calc(25% - 1em);
            margin: 5px 10px;
            position: relative;
            display: inline-block;
            max-width:200px;
            width:100%;
            height:100%;
        }`]
})

export class ResProiezioneComponent{
    @ViewChild("dialogoModificaProg") dialogoModificaProg: ElementRef | undefined;
    @ViewChild("dialogoModificaPellicola") dialogoModificaPellicola: ElementRef | undefined;
    @ViewChild("dialogoModificaSala") dialogoModificaSala: ElementRef | undefined;
    checkEliminaProg : boolean = false;
    checkEliminaPellicola : boolean = false;
    checkEliminaSala : boolean = false;
    errorPopup : HTMLElement|null=null;
    errorPopup_text = "";
    messageErrorProg = "";
    editingProg: boolean = false;
    messageErrorPellicola = "";
    editingPell: boolean = false;
    messageErrorSala = "";
    editingSala: boolean = false;
    programmazioneSel: number[]=[]
    pellicoleSel: number[]=[]
    saleSel: number[]=[]
    programmazioni: Programmazione[] = []
    sale: Sala[] = []
    pellicole: Pellicola[] = []
    programmazioneSelezionata: any = {}
    pellicolaSelezionata: any = {}
    idFornituraPell:number = -1;
    salaSelezionata: any = {};
    dataCorrente: Date = new Date();
    
    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

    ngAfterViewInit() {
        this.errorPopup = document.getElementById("error-popup")
    }

    ngOnInit(): void {
        this.getProgrammazioni()
        this.getPellicole()
        this.getSale()
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

      //PROGRAMMAZIONI

      annullaEliminazioneProgrammazione(){
        this.messageErrorProg= ""
        this.checkEliminaProg = false;
      }
      
      confermaEliminazioneProgrammazione(){
        this.messageErrorProg = "Eliminate"
        this.http.post<HttpResponse<String>>(Util.programmazioniServerUrl+"/delete",this.programmazioneSel).subscribe(result=>{
            window.location.reload()
        });
        this.checkEliminaProg = false;
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

    getProgrammazioni(){
        this.http.get<Programmazione[]>(Util.programmazioniServerUrl).subscribe(result=>{
            this.programmazioni=result;
            this.programmazioni=this.programmazioni.sort((a, b) => a.id - b.id);
            console.log(this.programmazioni)
        })
    }

    creaProgrammazione(form: any) {
        this.http.post<Programmazione>(Util.programmazioniServerUrl+"/create",form).subscribe(result=>{
            window.location.reload();
        })
    }

    eliminaProgrammazione(){
        if(this.programmazioneSel.length==0){
            this.messageErrorProg = "Errore! Seleziona prima le programmazioni da eliminare"
            this.checkEliminaProg = false;
          }
          else{
            this.messageErrorProg = "Sei sicuro di volerle eliminare?"
            this.checkEliminaProg = true;
          }
    }

    modificaProgrammazione(){
        if(this.programmazioneSel.length==0){
            this.editingProg=false
            this.messageErrorProg = "Errore! Seleziona prima le programmazioni da modificare"
          }
          else if(this.programmazioneSel.length>1) {
            this.editingProg=false
            this.messageErrorProg = "Errore! Seleziona una sola programmazione da modificare"
          }
          else{
            this.editingProg=true
            this.programmazioneSelezionata = this.programmazioni.find((pr) => pr.id == this.programmazioneSel[0]);
            if(this.dialogoModificaProg){
              this.dialogoModificaProg.nativeElement.showModal();
            }
          }
    }

    updateProgrammazione(form:any){
        this.http.post<Programmazione>(Util.programmazioniServerUrl+"/update",form).subscribe(result=>{
          window.location.reload();
        })
    }

    getPostiOccupati(posti: Array<Posto>):number{
      const occupati: Posto[] = posti.filter(posto => posto.stato === 'OCCUPATO');
      return occupati.length;
  }
    
    //PELLICOLE

    getPellicole(){
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result =>{
            this.pellicole=result;
            this.pellicole=this.pellicole.sort((a, b) => a.id - b.id);
            console.log(this.pellicole)
        })
    }

    creaPellicola(form: any){

    }

      onCheckChangePell(event:any){
        if(event.target.checked){
          this.pellicoleSel.push(event.target.value)
        }
        else{
          this.pellicoleSel = this.pellicoleSel.filter(pe=>pe !== event.target.value)
        }
        this.messageErrorPellicola="";
        this.checkEliminaPellicola=false;
      }

    eliminaPellicola(){
        if(this.pellicoleSel.length==0){
            this.messageErrorPellicola = "Errore! Seleziona prima le pellicole da eliminare"
            this.checkEliminaPellicola = false;
          }
          else{
            this.messageErrorPellicola = "Sei sicuro di volerle eliminare?"
            this.checkEliminaPellicola = true;
          }
    }

    modificaPellicola(){
        if(this.pellicoleSel.length==0){
            this.editingPell=false
            this.messageErrorPellicola = "Errore! Seleziona prima le pellicole da modificare"
          }
          else if(this.pellicoleSel.length>1) {
            this.editingPell=false
            this.messageErrorPellicola = "Errore! Seleziona una sola pellicola da modificare"
          }
          else{
            this.editingPell=true
            this.pellicolaSelezionata = this.pellicole.find((pe) => pe.id == this.pellicoleSel[0]);
            this.idFornituraPell=this.pellicolaSelezionata.fornitura.id;
            if(this.dialogoModificaPellicola){
              this.dialogoModificaPellicola.nativeElement.showModal();
            }
          }
    }

    annullaEliminazionePellicola(){
        this.messageErrorPellicola= ""
        this.checkEliminaPellicola = false;
    }

    confermaEliminazionePellicola(){
        this.messageErrorPellicola = "Eliminate"
        this.http.post<HttpResponse<String>>(Util.pellicoleServerUrl+"/delete",this.pellicoleSel).subscribe(result=>{
            window.location.reload()
        })
        this.checkEliminaPellicola = false;
    }

    updatePellicola(form:any){
        console.log(form);
        this.http.post<Pellicola>(Util.pellicoleServerUrl+"/update",form).subscribe(result=>{
          window.location.reload();
        })
    }


    //SLE

    getSale(){
      this.http.get<Sala[]>(Util.saleServerUrl).subscribe(result =>{
          this.sale=result;
          this.sale=this.sale.sort((a,b) => a.id - b.id);
      })
  }

  creaSala(form: any){
    this.http.post<Sala>(Util.saleServerUrl+"/create",form).subscribe(result=>{
      window.location.reload()
    })
  }

    onCheckChangeSala(event:any){
      if(event.target.checked){
        this.saleSel.push(event.target.value)
      }
      else{
        this.saleSel = this.saleSel.filter(sa=>sa !== event.target.value)
      }
      this.messageErrorSala="";
      this.checkEliminaSala=false;
    }

  eliminaSala(){
      if(this.saleSel.length==0){
          this.messageErrorSala = "Errore! Seleziona prima le sale da eliminare"
          this.checkEliminaSala = false;
        }
        else{
          this.messageErrorSala = "Sei sicuro di volerle eliminare?"
          this.checkEliminaSala = true;
        }
  }

  modificaSala(){
      if(this.saleSel.length==0){
          this.editingSala=false
          this.messageErrorSala = "Errore! Seleziona prima le sale da modificare"
        }
        else if(this.saleSel.length>1) {
          this.editingSala=false
          this.messageErrorSala = "Errore! Seleziona una sola sala da modificare"
        }
        else{
          this.editingSala=true
          this.salaSelezionata = this.sale.find((sa) => sa.id == this.saleSel[0]);
          if(this.dialogoModificaSala){
            this.dialogoModificaSala.nativeElement.showModal();
          }
        }
  }

  annullaEliminazioneSala(){
      this.messageErrorSala= ""
      this.checkEliminaSala = false;
  }

  confermaEliminazioneSala(){
      this.messageErrorSala = "Eliminate"
      this.http.post<HttpResponse<String>>(Util.saleServerUrl+"/delete",this.saleSel).subscribe(result=>{
          window.location.reload()
      })
      this.checkEliminaSala = false;
  }

  updateSala(form:any){
      form ["id"] = this.saleSel[0]
      console.log(form);
      this.http.post<Pellicola>(Util.saleServerUrl+"/update",form).subscribe(result=>{
        window.location.reload();
      })
  }

  //NOWPLAYING

  isToday(dataPr: Date, dataCorrente: Date):boolean{
    return(
      dataPr.getDate()===dataCorrente.getDate()&&
      dataPr.getMonth()===dataCorrente.getMonth()&&
      dataPr.getFullYear()===dataCorrente.getFullYear()
    );
  }
}