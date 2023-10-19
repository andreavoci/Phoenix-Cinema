import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Programmazione } from '../model/programmazione';
import { Pellicola } from '../model/pellicola';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../model/authbody';
import { ElementoCarrello } from '../model/elementocarrello';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-programmazione',
  template: `
  <div *ngIf="pellicola" class="container-back">
    <div  [style.background-image]="'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.00%,rgb(0, 0, 0) 100.00%),url('+ pellicola.locandina + ')'" class="locandina">
      <p class="titolo">{{pellicola.titolo}}</p>
    </div>
    <div class="container-body">
      <div class="container-left">
        <h2 class="title-text">TRAILER</h2>
        <div class="container-video">
          <iframe class="video" [src]="trailerUrl">
          </iframe>
         </div>
        <h2 class="title-text">TRAMA</h2>
        <p class="paragraph-text">{{pellicola.trama}}</p>
        <h2 class="title-text">REGISTA</h2>
        <p class="paragraph-text">{{pellicola.regista}}</p>
        <h2 class="title-text">ATTORI</h2>
        <p class="paragraph-text">{{pellicola.attori}}</p>
      </div>
      <section class="container-right">
<h1>Programmazione:</h1>
  <div class="row" *ngFor="let k of dateJSON | keyvalue" class="container-elemento">
    <article class="card fl-left">
      <section class="date">
        <time datetime="23th feb">
          <span>{{k.value[0].orario | date:'dd'}}</span><span>{{k.value[0].orario | date:'MMM'}}</span>
        </time>
      </section>
      <section class="card-cont">
        <h3>{{pellicola.titolo}}</h3>
        <div class="even-date">
         <i class="fa fa-calendar"></i>
         <time>
           <span>{{k.value[0].orario | date:'ccc - dd/MM/yyyy'}}</span><span *ngFor="let v of k.value">{{v.orario | date: 'HH:mm'}} </span>
           <p>phoenix cinema</p>
         </time>
        </div>
        <div class="even-info">
          <i class="fa fa-map-marker"></i>
          <p>
            il film comincerà 25 minuti dopo l'ora indicata sul biglietto.
          </p>
        </div>
        <a [routerLink]="['/acquisto']" [queryParams]="{id: k.value[0].id}">Acquista</a>
      </section>
    </article>
  </div>
  </section>
    </div>
  </div>
  


    <!-- <p>
      programmazione works!
    </p>
    <br>USERLIST [{{programmazioni.length}}] :
      <ul>
        
        <li *ngFor="let p of programmazioni"> {{p|json}}  --  <button>DELETE</button></li>
      </ul> -->

      
  `,
  styles: [`
    .container-back {
      width: 100%;
      display: flex;
      background: gray;
      height: 100%;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-start;
    }
    .locandina {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: flex-end;
      background-size: cover;
      justify-content: flex-start;
      /* background-image: url('https://play.teleporthq.io/static/svg/default-img.svg'); */
      background-position: center;
    }
    .titolo {
      margin-left: 20px;
      margin-bottom: 20px;
      font-size: 30px;
      color:white;
    }
    .container-body {
      flex: 0 0 auto;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .container-right {
      flex: 0 0 auto;
      width: 50%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }
    .container-left {
      flex: 0 0 auto;
      width: 50%;
      height: 100%;
      display: flex;
      align-self: flex-start;
      align-items: center;
      flex-direction: column;
    }
    .title-text {
      align-self: flex-start;
      margin-top: 20px;
      margin-left: 20px;
    }
    .container-video {
      position: relative;
      width: 90%;
      padding-top: 40%; 
    }
    .video {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border:none;
    }
    .paragraph-text {
      align-self: flex-start;
      margin-top: 10px;
      margin-left: 30px;
    }
    .button-list {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      padding-top: 10px;
      padding-bottom: 10px;
      justify-content: flex-start;
    }
    .button {
      margin-left: 10px;
      margin-right: 10px;
      padding: 4px 8px;
      font-size: 16px;
    }
    @import url('https://fonts.googleapis.com/css?family=Oswald');
* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box
}

body {
    background-color: #dadde6;
    font-family: arial
}

.fl-left {
    float: left
}

.fl-right {
    float: right
}

h1 {
    text-transform: uppercase;
    font-weight: 900;
    border-left: 10px solid #fec500;
    padding-left: 10px;
    margin-bottom: 30px
}

.row {
    overflow: hidden
}

.card {
    display: table-row;
    width: 100%;
    background-color: #fff;
    color: #989898;
    margin-bottom: 10px;
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
    border-radius: 4px;
    position: relative
}

.card+.card {
    margin-left: 2%
}

.date {
    display: table-cell;
    width: 25%;
    position: relative;
    text-align: center;
    border-right: 2px dashed #dadde6
}

.date:before,
.date:after {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    background-color: #DADDE6;
    position: absolute;
    top: -15px;
    right: -15px;
    z-index: 1;
    border-radius: 50%
}

.date:after {
    top: auto;
    bottom: -15px
}

.date time {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
}

.date time span {
    display: block
}

.date time span:first-child {
    color: #2b2b2b;
    font-weight: 600;
    font-size: 250%
}

.date time span:last-child {
    text-transform: uppercase;
    font-weight: 600;
    margin-top: -10px
}

.card-cont {
    display: table-cell;
    width: 75%;
    font-size: 85%;
    padding: 10px 10px 30px 50px
}

.card-cont h3 {
    color: #3C3C3C;
    font-size: 130%
}

.row:last-child .card:last-of-type .card-cont h3 {
    text-decoration: line-through
}

.card-cont>div {
    display: table-row
}

.card-cont .even-date i,
.card-cont .even-info i,
.card-cont .even-date time,
.card-cont .even-info p {
    display: table-cell
}

.card-cont .even-date i,
.card-cont .even-info i {
    padding: 5% 5% 0 0
}

.card-cont .even-info p {
    padding: 30px 50px 0 0
}

.card-cont .even-date time span {
    display: flex;
    flex: 0 0 auto;
}

.card-cont a {
    display: block;
    text-decoration: none;
    width: 80px;
    height: 30px;
    background-color: #D8DDE0;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 2px;
    position: absolute;
    right: 10px;
    bottom: 10px
}

.row:last-child .card:first-child .card-cont a {
    background-color: #037FDD
}

.row:last-child .card:last-child .card-cont a {
    background-color: #F8504C
}

@media screen and (max-width: 860px) {
    .card {
        display: block;
        float: none;
        width: 100%;
        margin-bottom: 10px
    }
    .card+.card {
        margin-left: 0
    }
    .card-cont .even-date,
    .card-cont .even-info {
        font-size: 75%
    }
}
/* Stili globali */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: arial;
}

/* Stili per il popup */
.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.popup-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 80%;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

  `,
  ]
})
export class ProgrammazioneComponent {
  public programmazioni: Programmazione[] = [];
  pellicola: Pellicola|null = null;
  id: number = -1;
  dateJSON: { [key: string]: Programmazione[] } = {};
  trailerUrl:SafeResourceUrl="";

  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (this.route.snapshot.paramMap.get('id')){
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
    this.getAll();
    this.getPellicola();
      
  }
  getPellicola(){
    this.http.get<Pellicola>(Util.pellicoleServerUrl+"/"+this.id).subscribe(result=>{
      this.pellicola = result;
      this.trailerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(result.trailer)
    })
  }
  getAll(){
    this.http.get<Programmazione[]>(Util.programmazioniServerUrl+"/"+this.id).subscribe(result=>{
      this.programmazioni=result;
      console.log(result);
      this.splitDay();
    })
  }

  addToCart(p:Programmazione){
    
    console.log(AuthService.getToken("id"))
    if(AuthService.getToken("id")){
      var userId:number = Number(AuthService.getToken("id"))
      
      var elementoCarrello:ElementoCarrello = new ElementoCarrello(p,1,p.prezzo);
    
      var authBody:AuthBody=new AuthBody(userId,elementoCarrello);
      
      this.http.post(Util.carrelloServerUrl+"/add",authBody).subscribe(result =>{
      
      console.log(result)
    })
    }
  }

  splitDay(){
    this.programmazioni.forEach(element => {
      var date = new Date(element.orario);
      var index = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
      // "[LUN] 20/01/1999"
      if(!this.dateJSON[index]){
        this.dateJSON[index] = []
      }
      this.dateJSON[index].push(element)
  
    });
    console.log(this.dateJSON);
  }
}
