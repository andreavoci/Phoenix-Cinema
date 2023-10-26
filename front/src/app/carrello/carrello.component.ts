import { Component } from '@angular/core';
import { Carrello } from '../model/carrello';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { AuthBody } from '../model/authbody';
import { NONE_TYPE } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { ElementoCarrello } from '../model/elementocarrello';
import { Programmazione } from '../model/programmazione';

@Component({
  selector: 'app-carrello',
  template: `
    <div class="container">
      <div class="header">
      
        <!-- <button type="button" class="button-left" (click)="removeAll()">
          ELIMINA TUTTO
        </button> -->
        
        <h1>CARRELLO</h1>
        
        <!-- <button type="button" class="button-right" (click)="checkout()">
          CHECKOUT
        </button> -->
      </div>
      <!-- <div *ngFor="let e of elementi" class="container-elemento">
        <div class="container-dettagli">
          <p class="text-title">{{e.programmazione.pellicola.titolo}}</p>
          <div class="container-info">
              <p class="text-info">
                {{e.programmazione.orario | date:'[ccc] dd/MM/yyyy HH:mm'}}
              </p>
            
              <p class="text-info">POSTO : {{e.posto}}</p>
          </div>
        </div>
        <div class="container-button">
          <button type="button" class="button-right" (click)="remove(e)">
            RIMUOVI
          </button>
        </div>
      </div> -->
      <div class="row" *ngFor="let e of elementi">
        <div class="date">
          <p>{{e.programmazione.orario | date:'ccc'}}</p>
          <p>{{e.programmazione.orario | date:'dd'}}</p>
          <p>{{e.programmazione.orario | date:'MMM'}}</p>
        </div> 
        <section class="content">
          <p>phoenix cinema</p>
            <p>{{e.programmazione.pellicola.titolo}}</p>
            <p>{{getPosto(e)}}</p>
            <button (click)="remove(e)" [routerLink]="['/carrello']">RIMUOVI</button>
        </section>
      </div>
      <div *ngIf="elementi.length>0">
      <button class="checkout-button" (click)="checkout()">CHECKOUT</button>
      <!-- <p>
        carrello works!
      </p>
      <div *ngIf="carrello">{{carrello.elementi}}
        <div *ngFor="let e of elementi">
          <div *ngIf="e.programmazione as Programmazione">
            {{e.programmazione.pellicola.titolo}}
          </div>
        </div>
      </div> -->
      </div>
    </div>
  `,
  styles: [`
  
    .container {
      width: 100%;
      background: rgb(250,108,20);
      background: radial-gradient(circle, rgba(250,108,20,1) 0%, rgba(90,30,4,1) 100%);
      height: 100%;
      min-height: calc(100vh - 80px);
      display: flex;
      overflow: auto;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }
    .header {
        background: #000000;
        color: white;
        padding: 10px;
        text-align: left;
        width: 100%;
        margin-bottom: 20px;
        justify-content: space-between;
        text-align: center; /* Sposta a destra */
      }
    .container-elemento {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      display: flex;
      margin-top: 10px;
      align-items: center;
      border-width: 2px;
      border-style: solid;
      margin-bottom: 10px;
      justify-content: flex-start;
    }
    .container-dettagli {
      flex: 0 0 auto;
      width: 80%;
      height: auto;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-start;
    }
    .container-info {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .text-title {
      width: 100%;
      height: auto;
      font-size: 40px;
      padding-top: 10px;
      padding-left: 20px;
    }
    .text-info {
      font-size: 25px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 40px;
    }
    .container-button {
      flex: 0 0 auto;
      width: 20%;
      height: auto;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
    button {
      
      margin-left: 5px;
      margin-right: 5px;
      padding: 4px 8px;
      font-size: 16px;
      font-weight:bold;
      background:rgba(250,108,20,1);
      border: solid 2px black;
      border-radius:5px;
    }
    button:hover {
      cursor:pointer;
      background:orange;
    }

    .row {
  display: table;
  justify-content: center; /* Center the tickets horizontally */
  width: 60%; /* Adjust the width to make them narrower */
  margin: 10px auto; /* Center the tickets vertically and add margin */
  background-color: #fff;
  color: #989898;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  border-radius: 8px;
  position: relative;
    
}

.date {
  display: table-cell;
  width: 25%;
  height:auto;
  position: relative;
  text-align: center;
  vertical-align: middle;
  border-right: 2px dashed #dadde6;
  margin: 0 auto;
}

.date:before,
.date:after {
    content: "";
    display: none;
    width: 30px;
    height: 30px;
    background-color: #DADDE6;
    position: absolute;
    top: -15px;
    right: -15px;
    z-index: 1;
    border-radius: 50%
}
.date p{
  margin: 7px 0;
}
.date p:first-child{
  text-transform: uppercase;
    font-weight: 600;
    font-size: 120%;
}
.date p:nth-child(2) {
    color: #2b2b2b;
    font-weight: 600;
    font-size: 250%;
    margin-top: -10px
}

.date p:last-child{

  text-transform: uppercase;
    font-weight: 600;
    margin-top: -10px
}

.content {
    display: table-cell;
    width: 75%;
    font-size: 85%;
    padding: 15px 30px;
}

.content p {
    font-size: 90%;
    padding: 5px 0px 10px 0px;
}
  `,
  ]
})
export class CarrelloComponent {
  
  constructor(private http: HttpClient,private route: ActivatedRoute){}

  carrello: Carrello | null = null;
  elementi: ElementoCarrello[] = [];
  id:number = -1;

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (AuthService.getToken('id')){
      this.id = Number(AuthService.getToken('id'));
    }    
    this.getCart(); 
  }

  getCart():void{
    var authbody:AuthBody = new AuthBody(this.id,"empty");
    console.log(authbody);
    this.http.post<Carrello>(Util.carrelloServerUrl,authbody).subscribe(result=>{
      console.log(result);
      this.carrello = result;
      if(result != null){
        this.elementi = result.elementi;
      }
    })
  }
  
  remove(e:ElementoCarrello):void{
    var authbody:AuthBody = new AuthBody(this.id,e.id);
    console.log(authbody);
    this.http.post<Carrello>(Util.carrelloServerUrl+"/delete",authbody).subscribe(result=>{
      console.log(result);
      window.location.reload();
    })
  }

  removeAll():void{
    var authbody:AuthBody = new AuthBody(this.id,"empty");
    console.log(authbody);
    this.http.post<Carrello>(Util.carrelloServerUrl+"/deleteAll",authbody).subscribe(result=>{
      console.log(result);
      window.location.reload();
    })
  }
  
  checkout():void{
    var authbody:AuthBody = new AuthBody(this.id,"empty");
    console.log(authbody);
    this.http.post<Carrello>(Util.carrelloServerUrl+"/checkout",authbody).subscribe(result=>{
      console.log(result);
      window.location.reload();
    })
  }

  getPosto(e:ElementoCarrello): string{
    var programmazione:Programmazione = e.programmazione;
    for(const p of programmazione.posti){
      if(p.id === e.posto){
        return p.numero;
      }
    }
    return "";
  }
}
