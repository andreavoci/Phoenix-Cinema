import { Component } from "@angular/core";
import { Reso } from "../model/reso";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Util } from "../services/util";

@Component({
    selector: 'app-resi',
    template: `
       <div class="container">
        <br><br><br>
    <p class="titolo">VISUALIZZAZIONE RICHIESTE DI RESO</p>
    <div class="table-div">
    <table>
      <tr class="title">
        <th></th>
        <th>ID</th>
        <th>Ordine</th>
        <th>Data</th>
        <th>Data Programmazione</th>
        <th>Stato</th>
      </tr>
      <tr class="row" *ngFor="let r of resi">
      <td >
                <div style="display:flex;flex-direction:row;width:100%;height:100%">
                  <button class="item-button" style="background:green;width:25px;height:25px;margin:1px;" (click)="accetta(r.id)" *ngIf="r.stato != 'ACCETTATO'">
                    <span class="material-icons" style="font-size:10px;color:white;width:100%;">done</span>
                  </button>
                  
                  <button class="item-button" style="background:red;width:25px;height:25px;margin:1px;" (click)="rimuovi(r.id)" *ngIf="r.stato != 'ACCETTATO'">
                    <span class="material-icons" style="font-size:10px;color:white;width:100%;">delete</span>
                  </button>
                </div>
              </td>        <td>{{r.id}}</td>
        <td>{{r.ordine.id}}</td>
        <td>{{r.data | date}}</td>
        <td>{{r.ordine.biglietti[0].programmazione.orario | date}}</td>
        <td>{{r.stato}}</td>
      </tr>
    </table>
    </div>
    `,
    styleUrls: ["./riservata.css"],
    styles: [``]
})
export class ResResiComponent{
    resi: Reso[] = [];

    constructor(private http: HttpClient,private route: ActivatedRoute,private domSanitizer:DomSanitizer){}
    
    ngOnInit(): void {
        this.getResi()
    }

    getResi(){
        this.http.get<Reso[]>(Util.resiServerUrl).subscribe(result=>{
          this.resi=result;
          this.resi=this.resi.sort((a, b) => a.id - b.id);
          console.log(result)
        })
      }

      accetta(id:number){
        this.http.post<Reso>(Util.resiServerUrl+'/update',id).subscribe(result=>{
            console.log(result)
            window.location.reload()
          })
      }

      rimuovi(id:number){
        this.http.post<Reso>(Util.resiServerUrl+'/delete',id).subscribe(result=>{
            console.log(result)
            window.location.reload()
          })
      }
}