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
import { SharedService } from '../services/shared.service';

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
<h1 class="prog-title">Programmazione:</h1>
  <div class="row" *ngFor="let k of dateJSON | keyvalue" >
    
      <div class="date">
        <p>{{k.value[0].orario | date:'ccc'}}</p>
        <p>{{k.value[0].orario | date:'dd'}}</p>
        <p>{{k.value[0].orario | date:'MMM'}}</p>
      </div> 
      <section class="content">
         <p>phoenix cinema</p>
          <p>il film comincerà 25 minuti dopo l'ora indicata sul biglietto.</p>
        <button *ngFor="let v of k.value" [routerLink]="['/acquisto/'+v.id]" >{{v.orario | date: 'HH:mm'}}</button>
      </section>
  </div>
  </section>
    </div>
  </div>
  

      
  `,
  styles: [`
    .container-back {
      width: 100%;
      display: flex;
      background: rgb(250,108,20);
      background: radial-gradient(circle, rgba(250,108,20,1) 0%, rgba(90,30,4,1) 100%);
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
      padding:0px 10px 0px 0px;
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


    .prog-title {
        text-transform: uppercase;
        font-weight: 900;
        border-left: 10px solid #fec500;
        padding-left: 10px;
        margin-bottom: 30px
    }
    
.row {
    float: left;
    display: table-row;
    width: 100%;
    height:auto;
    background-color: #fff;
    color: #989898;
    margin-bottom: 10px;
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
export class ProgrammazioneComponent {
  public programmazioni: Programmazione[] = [];
  pellicola: Pellicola|null = null;
  id: number = -1;
  dateJSON: { [key: string]: Programmazione[] } = {};
  trailerUrl:SafeResourceUrl="";

  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer,private sharedService: SharedService) {}

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
