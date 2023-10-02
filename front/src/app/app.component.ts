import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="body">
    <app-header></app-header>
      <div class="inner-body">
        <router-outlet></router-outlet>
      </div>
    <app-footer></app-footer>
    </div>
  `,
  styles: [`
  
    @font-face {
      font-family: argentum-semibolditalic;
      src: url("/assets/fonts/ArgentumNovus-SemiBoldItalic.ttf");
    }
    
    @font-face {
      font-family: argentum-regular;
      src: url("/assets/fonts/ArgentumNovus-Regular.ttf");
    }

    .body{
      background-image: url("/assets/image/background.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  
    .inner-body{
      display: flex;
      flex-flow: column;
      height: calc( 100vh - 80px); 
      flex: 1;
    }
 
    app-footer{
      position: fixed;
      bottom: 0;
      height: 35px;
      background: black;
      color: white;
      width: 100%;
      text-align: center;
    }
  `,]
})
export class AppComponent {
  title = 'frontend';
}
