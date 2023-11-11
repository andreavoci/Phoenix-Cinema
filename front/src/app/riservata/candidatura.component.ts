import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Candidatura } from '../model/candidatura';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Util } from '../services/util';

@Component({
  selector: 'app-res-candidatura',
  template: `
  <div class="container">
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
  
  `,
  styleUrls: ["./riservata.css"],
  styles: [``]
})
export class ResCandidaturaComponent {
  candidature : Candidatura[] = [];
  checkEliminaCand = false;
  messageErrorCand = ""
  candidatiSel : number[] = [];
  constructor(private http: HttpClient){}
  ngOnInit(){
    this.getCandidature();
  }
  getCandidature(){
    this.http.get<Candidatura[]>(Util.candidatureServerUrl).subscribe(result=>{
      this.candidature=result;
      this.candidature=this.candidature.sort((a, b) => a.id - b.id);
      console.log(result)
    })
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

  
}


