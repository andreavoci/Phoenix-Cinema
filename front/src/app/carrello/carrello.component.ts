import { Component } from '@angular/core';
import { Carrello } from '../model/carrello';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { AuthBody } from '../model/authbody';
import { NONE_TYPE } from '@angular/compiler';
import { AuthService } from '../services/auth.service';
import { ElementoCarrello } from '../model/elementocarrello';

@Component({
  selector: 'app-carrello',
  template: `
    <div class="container">
      <div class="container-title">
      
        <button type="button" class="button-left" (click)="removeAll()">
          ELIMINA TUTTO
        </button>
        
        <h1>CARRELLO</h1>
        
        <button type="button" class="button-right" (click)="checkout()">
          CHECKOUT
        </button>
      </div>
      <div *ngFor="let e of elementi" class="container-elemento">
        <div class="container-dettagli">
          <p class="text-title">????????????????</p>
          <div class="container-info">
              <p class="text-info">[???] ??/??/???? - ??:??</p>
            
              <p class="text-info">POSTO : ???</p>
          </div>
        </div>
        <div class="container-button">
          <button type="button" class="button-right" (click)="remove(e)">
            RIMUOVI
          </button>
        </div>
      </div>


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
  `,
  styles: [`
  
    .container {
      width: 100%;
      background: gray;
      height: 100%;
      min-height: calc(100vh - 80px);
      display: flex;
      overflow: auto;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }
    .container-title {
      flex: 0 0 auto;
      width: 100%;
      height: auto;
      margin-top: 25px;
      display: flex;
      align-self: center;
      align-items: flex-start;
      justify-content: space-between;
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
    .button-right {
      align-self: flex-end;
      margin-top: 5px;
      margin-right: 40px;
      margin-bottom: 10px;
      padding: 5px 8px;
    }
    .button-left {
      align-self: flex-end;
      margin-top: 5px;
      margin-left: 40px;
      margin-bottom: 10px;
      padding: 5px 8px;
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

}
