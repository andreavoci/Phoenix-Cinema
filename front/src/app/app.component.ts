import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>

    <app-footer></app-footer> 
  `,
  styles: [`
  /* UTILITIES */
 
  app-footer{
    
    width: 100%;
    color: black;
    text-align: center;
    /*
    position:fixed;
    bottom:0;*/
  }
  `,]
})
export class AppComponent {
  title = 'frontend';
}
