import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';

@Component({
  selector: 'app-riservata',
  template: `
    <div class="container">
    <div *ngIf="type==0 ;then prova0"></div>
    <div *ngIf="type==-1 ;then nochoice"></div>
    

    <ng-template #prova0>
      <form #newprogform="ngForm" (ngSubmit)="newProgrammazione(newprogform.value)">
        <input type="text" name="prezzo" ngModel placeholder="prezzo"><br><br>
        <input type="text" name="sala" ngModel placeholder="sala"><br><br>
        <button type="submit">Crea programmazione</button>
      </form>
    </ng-template>



      <br>
      <button type="button" class="button" routerLink="/riservata">BACK</button>
      <br>
      
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

    </div>
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
  //-1:all  |  0:bho
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (this.route.snapshot.paramMap.get('type')){
      this.type = Number(this.route.snapshot.paramMap.get('type'));
    }
    console.log(this.type)  
  }

  //prova 0

  newProgrammazione(form: any){
    this.http.post<void>(Util.programmazioniServerUrl,form).subscribe(result=>{
      
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
