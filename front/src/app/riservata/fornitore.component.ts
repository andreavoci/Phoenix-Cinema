import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Fornitore } from "../model/fornitore";
import { Util } from "../services/util";

@Component({
  selector: 'app-fornitore',
  template: `
    <div class="container">
      <br><br><br>
      <p class="titolo">VISUALIZZAZIONE FORNITORI</p>
       <!-- Dialogo per l'aggiunta di un fornitore -->
    <dialog #dialogoAdd>
  <div class="background-blur">
    <div class="component-popup" style="width:auto;">
      <p id="error-popup">{{errorPopup_text}}</p>
      <div class="navbar-popup">
        <p class="title-popup">Inserisci Fornitore</p>
        <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoAdd.close();">
          <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
        </button>
      </div>
      <div>
        <form #fornitoriForm="ngForm" (ngSubmit)="creaFornitore(fornitoriForm.value)">
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
        <p class="title-popup">Modifica Fornitore</p>
        <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="dialogoModifica.close();">
          <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
        </button>
      </div>
      <div>
        <form #fornitoriFormModifica="ngForm" (ngSubmit)="update(fornitoriFormModifica.value)">
          <br>
          <p>Ragione Sociale</p>
          <input name="ragione_sociale" ngModel [(ngModel)]="fornitoreSelezionato.ragione_sociale" (click)="errorPopup_animation('',false)">
          <p>Tipo</p>
          <input name="tipo" ngModel [(ngModel)]="fornitoreSelezionato.tipo" (click)="errorPopup_animation('',false)">
          <p>Indirizzo</p>
          <input name="indirizzo" ngModel [(ngModel)]="fornitoreSelezionato.indirizzo" (click)="errorPopup_animation('',false)">
          <p>Telefono</p>
          <input name="telefono" ngModel [(ngModel)]="fornitoreSelezionato.telefono" (click)="errorPopup_animation('',false)">
          <p>Email</p>
          <input name="email" ngModel [(ngModel)]="fornitoreSelezionato.email" (click)="errorPopup_animation('',false)">
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
  <button class="item-button" style="background:red" (click)="eliminaFornitore();">
    <span class="material-icons" style="font-size:30px;color:white;width:100%;">delete</span>
  </button>
  <button class="item-button" style="background:blue" (click)="modificaFornitore();">
    <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
  </button>
  <p class="button-item">{{messageErrorForn}}</p>
  <div *ngIf="checkEliminaForn == true">
    <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="confermaEliminazioneFornitore()">Conferma</button>
    <button class="button-item" style="padding: 2px 6px 2px 6px;margin-left:5px;" (click)="annullaEliminazioneFornitore()">Annulla</button>
  </div>
</div>

<div class="table-div">
  <table>
    <tr class="title">
      <th></th>
      <th>ID</th>
      <th>Ragione Sociale</th>
      <th>Tipo</th>
      <th>Indirizzo</th>
      <th>Email</th>
      <th>Telefono</th>
    </tr>
    <tr class="row" *ngFor="let fornitore of fornitori">
      <td><input type="checkbox" [value]="fornitore.id" (change)="onCheckChangeFor($event)"
      style="width:20px;height:20px"></td>
      <td>{{fornitore.id}}</td>
      <td>{{fornitore.ragione_sociale}}</td>
      <td>{{fornitore.tipo}}</td>
      <td>{{fornitore.indirizzo}}</td>
      <td>{{fornitore.email}}</td>
      <td>{{fornitore.telefono}}</td>
    </tr>
  </table>
</div> 
</div>

`,
  styleUrls: ["./riservata.css"],
  styles: [``]
})

export class ResFornitoreComponent {
  @ViewChild("dialogoModifica") dialogoModifica: ElementRef | undefined;
 fornitori: Fornitore[] = [];
 checkEliminaForn : boolean = false;
 errorPopup : HTMLElement|null=null;
 errorPopup_text = "";
 messageErrorForn = "";
 editing: boolean = false
 fornitoriSel: number[]=[]
 emailValue:string = "";
 fornitoreSelezionato: any = {};
 
  
 constructor(private http: HttpClient, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

 ngAfterViewInit() {
  this.errorPopup = document.getElementById("error-popup")
}

ngOnInit(): void {
  this.getFornitori()
}

enumValues(enumType: any): string[]{
  return Object.keys(enumType).map(key => enumType[key]);
}

onCheckChangeFor(event:any){
  if(event.target.checked){
    this.fornitoriSel.push(event.target.value)
  }
  else{
    this.fornitoriSel = this.fornitoriSel.filter((f: any)=>f !== event.target.value)
  }
  this.messageErrorForn="";
  this.checkEliminaForn=false;
}

onCheckChangeForn(event:any){
  if(event.target.checked){
    this.fornitoriSel.push(event.target.value)
  }
  else{
    this.fornitoriSel = this.fornitoriSel.filter(c=>c !== event.target.value)
  }
  this.messageErrorForn="";
  this.checkEliminaForn=false;
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

annullaEliminazioneFornitore(){
  this.messageErrorForn = ""
  this.checkEliminaForn = false;

}

confermaEliminazioneFornitore(){
  this.messageErrorForn = "Eliminati"
 
  this.http.post<HttpResponse<String>>(Util.fornitoriServerUrl+"/delete",this.fornitoriSel).subscribe(
    success => {
      window.location.reload()
    },
    error => {
      window.location.reload()
    }
  )
  this.checkEliminaForn = false;
}

creaFornitore(form: any) {
  this.http.post<Fornitore>(Util.fornitoriServerUrl+"/create",form).subscribe(result=>{
      window.location.reload();
  })
}

eliminaFornitore(){
  if(this.fornitoriSel.length==0){
      this.messageErrorForn = "Errore! Seleziona prima i fornitori da eliminare"
      this.checkEliminaForn = false;
    }
    else{
      this.messageErrorForn = "Sei sicuro di volerli eliminare?"
      this.checkEliminaForn = true;
    }
}
modificaFornitore() {
  if (this.fornitoriSel.length == 0) {
    this.editing = false;
    this.messageErrorForn = "Errore! Seleziona prima i fornitori da modificare";
  } else if (this.fornitoriSel.length > 1) {
    this.editing = false;
    this.messageErrorForn = "Errore! Seleziona un solo fornitore da modificare";
  } else {
    this.editing = true;
    // if (this.dialogoModifica) {
    this.fornitoreSelezionato = this.fornitori.find((f) => f.id == this.fornitoriSel[0]);
    this.emailValue = this.fornitoreSelezionato.email;
    console.log(this.fornitoreSelezionato);
    //   if(fornitoreSelezionato){
    //       this.dialogoModifica.nativeElement.querySelector("[name=nome]").value = fornitoreSelezionato.nome;
    //       this.dialogoModifica.nativeElement.showModal();
    //   }
    if (this.dialogoModifica) {
      this.dialogoModifica.nativeElement.showModal();
    }
  }
}
update(form:any){
  window.location.reload();
  this.http.post<Fornitore>(Util.fornitoriServerUrl+"/update",form).subscribe(result=>{
    
  })
}
getFornitori() {
  this.http.get<Fornitore[]>(Util.fornitoriServerUrl).subscribe(result => {
    this.fornitori = result;
    console.log(result);
  });
}
}
