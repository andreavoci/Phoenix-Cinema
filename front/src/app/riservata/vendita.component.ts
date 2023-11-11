import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Fornitore } from "../model/fornitore";
import { TipoFornitore, Util } from "../services/util";
import { Fattura } from "../model/fattura";
import { Vendita } from "../model/vendita";
import { Biglietto } from "../model/biglietto";
import { Inventario } from "../model/inventario";
import { ElementoVendita } from "../model/elementovendita";

@Component({
  selector: 'app-res-vendita',
  template: `
  <div class="container">
      <p class="titolo">VISUALIZZAZIONE VENDITE</p>
       
    <dialog #popupMerci id="popupMerci">
      <div class="background-blur">
              
        <div class="component-popup" style="width:auto;">
          <div class="navbar-popup">
              <p class="title-popup">Merci</p>
              <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="popupMerci.close();" >
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
              </button>
          </div>
          
          <p>[</p>
          <div *ngFor="let m of merciSelezionate">
            <p>{{m|json}},</p>
          </div>
          <p>]</p>
        
        </div>
      </div>
    </dialog>

    
    <dialog #popupBiglietti id="popupBiglietti">
      <div class="background-blur">
              
        <div class="component-popup" style="width:auto;">
          <div class="navbar-popup">
              <p class="title-popup">Biglietti</p>
              <button class="item-button" style="margin:5px;background:red;width:30px;height:30px;" (click)="popupBiglietti.close();" >
                <span class="material-icons" style="font-size:25px;color:white;width:100%;">close</span>
              </button>
          </div>
          
          <p>[</p>
          <div *ngFor="let b of bigliettiSelezionati">
            <p>{{b|json}},</p>
          </div>
          <p>]</p>
        
        </div>
      </div>
    </dialog>


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
          <td>{{vendita.dipendente.userID.email}}</td>
          <td><a (click)="openMerci(vendita.elementi)">[{{vendita.elementi.length}}]</a></td>
          <td><a (click)="openBiglietti(vendita.biglietti)">[{{vendita.biglietti.length}}]</a></td>
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
    
    merciSelezionate :ElementoVendita[] = [];
    bigliettiSelezionati :Biglietto[] = [];
    constructor(private http: HttpClient, private route: ActivatedRoute, private domSanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.getVendite()
    }

    getVendite() {
        this.http.get<Vendita[]>(Util.venditaServerUrl).subscribe(result => {
            this.vendite = result;
        });
    }
    

    openMerci(merci:ElementoVendita[]){
        console.log("ciao")
        this.merciSelezionate = merci;

        let myDialog:any = <any>document.getElementById("popupMerci");
        myDialog.showModal();
    }

    openBiglietti(biglietti:Biglietto[]){
        console.log("ciao")
        this.bigliettiSelezionati = biglietti;

        let myDialog:any = <any>document.getElementById("popupBiglietti");
        myDialog.showModal();
    }

}
