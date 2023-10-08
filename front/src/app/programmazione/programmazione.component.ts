import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Programmazione } from '../model/programmazione';
import { Pellicola } from '../model/pellicola';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../model/authbody';
import { ElementoCarrello } from '../model/elementocarrello';

@Component({
  selector: 'app-programmazione',
  template: `
  <div class="container-back">
    <div class="locandina">
      <p class="titolo">FILM DAL BEL NOME</p>
    </div>
    <div class="container-body">
      <div class="container-left">
        <h2 class="title-text">TRAILER</h2>
        <video 
          src 
          poster="https://play.teleporthq.io/static/svg/videoposter.svg" 
          class="video">
        </video>
        <h2 class="title-text">TRAMA</h2>
        <p class="paragraph-text">la trama è molto complessa</p>
        <h2 class="title-text">REGISTA</h2>
        <p class="paragraph-text">il regista è famoso</p>
        <h2 class="title-text">ATTORI</h2>
        <p class="paragraph-text">Attori sono tanti e diversi</p>
      </div>
      <div class="container-right">
        <h2 class="title-text">LUN</h2>
        <div class="button-list">
          <button type="button" class="button">10:00</button>
          <button type="button" class="button">20:00</button>
          <button (click)="addToCart(programmazioni[0])">prova</button>
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
      background-image: url('https://play.teleporthq.io/static/svg/default-img.svg');
      background-position: center;
    }
    .titolo {
      margin-left: 20px;
      margin-bottom: 20px;
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
    .video {
      width: 80%;
      height: auto;
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
    }
  `,
  ]
})
export class ProgrammazioneComponent {
  public programmazioni: Programmazione[] = [];

  id: number = -1;

  constructor(private http: HttpClient,private route: ActivatedRoute){}

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
      
      console.log(result);
    })
  }
  getAll(){
    this.http.get<Programmazione[]>(Util.programmazioniServerUrl+"/"+this.id).subscribe(result=>{
      this.programmazioni=result;
      console.log(result);
    })
  }
  
  addToCart(p:Programmazione){
    
    console.log(AuthService.getToken("id"))
    if(AuthService.getToken("id")){
      var userId:number = Number(AuthService.getToken("id"))
      
      var elementoCarrello:ElementoCarrello = new ElementoCarrello(p,1,10);
    
      var authBody:AuthBody=new AuthBody(userId,elementoCarrello);
      
      this.http.post(Util.carrelloServerUrl+"/add",authBody).subscribe(result =>{
      
      console.log(result)
    })
    }
  }
}
