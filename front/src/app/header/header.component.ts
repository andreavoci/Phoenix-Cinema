import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="navbar">

      <div class="navbar-brand">

        <a class="navbar-item"routerLink="/">
          <img src="assets/image/logo-phoenix.png" >
        </a>

      </div>
      <div class="navbar-menu">
        <a class="navbar-menu-item" routerLink="/user" routerLinkActive="active">user</a>
        <a class="navbar-menu-item" routerLink="/biglietto" routerLinkActive="active">biglietto</a>
        <a class="navbar-menu-item" routerLink="/login" routerLinkActive="active">Login</a>
      </div>
   </div>
  `,
  styles: [
    `
    .navbar {
      display: flex;
      align-items: center;
      background:rgba(0,0,0,0.4);

      overflow: hidden;
    }
    .navbar img{
      height :45px;
      color:white;
      -webkit-filter: invert(1)
    }
    
    .navbar-menu-item {
      float: left;
      display: block;
      color: white;
      text-align: center;
      padding: 18px 16px;
      text-decoration: none;
      font-size: 15px;
      font-family: helvetica;
      font-weight: bold;
    }
    
    .navbar-item {
      float: left;
      display: block;
      text-align: center;
      padding: 2.5px;
      text-decoration: none;
    }

    /* Change the color of links on hover */
    .navbar a:hover {
      background: rgba(250,108,20,0.5);
      color: white;
    }

    /* Add an active class to highlight the current page */
    .navbar a.active {
      background-color: #0000002e;
      color: white;
    }

    `,
  ]
})
export class HeaderComponent {

}
