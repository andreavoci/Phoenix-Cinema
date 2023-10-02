import { Component } from '@angular/core';
import { Biglietto } from '../model/biglietto';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';

@Component({
  selector: 'app-biglietto',
  template: `
    <div id="userDiv"> 
     <br>BIGLIETTI [{{biglietti.length}}] :
      <ul>
        
        <li *ngFor="let u of biglietti"> {{u|json}}  --  <button (click)="delete(u)">Cancella biglietto</button></li>
        <!-- <li *ngFor="let u of users">{{u["id"]}}: {{u["nome"]}}</li> -->
      </ul>
      <br><br><br>CREATE BIGLIETTO
      <form #bigliettoCreate="ngForm" (ngSubmit)="create(bigliettoCreate.value)">
        <input type="text" name="nome" ngModel placeholder="nome"><br><br>
        <input type="text" name="regista" ngModel placeholder="regista"><br><br>
        <input type="text" name="film" ngModel placeholder="film"><br><br>
        <input type="text" name="sala" ngModel placeholder="sala"><br><br>
        <input type="text" name="posto" ngModel placeholder="posto"><br><br>
        <button type="submit">Crea Biglietto</button>

      </form>



    </div>
  `,
  styles: [`
    
    
    
  `,
  ]
})
export class BigliettoComponent {

  public biglietti: Biglietto[] = [];

  private apiServerUrl = 'http://localhost:8091';

  constructor(private http: HttpClient){ }

  create(data: any){
    console.log(data)
    this.http.post(Util.bigliettiServerUrl+"/create",data).subscribe(result =>{
      console.log(result)
      window.location.reload()
    })
  }

  delete(biglietto:Biglietto){
    this.http.delete(Util.bigliettiServerUrl+"/delete/"+biglietto.id).subscribe(result =>{
      console.log(result)
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.http.get<Biglietto[]>(Util.bigliettiServerUrl).subscribe(result=>{
      this.biglietti = result;
      console.log(result)
    })
  }



}
