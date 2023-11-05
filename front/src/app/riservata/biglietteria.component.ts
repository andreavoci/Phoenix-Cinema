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
            <div class="divider-container">
            <div style="" class="divider">
                <select style="display:flex;text-align:center;width:70%;margin:10px 0px;" name="data" ngModel>
                    <option value="" disabled>scegli una data</option>
                    <option *ngFor="let element of dateJSON | keyvalue" [ngValue]="element">{{element.key}}</option>
                </select>
                <div class="container-film">
                    <div *ngFor="let p of pellicole">
                        <a (click)="selectPellicola(p.id)">
                            <img class="img-film" src="{{p.locandina}}">
                            <span id="{{p.id}}" class="film-selection">
                                <div class="center">
                                    <p>{{p.titolo}}
                                </div>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div style="background:rgba(255,255,255,0.7);width:auto" class="divider">
                <div *ngIf="programmazioneSelezionata" class="posti">
                </div>
                <div *ngIf="programmazioneSelezionata" class="posti">
                    <button class="posto"
                        *ngFor="let posto of programmazioneSelezionata.posti"
                        [class.selected]="postiAggiunti[posto.id]!=undefined"
                        [class.busy]="posto.stato=='OCCUPATO'"
                        (click)="selezionaPosto(posto.id, posto.numero)"
                    >
                        <img class="img-posto" src="assets/image/sedia_acquisto.png">
                        <div class="numero_posto" >{{posto.numero}}</div>
                    </button>
                </div>
            </div>
            <div style="background:rgba(255,255,255,0.7);width:auto" class="divider">
                <div *ngIf="postiAggiunti && getKeys(postiAggiunti).length != 0" class="informazioni">
                    <div *ngFor="let p of postiAggiunti | keyvalue">{{p.value}}</div>
                </div>
            </div>
            
            </div>
        </div>
    `,
    styleUrls: ["./riservata.css"],
    styles: [`

        .divider{
            display:flex;
            flex-direction:column;
            top:0;
            align-items: center;
            height:100%;
            width:100%;
        }

        .divider-container{
            display:flex;
            flex-direction:row;
            height:100%;
            width:100%;
        }

        

        /* film  */
        .container-film {
            flex-flow: row wrap;
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        a{
            cursor:pointer;
            flex: 0 0 calc(25% - 1em);
            margin: 5px 10px;
            position: relative;
            display: inline-block;
            max-width:150px;
            width:100%;
            height:100%;
        }
        .img-film {
            border: 0;
            border-radius:15px;
            width: 150px;
            object-fit: cover;
        }
        
        a:hover .film-selection {

            opacity: 1;
        }
        .film-selection {
            border-radius:15px;
            display: block;
            position: absolute;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(29,29,29,.7);
            -ms-transition: all .2s ease-out;
            -webkit-transition: all .2s ease-out;
            -moz-transition: all .2s ease-out;
            -o-transition: all .2s ease-out;
            transition: all .2s ease-out;
        }
        .center{
            width : 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align:center;
            justify-content: center;
        }
        a p{
            color:#FFFFFF;
            letter-spacing: 1px;
            font-size: 20px;
        }
        .clicked{
            border-radius:15px;
            display: block;
            position: absolute;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 1;
            background-color: rgba(63, 145, 232,.7);
        }
        /* film fine */
        /* programmazione */
        
    .img-posto{
      width:30px;
      height:30px;
    }
    .numero_posto{
      font-size:10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .posti {
      display: grid;
      grid-template-columns: repeat(10, minmax(35px, 40px));
      gap: 3px;
      border: none;
      background-color:rgba(255,255,255,0.);
      padding: 10px;
      flex-basis: calc(20% - 10px);
      margin:10px;
      
    }

    .posto {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: auto;
      width: auto;
      border: none;
      background:none;
      position: relative;
    }

    .posto:hover {
      filter:brightness(50%) sepia(100%) hue-rotate(-3deg) saturate(10);
    }

    .posto.selected {
      filter:brightness(50%) sepia(100%) hue-rotate(-3deg) saturate(10);
    }
    .posto.busy {
      pointer-events: none;
      filter:brightness(30%) sepia(80%) hue-rotate(-50deg) saturate(10);
    }
    
    .informazioni{
      flex:1;
      display: flex;
      flex-direction:column;
      align-items: center;
      padding:20px;
      height: 100% /* Regola l'altezza desiderata */
    }
        /* programmaizone fine */
    `]
})

export class ResBiglietteriaComponent{

    pellicole:Pellicola[]=[]
    programmazioni:Programmazione[]=[]
    selPellicola:number=-1;
    dateJSON: { [key: string]: Programmazione[] } = {};

    programmazioneSelezionata: Programmazione|null = null;
    posti: { numero: number, selezionato: boolean }[] = [];
    idProgrammazione: number = -1;
    postiAggiunti:{ [key: number]: String }={}
    totalCost = 0;


    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
    
    ngAfterViewInit() {
    }

    ngOnInit(): void {
      this.getPellicole()
      this.getProgrammazione();
    }
    
    
    getPellicole(){
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result=>{
        this.pellicole = result;
        })
    }
    getProgrammazione(){
        this.http.get<Programmazione[]>(Util.programmazioniServerUrl).subscribe(result=>{
            this.programmazioni = result;
            this.splitDay();
        })
    }

    selectPellicola(idPellicola:number){
        this.selPellicola = idPellicola
        const elements : Element[] = Array.from(document.getElementsByClassName("film-selection"))
        elements.forEach(e => {
            console.log(e.id)
            e.classList.remove("clicked")
            if(e.id==idPellicola.toString()){
                console.log("ciao")
                e.classList.add("clicked")
            }
            this.programmazioneSelezionata=this.programmazioni[0];
        });
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
  
  selezionaPosto(p_id: number,p_numero:String) {
    if(this.programmazioneSelezionata){
        if(p_id in this.postiAggiunti){
        delete this.postiAggiunti[p_id];
        }
        else{
        this.postiAggiunti[p_id]=p_numero;
        }
        this.totalCost=0;
        for(let k in this.postiAggiunti){
        this.totalCost+=this.programmazioneSelezionata.prezzo;
        }
    }
    }
    getKeys(obj:any) {
        return Object.keys(obj);
    };
}