import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Biglietto } from '../model/biglietto';
import { Ordine } from '../model/ordine';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../model/authbody';
import { Util } from '../services/util';

@Component({
  selector: 'app-ordine',
  template: `
  <div class="container">
      <div class="container-title">
      
        <h1>ORDINI</h1>
        
      </div>
      <div *ngFor="let o of ordini" class="container-ordine">
        <p class="text-order">ORDINE #{{o.id}} : {{o.data | date:'[ccc] dd/MM/yyyy HH:mm'}}</p>
        <div *ngFor="let b of o.biglietti" class="container-biglietto">
          <div class="container-dettagli">
            
            <p class="text-title">{{b.programmazione.pellicola.titolo}}</p>
            <div class="container-info">
                <p class="text-info">{{b.programmazione.orario | date:'[ccc] dd/MM/yyyy HH:mm'}}</p>
              
                <p class="text-info">POSTO : {{b.posto}}</p>
            </div>
          </div>
        </div>
      </div>
  `,
  styles: [
    `
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
      margin-bottom: 10px;
      display: flex;
      align-self: center;
      align-items: flex-start;
      justify-content: center;
    }
    
    .container-ordine {
      flex: 0 0 auto;
      width: 100%;
      display: flex;
      align-items: center;
      border-width: 2px;
      border-style: dotted;
      flex-direction: column;
      justify-content: flex-start;
    }
    .container-biglietto {
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
    
    .text-order {
      width: 100%;
      height: auto;
      font-size: 25px;
      align-self: flex-start;
      padding-top: 10px;
      padding-left: 10px;
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
export class OrdineComponent {
  constructor(private http: HttpClient,private route: ActivatedRoute){}

  ordini: Ordine[] = [];
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
    this.http.post<Ordine[]>(Util.ordiniServerUrl,authbody).subscribe(result=>{
      console.log(result);
      this.ordini = result;
    })

  }
}
