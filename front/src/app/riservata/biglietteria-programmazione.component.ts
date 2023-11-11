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
    selector: 'app-res-biglietteria-programmazione',
    template:`
        <div class="container">
            <div class="divider-container">
            <div style="" class="divider">
                <select id="select-giorno" name="data" ngModel (change)="selezionaGiorno($event)">
                    <option value="" disabled>scegli una data</option>
                    <option *ngFor="let element of dateJSON | keyvalue" [value]="element.key">{{element.key}}</option>
                </select>
                <div class="container-film">
                    <div *ngFor="let p of pellicoleInProgrammazione">
                        <a (click)="selezionaPellicola(p.id)">
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
            <div style="background:rgba(255,255,255,0.6);" class="divider">
            <div *ngIf="selPellicola!=-1" class="button-list">
                    <button *ngFor="let p of orariProgrammazione" (click)="selezionaOrario(p)" id="{{p.id}}" class="button-orario">{{p.orario | date: 'HH:mm'}}</button>
                </div>
                <div *ngIf="selPellicola!=-1" class="button-list">
                    <button id="normale" class="button-tipo-biglietto" style="background:rgba(250,108,20,1)" (click)="setTipoBiglietto('normale')">normale</button>
                    <button id="ridotto" class="button-tipo-biglietto" (click)="setTipoBiglietto('ridotto')">ridotto</button>
                </div>
                <div *ngIf="programmazioneSelezionata" class="posti">
                    <button class="posto"
                        *ngFor="let posto of programmazioneSelezionata.posti"
                        [class.selected]="postiAggiunti[posto.id]!=undefined"
                        [class.selectedRidotto]="postiAggiunti[posto.id]!=undefined && postiAggiunti[posto.id][1]=='ridotto'"
                        [class.busy]="posto.stato=='OCCUPATO'"
                        (click)="selezionaPosto(posto.id, posto.numero)"
                    >
                        <img class="img-posto" src="assets/image/sedia_acquisto.png">
                        <div class="numero_posto" >{{posto.numero}}</div>
                    </button>
                </div>
            </div>
            <div style="background:rgba(255,255,255,0.6);width:auto;" class="divider">
                <div *ngIf="programmazioneSelezionata && postiAggiunti && getKeys(postiAggiunti).length != 0" class="informazioni">
                    <div><p class="resoconto-posto" *ngFor="let p of postiAggiunti | keyvalue">{{p.value[0]}} :   {{ p.value[1]=='normale' ? programmazioneSelezionata.prezzo : calcolaRidotto(programmazioneSelezionata)}} €</p></div>
                    <div>
                        <p style="font-weight:bold;">Totale : {{totalCost}}€</p>
                        <button class="button-checkout" (click)="checkout()">checkout</button>
                    </div>
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

        #select-giorno{
            text-align:center;
            width:50%;
            margin:10px;
            font-size:18px;
            font-weight:bold;
            height:auto;
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
    .posto.selectedRidotto {
        filter: brightness(70%) sepia(1600%) hue-rotate(150deg) saturate(10);
    }
    .posto.busy {
      pointer-events: none;
      filter:brightness(30%) sepia(80%) hue-rotate(-50deg) saturate(10);
    }
    
    .informazioni{
      flex:1;
      width:auto;
      display: flex;
      flex-direction:column;
      justify-content: space-between;
      padding:20px 10px 20px 0px;
      height: 100% /* Regola l'altezza desiderata */
    }
    .resoconto-posto{
        padding:5px 20px;
        white-space: nowrap;
        border-bottom:1px solid;
        align-items:center;
        justify-content:center;
        text-align:center;

    }
    
    .button-list {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: flex-start;
    }
    .button-orario {
      
      margin-left: 5px;
      margin-right: 5px;
      padding: 4px 8px;
      font-size: 16px;
      font-weight:bold;
      background:rgba(250,108,20,1);
      border: solid 2px black;
      border-radius:5px;
    }
    .button-orario:hover {
      cursor:pointer;
      background:orange;
    }
    .button-clicked{
      cursor:pointer;
      background:orange;
    }
    .button-tipo-biglietto {
      
      margin-left: 5px;
      margin-right: 5px;
      padding: 4px 8px;
      font-size: 16px;
      font-weight:bold;
      background:gray;
      border: solid 2px black;
      border-radius:5px;
    }
    
    .button-checkout {
      cursor:pointer;
      margin-left: 5px;
      margin-right: 5px;
      padding: 4px 8px;
      font-size: 16px;
      font-weight:bold;
      background:rgb(0,255,0);
      border: solid 2px black;
      border-radius:5px;
    }
    .button-checkout:hover {
      background:green;
    }
        /* programmaizone fine */
    `]
})

export class ResBiglietteriaProgrammazioneComponent{

    pellicole:Pellicola[]=[]
    programmazioni:Programmazione[]=[]
    pellicoleInProgrammazione:Pellicola[]=[]

    selPellicola:number=-1;
    selGiorno:string="";
    dateJSON: { [key: string]: Programmazione[] } = {};
    orariProgrammazione:Programmazione[] =[]

    programmazioneSelezionata: Programmazione|null = null;
    posti: { numero: number, selezionato: boolean }[] = [];
    idProgrammazione: number = -1;
    postiAggiunti:{ [key: number]: String[] }={}
    totalCost = 0;
    tipoBiglietto="normale"


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

    selezionaPellicola(idPellicola:number){
        this.selPellicola = idPellicola
        this.programmazioneSelezionata=null;
        this.postiAggiunti={};
        const elements : Element[] = Array.from(document.getElementsByClassName("film-selection"))
        elements.forEach(e => {
            
            this.orariProgrammazione = this.dateJSON[this.selGiorno].filter(p=>p.pellicola.id==idPellicola)
            console.log(e.id)
            e.classList.remove("clicked")
            if(e.id==idPellicola.toString()){
                console.log("ciao")
                e.classList.add("clicked")
            }
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
            this.postiAggiunti[p_id]=[p_numero,this.tipoBiglietto];
            }
            this.totalCost=0;
            for(let k in this.postiAggiunti){
                if(this.postiAggiunti[k][1]=="normale"){
                    this.totalCost+=this.programmazioneSelezionata.prezzo;
                }
                else{
                    this.totalCost+=this.calcolaRidotto(this.programmazioneSelezionata);
                }
            }
            this.totalCost = Number(this.totalCost.toFixed(2))
        }
    }

    getKeys(obj:any) {
        return Object.keys(obj);
    };

    selezionaGiorno(event:Event){
        const sel = event.target as HTMLSelectElement
        this.pellicoleInProgrammazione=[]
        this.programmazioneSelezionata=null
        this.orariProgrammazione = []
        this.postiAggiunti={}
        if(sel){
            console.log(sel.value)
            this.selGiorno=sel.value
            this.dateJSON[sel.value].forEach(programmazione=>{
                if(!this.pellicoleInProgrammazione.find(p => p.id === programmazione.pellicola.id)){
                    console.log("pellicole lunghezza:"+this.pellicoleInProgrammazione.length)
                    console.log("pellicola.id:"+programmazione.pellicola.id)
                    this.pellicoleInProgrammazione.push(programmazione.pellicola)
                }
            })
            
        }
    }
    selezionaOrario(p:Programmazione){
        this.programmazioneSelezionata=p
        this.postiAggiunti={}
        const elements : Element[] = Array.from(document.getElementsByClassName("button-orario"))
        elements.forEach(e => {
            e.classList.remove("button-clicked")
            if(e.id==p.id.toString()){
                e.classList.add("button-clicked")
            }
        });
    }
    setTipoBiglietto(tipo:string){
        const elements : Element[] = Array.from(document.getElementsByClassName("button-tipo-biglietto"))
        elements.forEach(e => {
            if(e instanceof HTMLElement){
                e.style.background="gray"
                
                if(e.id == tipo){
                    this.tipoBiglietto = tipo
                    if(tipo=="normale"){e.style.background="rgba(250,108,20,1)"}
                    else{e.style.background = "cyan"}
                }
            }
            // if(e.id==p.id.toString()){
            //     e.classList.add("button-clicked")
            // }
        });
    }
    calcolaRidotto(programmazione:Programmazione){
        return Number((programmazione.prezzo*0.75).toFixed(2))
    }
    checkout(){
        
    }
}