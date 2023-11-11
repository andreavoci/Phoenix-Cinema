import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Biglietto } from '../model/biglietto';
import { Ordine } from '../model/ordine';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../model/authbody';
import { Util } from '../services/util';
import { Programmazione } from '../model/programmazione';
import { Reso } from '../model/reso';

@Component({
  selector: 'app-ordine',
  template: `
  <div class="container">
      <div class="container-title">
      
        <h1>ORDINI</h1>
        
      </div>
  
   <div class="row" *ngFor="let o of ordini">
    <div class="ordine" *ngIf="!getResoOrdine(o.id)">
     <div class="date">
       <p>{{o.biglietti[0].programmazione.orario | date:'ccc'}}</p>
       <p>{{o.biglietti[0].programmazione.orario | date:'dd'}}</p>
       <p>{{o.biglietti[0].programmazione.orario | date:'MMM'}}</p>
     </div> 
     <section class="content" >
        <p>phoenix cinema</p>
         <p>{{o.biglietti[0].programmazione.pellicola.titolo}}</p>
         <p>{{getPosti(o)}}</p>
     </section>
     <section class="content-annulla" >
      <button (click)="annullaOrdine(o)" *ngIf="confrontaDate(o.biglietti[0].programmazione.orario)">Rimborso</button>
     </section>
    </div>
 </div>
  `,
  styles: [
    `
    .container {
         width: 100%;
         background: rgb(250,108,20);
         background: radial-gradient(circle, rgba(250,108,20,1) 0%, rgba(90,30,4,1) 100%);
         height: 100%;
         min-height: calc(100vh - 80px);
         display: flex;
         overflow: auto;
         align-items: center;
         flex-direction: column;
         justify-content: flex-start;
       }
       .header {
         background: #000000;
         color: white;
         padding: 10px;
         text-align: left;
         width: 100%;
         margin-bottom: 20px;
         justify-content: space-between;
         text-align: center; /* Sposta a destra */
       }
       .user-info {
         display: flex;
         flex-direction: column;
       }
       .info {
         margin-bottom: 10px;
       }
       .button {
         background-color: white;
         color: black;
         border: none;
         padding: 5px 10px;
         cursor: pointer;
         border-radius: 5px;
         font-size: 16px;
         margin: 10px 0;
         display: inline-block;
         transition: background-color 0.2s;
         text-align: center;
         margin-bottom: 20px;
       }
       .show-history-button {
         background-color: white;
         color: black;
         width: 15%;
         display: flex;
         justify-content: space-between;
         transition: background-color 0.2s;
         text-align: center;
         margin-bottom: 20px;
       }
       .table {
         width: 80%;
         border-collapse: collapse;
         border: 1px solid #ddd;
         background-color: white;
         margin-top: 20px;
       }
       .table th, .table td {
         border: 1px solid #ddd;
         padding: 8px;
         text-align: left;
       }
       .error-message {
         color: red;
       }
       button {
    
       margin-left: 5px;
       margin-right: 5px;
       padding: 4px 8px;
       font-size: 16px;
       font-weight:bold;
       background:rgba(250,108,20,1);
       border: solid 2px black;
       border-radius:5px;
     }
     button:hover {
       cursor:pointer;
       background:orange;
     }
     .prog-title {
         text-transform: uppercase;
         font-weight: 900;
         border-left: 10px solid #fec500;
         padding-left: 10px;
         margin-bottom: 30px
     }
  
 .row {
   display: table;
   justify-content: center; /* Center the tickets horizontally */
   width: 60%; /* Adjust the width to make them narrower */
   margin: 10px auto; /* Center the tickets vertically and add margin */
   background-color: #fff;
   color: #989898;
   font-family: 'Oswald', sans-serif;
   text-transform: uppercase;
   border-radius: 8px;
   position: relative;
  
 }
 .date {
   display: table-cell;
   width: 25%;
   height:auto;
   position: relative;
   text-align: center;
   vertical-align: middle;
   border-right: 2px dashed #dadde6;
   margin: 0 auto;
 }
 .date:before,
 .date:after {
     content: "";
     display: none;
     width: 30px;
     height: 30px;
     background-color: #DADDE6;
     position: absolute;
     top: -15px;
     right: -15px;
     z-index: 1;
     border-radius: 50%
 }
 .date p{
   margin: 7px 0;
 }
 .date p:first-child{
   text-transform: uppercase;
     font-weight: 600;
     font-size: 120%;
 }
 .date p:nth-child(2) {
     color: #2b2b2b;
     font-weight: 600;
     font-size: 250%;
     margin-top: -10px
 }
 .date p:last-child{
   text-transform: uppercase;
     font-weight: 600;
     margin-top: -10px
 }
 .content {
     display: table-cell;
     width: 75%;
     font-size: 85%;
     padding: 15px 30px;
 }
 .content-annulla {
     display: table-cell;
     padding:0px 10px;
     height:100%;
     vertical-align:middle;
 }
 .content p {
     font-size: 90%;
     padding: 5px 0px 10px 0px;
 }
     
    `,
  ]
})
export class OrdineComponent {
  constructor(private http: HttpClient,private route: ActivatedRoute){}

  resi: Reso[] = [];
  ordini: Ordine[] = [];
  id:number = -1;

  ngOnInit(): void {
    // Recupera il parametro 'id' dall'URL
    if (AuthService.getToken('id')){
      this.id = Number(AuthService.getToken('id'));
    }    
    this.getOrdini(); 
    this.getResi();
  }

  getOrdini():void{
    var authbody:AuthBody = new AuthBody(this.id,"empty");
    console.log(authbody);
    this.http.post<Ordine[]>(Util.ordiniServerUrl,authbody).subscribe(result=>{
      console.log(result);
      this.ordini = result;
    })

  }

  getResi(){
    this.http.get<Reso[]>(Util.resiServerUrl).subscribe(result=>{
      this.resi=result;
    })
  }

  getResoOrdine(id:number): boolean{
    var trovato: boolean = false;
      this.resi.forEach(r => {
        if(r.ordine.id == id){
          trovato=true;
      }
    });
    return trovato;
  }

  getPosti(o:Ordine): string{
       var lun:number = o.biglietti.length;
       var posto:string = "";
       for(let index = 0; index<lun; index++){
       var programmazione:Programmazione = o.biglietti[index].programmazione;
       for(const p of programmazione.posti){
         if(p.id === o.biglietti[index].posto){
           posto += p.numero+" ";
         }
       }
     }
       return posto;
     }

  annullaOrdine(o:Ordine){
    var form:any = {
      'ordine' : o,
      'data' : new Date(),
      'stato' : "RICHIESTO"
    }
    this.http.post<Reso>(Util.resiServerUrl+'/create',form).subscribe(result=>{
      console.log(result)
    })
  }

  confrontaDate(data: Date): boolean{
    const programm = new Date(data);
    const today = new Date();
    return programm > today;
  }
}
