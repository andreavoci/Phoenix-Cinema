import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="center">
      <h1>PHOENIX CINEMA</h1>
      <button [routerLink]="['/pellicola/123']">In programmazione</button>
    </div>
  `,
  styles: [
    `

    .center {
      height: calc( 100vh - 80px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    h1 {
      color:white;
      font-family:argentum-semibolditalic;
      padding: 5px;
      margin-bottom: 15px;
    }
    
    button {
      padding: 10px;
      border: 1px solid black;
      border-color: white;
      border-radius: 5px;
      color:white;
      background: rgba(250,108,20,0.2);
      font-family: argentum-regular;
      cursor: pointer;
    }

    button:hover{
      border-color: #fa6c14;
      background: #fa6c14;
      font-family: argentum-semibolditalic;
    }
  `,
  ]
})
export class HomeComponent {

}
