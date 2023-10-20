import { ActivatedRoute } from '@angular/router';
import { Pellicola } from './../model/pellicola';
import { Component } from '@angular/core';
import { Programmazione } from '../model/programmazione';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-acquisto',
  template: `
  <br><br>

  <div class="titolo"><h1>{{programmazioneSelezionata?.pellicola?.titolo}}</h1></div><br>
    <!-- sala.component.html -->
    <div class="container">
<div class="sala">
  <div class="posti">
    <div
      *ngFor="let posto of programmazioneSelezionata?.posti; let i = index"
      (click)="selezionaPosto(i)"
    >
      
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
            <image xlink:href="../../assets/image/kisspng-computer-icons-cinema-clip-art-cinema-chair-5b17e507d0bbf4.020476731528292615855.svg" width="60" height="60" />
            <text x="30" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="black">{{posto.numero}}</text>
          </svg>
    </div>
  </div>
</div>
<div class="informazioni" style="color: white">
  <h2>{{programmazioneSelezionata?.pellicola?.titolo}}</h2>
</div>
    </div>
  `,
  styles: [`
  .container{
    display:flex;
  }
  .titolo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Regola l'altezza desiderata */
}

h1 {
  font-size: 72px; /* Regola la dimensione del carattere desiderata */
  text-align: center; /* Centra il testo orizzontalmente */
  color:white;
}
 .sala {
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 50vh;
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.posti {
  display: grid;
  grid-template-columns: repeat(10, minmax(20px, 1fr));
  gap: 5px;
  width: 900%;
  max-width: 1000px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px;
  flex-basis: calc(20% - 10px);
}

.posti > div {
  flex: 1;
  padding: 1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;
  width: auto;
  background: #f5f5f5;
  border: 1px solid #ccc;
  position: relative;
}

.posti > div .numero {
  display: inline-block;
  font-size: 12px;
}

/* Aggiungi il colore di selezione */
.posti > div.selezionato {
  background-color: #3498db;
  color: #fff;
}

.posto:hover {
  background-color: #95a5a6;
  color: #fff;
}
.informazioni{
  flex:1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Regola l'altezza desiderata */
}

h2 {
  font-size: 36px; /* Regola la dimensione del carattere desiderata */
  text-align: center; /* Centra il testo orizzontalmente */
  color:white;
}
  `]
})
export class AcquistoComponent {
    programmazioneSelezionata: Programmazione|null = null;
    posti: { numero: number, selezionato: boolean }[] = [];
    idProgrammazione: number = -1;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    // Inizializza i posti nella sala cinematografica (puoi personalizzarli come desideri)
    if (this.route.snapshot.paramMap.get('id')){
      this.idProgrammazione = Number(this.route.snapshot.paramMap.get('id'));
    }

    this.getProgrammazione(this.idProgrammazione);
  }

  getProgrammazione(id:number){
    return this.http.get<Programmazione>(Util.programmazioniServerUrl+"/"+this.idProgrammazione+"/acquisto").subscribe(result =>{
      this.programmazioneSelezionata=result;
      console.log(result);
    })
  }

  selezionaPosto(index: number) {
    // Cambia lo stato di selezione del posto quando viene fatto clic su di esso
    this.posti[index].selezionato = !this.posti[index].selezionato;
  }
}
