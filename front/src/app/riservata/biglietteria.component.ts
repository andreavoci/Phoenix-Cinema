import { Component } from "@angular/core";
import { Fornitura } from "../model/fornitura";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Fattura } from "../model/fattura";
import { Fornitore } from "../model/fornitore";
import { Merce } from "../model/merce";
import { Pellicola } from "../model/pellicola";
import { Util } from "../services/util";
import { Programmazione } from "../model/programmazione";

@Component({
    selector: 'app-biglietteria',
    template:`
    <div class="container">
      <div *ngIf="type==null" class="div-scelta">
        <button class="item-button" [routerLink]="['programmazione']">
            <span class="material-icons" >confirmation_number</span>            
            <p style="color:black;font-weight:bold;font-size:20px;">BIGLIETTO</p>
        </button>
        
        <button class="item-button" [routerLink]="['vendita']">
            <span class="material-icons" >storefront</span>
            <p style="color:black;font-weight:bold;font-size:20px;">CONSUMAZIONE</p>
        </button>
      </div>
      <app-res-biglietteria-programmazione *ngIf="type=='programmazione'"></app-res-biglietteria-programmazione>
    
      <app-res-biglietteria-vendita *ngIf="type=='vendita'"></app-res-biglietteria-vendita>
    
    </div>  
    `,
    styleUrls: ["./riservata.css"],
    styles: [`

        .div-scelta{
            width:100%;
            height:100%;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
        }
        .item-button{
            margin:10px;
            height:200px;
            width:200px;
            background:white;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
        }

        .item-button>span{
            margin:10px;
            color:orange;
            width:100%;
            font-size:100px;
        }
        
        .item-button:hover{
            background:lightgrey;
        }
        /* programmaizone fine */
    `]
})

export class ResBiglietteriaComponent{

    type : String|null= null;
    //-1:all  |  0:bho
    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
    
    ngOnInit(): void {
      if (this.route.snapshot.paramMap.get('tipoBiglietteria')){
        this.type = this.route.snapshot.paramMap.get('tipoBiglietteria');
      }
      console.log(this.type)
    }
}