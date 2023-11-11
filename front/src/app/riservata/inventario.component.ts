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
              <td></td>
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
  @ViewChild("dialogoArrivo") dialogoArrivo: ElementRef | undefined;
  errorPopup_text: string = '';
  fornituraSel: number[]=[]
  errorPopup : HTMLElement|null=null;
  messageError = "";
  checkEliminaFornitura : boolean = false;
  editing: boolean = false
  dataArrivo: string | null = null; 
  forniture : Fornitura[] = [];
  selectedForniture: any = {};
  inventario: Inventario[] = []

  constructor(private http: HttpClient){
  }

  ngOnInit(): void {
    this.getForniture()
    this.getMerce()   
  }
  
  errorPopup_animation(text:string,visible:boolean){
    
    if(this.errorPopup){
      if(visible){
        this.errorPopup.style.top="-30px"
      }
      else{
        this.errorPopup.style.top="0"
      }
      this.errorPopup_text=text;
    }
  }

  onCheckChangeFornitura(event:any){
    if(event.target.checked){
      this.fornituraSel.push(event.target.value)
    }
    else{
      this.fornituraSel = this.fornituraSel.filter(m=>m !== event.target.value)
    }
    this.messageError="";
    this.checkEliminaFornitura=false;
  }

  inviaDataArrivo(id: number) {
      this.selectedForniture = this.forniture.find((f)=>f.id == id);
      this.http.post(Util.fornitureServerUrl + '/setDataArrivo', this.selectedForniture).subscribe((response) => { 
      });
      window.location.reload()
  }
  
  getForniture() {
    this.http.get<Fornitura[]>(Util.fornitureServerUrl).subscribe(result=>{
      this.forniture=result;
      console.log(this.forniture)
    })
  }
  toggleSelection(fornitura: Fornitura) {
    const index = this.selectedForniture.indexOf(fornitura);

    if (index === -1) {
      this.selectedForniture.push(fornitura); // If not already selected, add to the array
    } else {
      this.selectedForniture.splice(index, 1); // If already selected, remove from the array
    }
  }

  isFornituraSelected(fornitura: Fornitura): boolean {
    console.log(this.selectedForniture)
    return this.selectedForniture.includes(fornitura);
  }  
  getMerce() {
    this.http.get<Inventario[]>('http://localhost:8091/api/inventario').subscribe(result=>{
      this.inventario=result;
      console.log(this.inventario)
    })
  }
  
}


