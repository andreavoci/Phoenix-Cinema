import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Fornitore } from "../model/fornitore";
import { TipoFornitore, Util } from "../services/util";
import { Fattura } from "../model/fattura";
import { Vendita } from "../model/vendita";

@Component({
  selector: 'app-res-vendita',
  template: `
  <div class="container">
      <p class="titolo">VISUALIZZAZIONE VENDITE</p>
       <!-- Dialogo per l'aggiunta di un fornitore -->
      

    <div class="table-div">
      <table>
        <tr class="title">
          <th>ID</th>
          <th>Dipendente</th>
          <th>Merci</th>
          <th>Biglietti</th>
          <th>Totale</th>
          <th>Data</th>
        </tr>
        <tr class="row" *ngFor="let vendita of vendite">
          <td>{{vendita.id}}</td>
          <td>{{vendita.dipendente}}</td>
          <td>{{vendita.elementi}}</td>
          <td>{{vendita.biglietti}}</td>
          <td>{{vendita.totale}}€</td>
          <td>{{vendita.data | date}}</td>
        </tr>
      </table>
    </div> 
  </div>

  `,
  styleUrls: ["./riservata.css"],
  styles: [``]
})


export class ResVenditaComponent {
    vendite: Vendita[] = [];
    
    constructor(private http: HttpClient, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.getVendite()
    }

    getVendite() {
        this.http.get<Vendita[]>(Util.venditaServerUrl).subscribe(result => {
            this.vendite = result;
        });
    }
}
