import { ActivatedRoute, Router } from '@angular/router';
import { Pellicola } from './../model/pellicola';
import { Component } from '@angular/core';
import { Programmazione } from '../model/programmazione';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { ElementoCarrello } from '../model/elementocarrello';
import { AuthBody } from '../model/authbody';

@Component({
  selector: 'app-acquisto',
  template: `
    <div class="container" *ngIf="programmazioneSelezionata"> 
      <br>
      <div class="titolo">
        <h1>{{programmazioneSelezionata.pellicola.titolo}} </h1>
        <p>{{programmazioneSelezionata.orario | date:"dd/MM/yyyy [HH:mm]"}}</p>
        <div class="checkout">
          <p class="total-cost">{{totalCost}} €</p>
          <button class="acquista" (click)="addToCart()">ACQUISTA</button><br>
        </div>
      </div>
      <div style="display:flex">
        <div class="sala">
          <div class="posti">
            <button class="posto"
              *ngFor="let posto of programmazioneSelezionata.posti"
              [class.selected]="postiAggiunti[posto.id]!=undefined"
              [class.busy]="posto.stato=='OCCUPATO'"
              (click)="selezionaPosto(posto.id, posto.numero)"
            >
            <img src="assets/image/sedia_acquisto.png">
            <div class="numero_posto" >{{posto.numero}}</div>
            </button>
          </div>
        </div>
        <div class="informazioni" style="color: black">
          <h3>Posti selezionati:</h3>
          <p style="font-size:15px;font-weight:bold;"*ngFor="let p of postiAggiunti | keyvalue">[ {{p.value}} ] - {{programmazioneSelezionata.prezzo}}€</p>
          

        </div>
      </div>
    </div>
  `,
  styles: [`
    .container{
      height: 100%;
      min-height: calc(100vh - 80px);
      background:rgba(255,255,255,0.5);
    }
    img{
      width:40px;
      height:40px;
    }
    .numero_posto{
      font-size:10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .titolo {
      position: relative;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: left; /* Centra il testo orizzontalmente */
      color:white;
      margin: 0px 15px 10px 25px ; 
      height: auto; /* Regola l'altezza desiderata */
    }
    .checkout{
      position: absolute;
      right: 0px;
      bottom: 0px;
      display:flex;
      align-items:center;
      justify-content:center;
      margin:5px 15px;
    }
    .total-cost{
      color:black;
      font-weight:bold;
      font-size:20px;
      padding:0px 15px;
    }
    .acquista{
      cursor:pointer;
      padding:6px 5px;
      border:solid 1px white;
      border-radius:5px;
      font-weight:bold;
      font-size:15px;
      color:black;
      background:rgba(250,108,20,1);
    }
    .sala{
      width:80%;
      display:flex;
      flex-direction:column;
    }
    .posti {
      display: grid;
      grid-template-columns: repeat(10, minmax(45px, 50px));
      gap: 1px;
      border: none;
      background-color: rgba(255,255,255,0);
      padding: 5px;
      flex-basis: calc(20% - 10px);
      margin:10px 10px 0px 25px;
      
      justify-content:center;
    }

    .posto {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      width: auto;
      border: none;
      background:none;
      position: relative;
    }

    .posto:hover {
      filter:brightness(50%) sepia(100%) hue-rotate(-3deg) saturate(10);
    }

    .posto.selected {
      filter:brightness(50%) sepia(100%) hue-rotate(-3deg) saturate(10);
    }
    .posto.busy {
      pointer-events: none;
      filter:brightness(30%) sepia(80%) hue-rotate(-50deg) saturate(10);
    }
    .informazioni{
      flex:1;
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
      padding:10px;
      width:20%;
      height: 100% /* Regola l'altezza desiderata */
    }

  `]
})
export class AcquistoComponent {
  programmazioneSelezionata: Programmazione|null = null;
  posti: { numero: number, selezionato: boolean }[] = [];
  idProgrammazione: number = -1;
  postiAggiunti:{ [key: number]: String }={}
  totalCost = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // Inizializza i posti nella sala cinematografica (puoi personalizzarli come desideri)
    if (this.route.snapshot.paramMap.get('id')){
      this.idProgrammazione = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.getProgrammazione(this.idProgrammazione);
  }

  getProgrammazione(id:number){
    return this.http.get<Programmazione>(Util.programmazioniServerUrl+"/"+this.idProgrammazione+"/acquisto").subscribe(result =>{
      this.programmazioneSelezionata=result;
      console.log(result);
    })
  }

  selezionaPosto(p_id: number,p_numero:String) {
    if(this.programmazioneSelezionata){
      if(p_id in this.postiAggiunti){
        delete this.postiAggiunti[p_id];
      }
      else{
        this.postiAggiunti[p_id]=p_numero;
      }
      this.totalCost=0;
      for(let k in this.postiAggiunti){
        this.totalCost+=this.programmazioneSelezionata.prezzo;
      }        
      this.totalCost= Number(this.totalCost.toFixed(2))
    }

    // Cambia lo stato di selezione del posto quando viene fatto clic su di esso
    // this.posti[index].selezionato = !this.posti[index].selezionato;
  }
  
  addToCart(){
    
    console.log(AuthService.getToken("id"))
    if(this.programmazioneSelezionata){
      if(AuthService.getToken("id")){
        var userId:number = Number(AuthService.getToken("id"))
        var elementi:ElementoCarrello[] = [];
        for (let key in this.postiAggiunti) {
          console.log(key)
          console.log(this.postiAggiunti[key])
          elementi.push(new ElementoCarrello(this.programmazioneSelezionata,Number(key),this.programmazioneSelezionata.prezzo));
          // Use `key` and `value`
        }
        
        var authBody:AuthBody=new AuthBody(userId,elementi);
        
        this.http.post(Util.carrelloServerUrl+"/add",authBody, { responseType: 'text' }).subscribe(result =>{
        
        console.log(result)
        
        this.router.navigate(['/carrello']);
      })
      }else{
        this.router.navigate(['/login']);
      }
    }
  }
}
