import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Pellicola } from '../model/pellicola';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../services/util';

@Component({
  selector: 'app-respellicola',
  template: `
<div class="container">
      <p class="titolo">PELLICOLE</p>
       <!-- Dialogo per l'aggiunta di un pellicola -->
      <dialog #dialogoAdd>
      <div class="background-blur">
        <div class="component-popup" style="width:auto;">
          <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Inserisci Pellicola</p>
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAdd.close();">
              <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
          </div>
          <div>
            <form #pellicoleForm="ngForm" (ngSubmit)="creaPellicola(pellicoleForm.value)">
              <br>
              <p>Ragione Sociale</p>
              <input name="ragione_sociale" ngModel (click)="errorPopup_animation('',false)">
              <p>Tipo</p>
              <input name="tipo" ngModel (click)="errorPopup_animation('',false)">
              <p>Indirizzo</p>
              <input name="indirizzo" ngModel (click)="errorPopup_animation('',false)">
              <p>Telefono</p>
              <input name="telefono" ngModel (click)="errorPopup_animation('',false)">
              <p>Email</p>
              <input name="email" ngModel (click)="errorPopup_animation('',false)">
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
              <p class="title-popup">Modifica Pellicola</p>
              <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModifica.close();">
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
              </button>
            </div>
            <div>
              <form #pellicolaFormModifica="ngForm" (ngSubmit)="update(pellicolaFormModifica.value)">
                <br>
                <p>Titolo</p>
                <input name="titolo" ngModel [ngModel]="pellicolaSelezionata.titolo" (click)="errorPopup_animation('',false)">
                <p>Data Uscita</p>
                <input type="date" name="data_uscita" ngModel [ngModel]="pellicolaSelezionata.data_uscita | date:'yyyy-MM-dd'" (click)="errorPopup_animation('',false)">
                <p>Durata</p>
                <input name="durata" ngModel [ngModel]="pellicolaSelezionata.durata" (click)="errorPopup_animation('',false)">
                <p>Generi</p>
                <input name="generi" ngModel [ngModel]="pellicolaSelezionata.generi" (click)="errorPopup_animation('',false)">
                <p>Pegi</p>
                <input name="pegi" ngModel [ngModel]="pellicolaSelezionata.pegi" (click)="errorPopup_animation('',false)">
                <p>Regista</p>
                <input name="regista" ngModel [ngModel]="pellicolaSelezionata.regista" (click)="errorPopup_animation('',false)">
                <p>Attori</p>
                <input name="attori" ngModel [ngModel]="pellicolaSelezionata.attori" (click)="errorPopup_animation('',false)">
                <p>Locandina</p>
                <input name="locandina" ngModel [ngModel]="pellicolaSelezionata.locandina" (click)="errorPopup_animation('',false)">
                <p>Trailer</p>
                <input name="trailer" ngModel [ngModel]="pellicolaSelezionata.trailer" (click)="errorPopup_animation('',false)">
                <p>Trama</p>
                <input name="trama" ngModel [ngModel]="pellicolaSelezionata.trama" (click)="errorPopup_animation('',false)">
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
        <button class="item-button" style="background:red" (click)="eliminaPellicola();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
        </button>
        <button class="item-button" style="background:blue" (click)="modificaPellicola();">
          <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
        </button>
        <p class="button-item">{{messageError}}</p>
        <div *ngIf="checkElimina == true">
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
          <th>Locandina</th>
          <th>Trailer</th>
          <th>Trama</th>
          <th>Fine Noleggio</th>
        </tr>
        <tr class="row" *ngFor="let p of pellicole">
          <td><input type="checkbox" [value]="p.id" (change)="onCheckChangeFor($event)"
          style="width:20px;height:20px"></td>
          <td>{{p.id}}</td>
          <td>{{p.titolo}}</td>
          <td>{{p.data_uscita | date:"dd-MM-yyyy"}}</td>
          <td>{{p.durata}} min</td>
          <td>{{p.generi}}</td>
          <td>{{p.pegi}}</td>
          <td>{{p.regista}}</td>
          <td>{{p.attori}}</td>
          <td>{{p.prezzo_noleggio}}</td>
          <td>{{p.locandina}}</td>
          <td>{{p.trailer}}</td>
          <td>{{p.trama}}</td>
          <td>{{p.fine_noleggio | date:"dd-MM-yyyy"}}</td>
        </tr>
      </table>
    </div> 
  </div>


  
  `,
  styleUrls: ["./riservata.css"],
  styles: [``]
})
export class ResPellicolaComponent {
    
    @ViewChild("dialogoModifica") dialogoModifica: ElementRef | undefined;
    pellicole: Pellicola[] = [];
    checkElimina : boolean = false;
    errorPopup : HTMLElement|null=null;
    errorPopup_text = "";
    messageError = "";
    editing: boolean = false
    pellicoleSel: number[]=[]
    pellicolaSelezionata: any = {};
    
    
    constructor(private http: HttpClient, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }
    
    ngAfterViewInit() {
        this.errorPopup = document.getElementById("error-popup")
    }
    
    ngOnInit(): void {
        this.getPellicole()
    }
    
    onCheckChangeFor(event:any){
    if(event.target.checked){
        this.pellicoleSel.push(event.target.value)
    }
    else{
        this.pellicoleSel = this.pellicoleSel.filter((f: any)=>f !== event.target.value)
    }
    this.messageError="";
    this.checkElimina=false;
    }
    
    onCheckChangeForn(event:any){
    if(event.target.checked){
        this.pellicoleSel.push(event.target.value)
    }
    else{
        this.pellicoleSel = this.pellicoleSel.filter(c=>c !== event.target.value)
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
    
    annullaEliminazionePellicola(){
    this.messageError = ""
    this.checkElimina = false;
    
    }
    
    confermaEliminazionePellicola(){
    this.messageError = "Eliminati"
    
    this.http.post<HttpResponse<String>>(Util.pellicoleServerUrl+"/delete",this.pellicoleSel).subscribe(
        success => {
        window.location.reload()
        },
        error => {
        window.location.reload()
        }
    )
    this.checkElimina = false;
    }
    
    creaPellicola(form: any) {
    this.http.post<Pellicola>(Util.pellicoleServerUrl+"/create",form).subscribe(result=>{
        window.location.reload();
    })
    }
    
    eliminaPellicola(){
    if(this.pellicoleSel.length==0){
        this.messageError = "Errore! Seleziona prima le pellicole da eliminare"
        this.checkElimina = false;
        }
        else{
        this.messageError = "Sei sicuro di volerli eliminare?"
        this.checkElimina = true;
        }
    }
    modificaPellicola() {
    if (this.pellicoleSel.length == 0) {
        this.editing = false;
        this.messageError = "Errore! Seleziona prima ,e pellicole da modificare";
    } else if (this.pellicoleSel.length > 1) {
        this.editing = false;
        this.messageError = "Errore! Seleziona una sola pellicola da modificare";
    } else {
        this.editing = true;
        // if (this.dialogoModifica) {
        this.pellicolaSelezionata = this.pellicole.find((p) => p.id == this.pellicoleSel[0]);
        
        console.log(this.pellicolaSelezionata);
        //   if(pellicolaSelezionato){
        //       this.dialogoModifica.nativeElement.querySelector("[name=nome]").value = pellicolaSelezionato.nome;
        //       this.dialogoModifica.nativeElement.showModal();
        //   }
        if (this.dialogoModifica) {
        this.dialogoModifica.nativeElement.showModal();
        }
    }
    }
    update(form:any){
        form['id']=this.pellicoleSel[0]
        const editedPellicola : Pellicola|null = form as Pellicola;
        if(editedPellicola){
            console.log(editedPellicola)
          
        }
        this.http.post<Pellicola>(Util.pellicoleServerUrl+"/update",form).subscribe(result=>{
            window.location.reload();
        })
    }
    getPellicole() {
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result => {
            this.pellicole = result;
        });
    }

    

  
}


