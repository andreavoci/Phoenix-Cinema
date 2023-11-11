import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Fornitura } from '../model/fornitura';
import { Inventario } from '../model/inventario';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';

@Component({
  selector: 'app-res-inventario',
  template: `
  <div class="container">
    <p class="titolo">VISUALIZZAZIONE INVENTARIO</p>
    <dialog #popupInventario id="popupInventario">
      
      <div class="background-blur">
        <div class="component-popup" style="width:auto;">
          <p id="error-popup">{{errorPopup_text}}</p>
          <div class="navbar-popup">
            <p class="title-popup">Modifica Quantità</p>
            <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="popupInventario.close();" >
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
            </button>
            
          </div>
          <div>      
            <form #quantitaForm="ngForm" (ngSubmit)="updateQuantita(quantitaForm.value)">
                      
              <p>Stock</p>
              <p>{{inventarioSelezionato?.quantitaInStock}}</p>
              <p>Esposta</p>
              <input name="esposta" ngModel (click)="errorPopup_animation('',false)">
                      
              <div class="footer-popup">
                <button type="submit" class="item-button" style="margin:5px;background:green;width:30px;height:30px;">
                    <span class="material-icons" style="font-size:25px;color:white;width:100%;">arrow_forward</span>
                </button>
              </div>         
            </form>
          </div>
        </div>
      </div> 
    </dialog>    



    <div class="container-buttons">
      <button class="item-button" style="background:blue" (click)="modificaInventario();">
        <span class="material-icons" style="font-size:30px;color:white;width:100%;">edit</span>
      </button>
      <p class="button-item">{{messageErrorInventario}}</p>
    </div>
        <div class="table-div">
          <table>
            <tr class="title">
              <th></th>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Prezzo</th>
              <th>Stock</th>
              <th>Esposta</th>
              <th>Totale</th>
            </tr>
            <tr class="row" *ngFor="let i of inventario">
              <td><input type="checkbox" [value]=i.id (change)="onCheckChange($event)" style="width:20px;height:20px"></td>
              <td>{{i.id}}</td>
              <td>{{i.nome}}</td>
              <td>{{i.tipo}}</td>
              <td>{{i.prezzo}}</td>
              <td>{{i.quantitaInStock}}</td>
              <td>{{i.quantitaEsposta}}</td>
              <td>{{i.quantitaTot}}</td>
            </tr>
          </table>
      </div>
  </div>
  
  `,
  styleUrls: ["./riservata.css"],
  styles: [``]
})
export class ResInventarioComponent {
  errorPopup_text: string = '';
  inventarioSel: number[]=[]
  errorPopup : HTMLElement|null=null;
  messageErrorInventario = "";
  editing: boolean = false
  dataArrivo: string | null = null; 
  inventario: Inventario[] = []
  inventarioSelezionato : Inventario|null=null;


  constructor(private http: HttpClient){
  }

  ngAfterViewInit() {
    this.errorPopup = document.getElementById("error-popup")
  }
  
  ngOnInit(): void {
    this.getMerce()   
  }
  
  errorPopup_animation(text:string,visible:boolean){
    
    console.log("dasdd")
    if(this.errorPopup){
      console.log("cioa")
      if(visible){
        this.errorPopup.style.top="-30px"
      }
      else{
        this.errorPopup.style.top="0"
      }
      this.errorPopup_text=text;
    }
  }

  
  getMerce() {
    this.http.get<Inventario[]>('http://localhost:8091/api/inventario').subscribe(result=>{
      this.inventario=result;
      console.log(this.inventario)
    })
  }
  modificaInventario(){
    if(this.inventarioSel.length==0){
      this.editing=false
      this.messageErrorInventario = "Errore! Seleziona prima l'inventario da modificare"
    }
    else if(this.inventarioSel.length>1) {
      this.editing=false
      this.messageErrorInventario = "Errore! Seleziona un solo inventario da modificare"
    }
    else{
      this.editing=true
      this.inventarioSelezionato = this.inventario.find((i) => i.id == this.inventarioSel[0]) as Inventario|null;
      
      let myDialog:any = <any>document.getElementById("popupInventario");
      myDialog.showModal();
    }
  }
  updateQuantita(form:any){
    console.log(form)
    const esposta = form["esposta"]
    if(this.inventarioSelezionato){
      if(esposta>this.inventarioSelezionato.quantitaInStock){
        console.log("ciao")
        this.errorPopup_animation("la quantità esposta non può essere maggiore dello stock",true);
      }
      else{
        window.location.reload()
      }
    }
  }
  onCheckChange(event:any){
    if(event.target.checked){
      this.inventarioSel.push(event.target.value)
    }
    else{
      this.inventarioSel = this.inventarioSel.filter(i=>i !== event.target.value)
    }
    this.messageErrorInventario="";
  }
}


