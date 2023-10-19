import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Sala } from '../model/sala';
import { Pellicola } from '../model/pellicola';
import { Programmazione } from '../model/programmazione';

@Component({
  selector: 'app-riservata',
  template: `
    <div class="container">
      <br><br><br>
      
      <br>
      <button type="button" class="button" routerLink="/riservata">BACK</button>
      <br>
      <div *ngIf="type==0 ;then prova0"></div>
      <div *ngIf="type==-1 ;then nochoice"></div>
    </div>
    <ng-template #prova0>
      
      <form #newprogform="ngForm" (ngSubmit)="newProgrammazione(newprogform.value)">
        
        <select name="pellicola" ngModel>
          <option value="" disabled>Scegli una pellicola</option>
          <option *ngFor="let p of pellicole" [ngValue]="p">{{p.titolo}}</option>
        </select><br><br>
        <select name="sala" ngModel>
          <option value="" disabled>Scegli una sala</option>
          <option *ngFor="let s of sale" [ngValue]="s">{{s.nome}}</option>
        </select><br><br>
        
        <input type="text" name="prezzo" ngModel placeholder="prezzo"><br><br>

        <input type="datetime-local" name="orario" ngModel><br><br>
        <button type="submit">Crea programmazione</button>
      </form>
      
    </ng-template>



      
    <ng-template #nochoice>
      <button type="button" class="button" routerLink="/riservata/0" (click)="res(0)">Prova 0</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/1" (click)="res(1)">Prova 1</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/2" (click)="res(2)">Prova 2</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/3" (click)="res(3)">Prova 3</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/4" (click)="res(4)">Prova 4</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/5" (click)="res(5)">Prova 5</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/6" (click)="res(6)">Prova 6</button>
      <br>
      <button type="button" class="button" routerLink="/riservata/7" (click)="res(7)">Prova 7</button>
      <br>   
    </ng-template>
  `,
  styles: [ `
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

  `,
  ]
})

export class RiservataComponent {
  type: number = -1;
  prova =[0,1,2,3,4,5];
  sale: Sala[] = [];
  pellicole: Pellicola[] = [];
  //-1:all  |  0:bho
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (this.route.snapshot.paramMap.get('type')){
      this.type = Number(this.route.snapshot.paramMap.get('type'));
      if(this.type==0){
        this.getPellicole()
        this.getSale()
        console.log()
      }
    }
    console.log(this.type)  
  }

  getPellicole(){
    this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result=>{
      this.pellicole = result;
    })
  }
  getSale(){
    this.http.get<Sala[]>(Util.saleServerUrl).subscribe(result=>{
      this.sale = result;
    })
  }
  //prova 0

  newProgrammazione(form: any){
    console.log(form)
    this.http.post<HttpResponse<Programmazione>>(Util.programmazioniServerUrl+"/create",form).subscribe(result=>{
      console.log(result);
      
    })
  }
  
    // id:number;
    // pellicola:Pellicola;
    // sala:Sala;
    // posti:Array<Posto>;
    // prezzo:number;
    // orario:Date;


  //fine prova 0

  res(o:number){
      
  }
  
}
