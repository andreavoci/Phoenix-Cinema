import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="navbar-brand">
      <div class="container">
        <p>Made by Andrea, Davide, Domenico, Bruno</p>
      </div>
  </footer>
  `,
  styles: [
    `
    

    p{
      font-family: argentum-regular;
      margin: 5px;
    }

    `,
  ]
})
export class FooterComponent {

}
