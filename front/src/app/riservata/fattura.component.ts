import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Fornitore } from "../model/fornitore";
import { TipoFornitore, Util } from "../services/util";
import { Fattura } from "../model/fattura";

@Component({
  selector: 'app-res-fattura',
  template: `
  <div class="container">
      <p class="titolo">VISUALIZZAZIONE FATTURE</p>
       <!-- Dialogo per l'aggiunta di un fornitore -->
      

    <div class="table-div">
      <table>
        <tr class="title">
          <th>ID</th>
          <th>Importo</th>
          <th>Emissione</th>
          <th>Pagamento</th>
        </tr>
        <tr class="row" *ngFor="let fattura of fatture">
          <td>{{fattura.id}}</td>
          <td>{{fattura.importo}}€</td>
          <td>{{fattura.emissione | date}}</td>
          <td>
            <div *ngIf="!fattura.pagamento; else pagato" style="width:100%;justify-content:center;align-items:center;display:flex;">
                <button class="item-button" style="background:green;width:20px;height:20px;" (click)="PagaFattura(fattura.id);">
                    <span class="material-icons" style="font-size:10px;color:white;width:100%;">attach_money</span>
                </button>
            </div>
            <ng-template #pagato>{{fattura.pagamento | date }}</ng-template>
          </td>
        </tr>
      </table>
    </div> 
  </div>

`,
  styleUrls: ["./riservata.css"],
  styles: [``]
})

export class ResFatturaComponent {
    fatture: Fattura[] = [];
    
    constructor(private http: HttpClient, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }


    ngOnInit(): void {
    this.getFatture()
    }

    getFatture() {
    this.http.get<Fattura[]>(Util.fatturaServerUrl).subscribe(result => {
        this.fatture = result;
    });
    }
    PagaFattura(id:number){
        
        this.http.post<HttpResponse<String>>(Util.fatturaServerUrl+"/update",id).subscribe(
            success => {
                window.location.reload()
            },
            error => {
                window.location.reload()
            }
        )
    }
}
