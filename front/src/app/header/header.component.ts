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
        <a class="navbar-menu-item" routerLink="/login" routerLinkActive="active">Login</a>
      </div>
   </div>
  `,
  styles: [
    `
    .navbar {
      display: flex;
      align-items: center;
      background-color: #c55a11;

      overflow: hidden;
    }
    .navbar img{
      height :45px;
    }
    
    .navbar-menu-item {
      float: left;
      display: block;
      color: black;
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
      padding: 3px;
      text-decoration: none;
    }

    /* Change the color of links on hover */
    .navbar a:hover {
      background-color: #0000002e;
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
