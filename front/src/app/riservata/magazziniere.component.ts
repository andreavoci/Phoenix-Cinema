import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { RiservataComponent } from './riservata.component';
import { Util } from '../services/util';
import { Fornitura } from '../model/fornitura';
import { Merce } from '../model/merce';
@Component({
  selector: 'app-magazziniere',
  template: `
  <div class="container">
    <br><br><br>
    <p class="titolo">VISUALIZZAZIONE FORNITURE</p>
    <div class="table-div">
      <table>
        <tr class="title">
          <th></th>
          <th>Id</th>
          <th>Prezzo</th>
          <th>Quantità</th>
          <th>Scadenza</th>
          <th>Fornitore</th>
          <th>Stato</th>
          <th>Data Arrivo</th>
        </tr>
        <tr class="row" *ngFor="let fornitura of forniture" >
          <td>
            <div *ngIf="!fornitura.arrivo">
              <button class="item-button" style="background:green" (click)="inviaDataArrivo(fornitura.id);">
                <span class="material-icons" style="font-size:20px;color:white;width:20px;height:20px;">add</span>
              </button>
            </div>
          </td>
          <td>{{fornitura.id}}</td>
          <td>{{fornitura.prezzo | currency:'EUR'}}</td>
          <td>{{fornitura.quantita}}</td>
          <td>{{fornitura.scadenza | date: 'dd/MM/yyyy'}}</td>
          <td>{{fornitura.fornitore}}</td>
          <td>{{fornitura.stato}}</td>
          <td>{{fornitura.arrivo | date: 'dd/MM/yyyy'}}</td>
        </tr>
      </table>
    </div>

    <div class="table-div">
      <table>
        <tr class="title">
          <th></th>
          <th>Nome</th>
          <th>Tipo</th>
          <th>Prezzo</th>
          <th>Quantità</th>
        </tr>
        <tr class="row" *ngFor="let m of  merci">
          <td><input type="checkbox" [value]="m.id" (change)="onCheckChangeFornitura($event)" style="width:20px;height:20px"></td>
          <td>{{m.nome}}</td>
          <td>{{m.tipo}}</td>
          <td>{{m.prezzo}}</td>
          <td>{{m.quantita}}</td>
        </tr>
      </table>
    </div>
  </div>
  `,
  styleUrls: ["./riservata.css"],
  styles: [`
  
    .item-button {
      width:24px;
      height:20px;
      align-items:center;
    }
  `]
})
export class ResMagazziniereComponent {
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
  merci: Merce[] = []

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
      window.location.reload()
      this.http.post(Util.fornitureServerUrl + '/setDataArrivo', this.selectedForniture).subscribe((response) => {
        
    });
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
    this.http.get<Merce[]>('http://localhost:8091/api/merce').subscribe(result=>{
      this.merci=result;
      console.log(this.forniture)
    })
  }
  
}