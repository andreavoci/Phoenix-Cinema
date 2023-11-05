import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Sala } from '../model/sala';
import { Pellicola } from '../model/pellicola';
import { Programmazione } from '../model/programmazione';
import { Fornitura } from '../model/fornitura';
import { Fornitore } from '../model/fornitore';
import { Merce } from '../model/merce';
import { NgForm } from '@angular/forms';
import { Fattura } from '../model/fattura';
import { Candidatura } from '../model/candidatura';
import { Dipendente } from '../model/dipendente';

@Component({
  selector: 'app-riservata',
  template: `
    <div class="container">
      <p *ngIf="type==null" id="msg404">NON VALIDO</p>

      <app-fornitura *ngIf="type=='fornitura'"></app-fornitura>
      <app-resfornitore *ngIf="type=='fornitore'"></app-resfornitore>
      <app-biglietteria *ngIf="type=='biglietteria'"></app-biglietteria>
      <app-magazziniere *ngIf="type=='magazziniere'"></app-magazziniere>
      <app-inventario *ngIf="type=='inventario'"></app-inventario>
      <app-respellicola *ngIf="type=='pellicola'"></app-respellicola>
      <app-proiezione *ngIf="type=='proiezione'"></app-proiezione>
      <app-hr *ngIf="type=='hr'"></app-hr>
    </div>    
  `,
  styleUrls: ["./riservata.css"],
  styles: [ `
    #msg404{
      display:flex;
      flex-direction:column;
      font-size:40px;
      color:white;
      height:100%;
      justify-content:center;
    }
  `,
  ]
})

export class RiservataComponent {
  type : String|null= null;
  //-1:all  |  0:bho
  constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
  
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('type')){
      this.type = this.route.snapshot.paramMap.get('type');
    }
    console.log(this.type)
  }
  
}
