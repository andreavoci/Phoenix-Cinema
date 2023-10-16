import { Pellicola } from './../model/pellicola';
import { Component } from '@angular/core';

@Component({
  selector: 'app-acquisto',
  template: `
  <br><br><br>
    <!-- sala.component.html -->
<div class="sala">
  <div class="posti">
    <div
      *ngFor="let posto of posti; let i = index"
      [ngClass]="{ 'selezionato': posto.selezionato, 'libero': !posto.selezionato }"
      (click)="selezionaPosto(i)"
    >
      <i>{{posti[i].numero}}</i>
    </div>
  </div>
</div>

  `,
  styles: [`
 .sala {
  display: flex;
  justify-content: column;
  align-items: flex-start;
  height: 50vh;
  padding: 20px;
}

.posti {
  display: grid;
  grid-template-columns: repeat(20, minmax(20px, 1fr));
  gap: 5px;
  width: 900%;
  max-width: 1000px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 5px;
}

.posti > div {
  padding: 1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: auto;
  background: #f5f5f5;
  border: 1px solid #ccc;
  position: relative;
}

.posti > div .numero {
  display: inline-block;
  font-size: 1px;
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
  `]
})
export class AcquistoComponent {
    pellicola: Pellicola|null = null;
    posti: { numero: number, selezionato: boolean }[] = [];

  constructor() {
    // Inizializza i posti nella sala cinematografica (puoi personalizzarli come desideri)
    for (let i = 1; i <= 250; i++) {
      this.posti.push({ numero: i, selezionato: false });
    }
  }

  selezionaPosto(index: number) {
    // Cambia lo stato di selezione del posto quando viene fatto clic su di esso
    this.posti[index].selezionato = !this.posti[index].selezionato;
  }
}
