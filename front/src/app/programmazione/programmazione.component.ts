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
      <div class="container-right">
        <div *ngFor="let k of dateJSON | keyvalue" class="container-elemento">
          <h2 class="title-text">{{k.value[0].orario | date:'ccc - dd/MM/yyyy'}}</h2>
          <div class="button-list">
            <button  *ngFor="let v of k.value" type="button" class="button" (click)="addToCart(v)">{{v.orario | date:'HH:mm'}}</button>
          </div>
        </div>
      </div>
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
