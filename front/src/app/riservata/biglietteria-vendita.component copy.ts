import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Inventario } from '../model/inventario';

@Component({
  selector: 'app-res-biglietteria-vendita',
  template: `
  <div class="container">
    
    <div class="full-container">
      <div class="l-container">
        <div style="padding:2% 5%;">
          <button *ngFor="let i of inventario" 
            [class.selected]="merceSelezionata[i.id]"
            class="btn-operazione" 
            (click)="selezionaMerce(i.id)"
          >
            {{i.nome.toUpperCase()}}
          </button>
        </div>
      </div>
      <div class="r-container">
        <!-- <div *ngFor="let sel of merceSel"> -->
        <div style="display:flex;flex-direction:row">
        <div class="table-div">
          <table>
            <tr class="title">
              <th>nome</th>
              <th>prezzo</th>
              <th>qt</th>
              <th></th>
              
            </tr>
            <tr class="row" *ngFor="let m of merceSelezionata | keyvalue">
              <td>{{getElemento(m.key,0)}}</td>
              <td>{{getElemento(m.key,1)}}</td>
              <td>{{getElemento(m.key,2)}}</td>
              <td >
                <div style="display:flex;flex-direction:row;width:100%;height:100%">
                  <button class="item-button" style="background:green;width:25px;height:25px;margin:1px;" (click)="modificaQuantita(m.key,1)">
                    <span class="material-icons" style="font-size:10px;color:white;width:100%;">add</span>
                  </button>
                  
                  <button class="item-button" style="background:red;width:25px;height:25px;margin:1px;" (click)="modificaQuantita(m.key,-1)">
                    <span class="material-icons" style="font-size:10px;color:white;width:100%;">remove</span>
                  </button>
                </div>
              </td>
            </tr>
          </table>
          <table>
            <tr class="title">
              <th> totale {{totale}} €</th>
              <th><button>checkout</button></th>
            </tr>
          </table>
      </div>
        </div>
      </div>

    </div>
  </div>
  
  `,
  styleUrls: ["./riservata.css"],
  styles: [`

    .full-container{
      width:100%;
      height:100%;
      display:flex;
      flex-direction:row;
    }

    .l-container{
      width:40%;
      height:100%;
      display:flex;
      flex-direction:row; 
      justify-content:center; 
    }
    
    .r-container{
      width:60%;
      height:100%;
      display:flex;
      flex-direction:row;
      padding:10px 0px;
    }

    .btn-operazione{
      cursor:pointer;
      justify-content:center;
      text-align:center;
      background: white;
      width:48%;
      height:10%;
      margin:1%;
      padding:1%;
      border-radius:8px;
      border:1px solid gray;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      font-size:15px;
      font-weight:bold;
      word-wrap: break-word;
    }
    
    .btn-operazione.selected {
      background: orange;
    }

    .btn-operazione:hover{
      background: lightgray
    }

  `]
})
export class ResBiglietteriaVenditaComponent {

  inventario: Inventario[] = []
  merceSel: Inventario[]=[];
  totale: number=0;
  merceSelezionata : Record<number,number>= {};

  constructor(private http: HttpClient){
  }
  ngOnInit(){
    this.getMerce();
  }
  getMerce() {
    this.http.get<Inventario[]>('http://localhost:8091/api/inventario').subscribe(result=>{
      this.inventario=result;
      console.log(this.inventario)
      this.inventario.sort((a, b) => a.nome.localeCompare(b.nome));
    })
  }
  selezionaMerce(m:number){
    console.log(m)
    this.totale=0;
    // Aggiungi il nuovo elemento solo se non esiste già uno con lo stesso nome
    if (this.merceSelezionata[m]== undefined) {
      this.merceSelezionata[m]=1;
    } 
    for (const id in this.merceSelezionata) {
      const elementoEsistente = this.inventario.find(e => e.id === Number(id));

      if (this.merceSelezionata.hasOwnProperty(id) && elementoEsistente) {
        this.totale+= elementoEsistente.prezzo* this.merceSelezionata[id];
      }
    }

    console.log(this.merceSelezionata)
  }
  getElemento(id:string,elemento:number){
    //0:nome //1:prezzo //2:quantità

    const elementoTrovato = this.inventario.find(e => e.id === Number(id));
    if(elemento==0)return elementoTrovato?.nome;
    else if(elemento==1)return elementoTrovato?.prezzo;
    else return this.merceSelezionata[Number(id)]
  }
  modificaQuantita(key:string,modifica:number){
    const id=Number(key)
    if(modifica<1 && (this.merceSelezionata[id]<=0 || this.merceSelezionata[id]==undefined)){
      return
    }
    else if(this.merceSelezionata[id]== undefined) {
      this.merceSelezionata[id]=1;
    } 
    else{
      this.merceSelezionata[id]+=modifica;
    }
    
    this.totale=0;

    for (const id in this.merceSelezionata) {
      if(this.merceSelezionata[id]==0){
        delete this.merceSelezionata[id];  
      }
      const elementoEsistente = this.inventario.find(e => e.id === Number(id));

      if (this.merceSelezionata.hasOwnProperty(id) && elementoEsistente) {
        this.totale+= elementoEsistente.prezzo* this.merceSelezionata[id];
      }
    }


  }
  
}