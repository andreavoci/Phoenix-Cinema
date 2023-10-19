import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Util } from '../services/util';
import { User } from '../model/user';

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
        <a class="navbar-menu-item" routerLink="/pellicola" routerLinkActive="active">pellicole</a>
        <a class="navbar-menu-item" routerLink="/carrello" routerLinkActive="active">Carrello</a>
        <a class="navbar-menu-item" routerLink="/about-us" routerLinkActive="active">About Us</a>
        <div *ngIf="token ;then logged else guest">here is ignored</div>
        <ng-template #logged>
          <a class="navbar-menu-item" routerLink="/profilo" routerLinkActive="active">Profilo</a>
          <a *ngIf="user?.ruolo!=null" class="navbar-menu-item" routerLink="/riservata" routerLinkActive="active">AreaPersonale</a>
        </ng-template>
        <ng-template #guest>        
          <a class="navbar-menu-item" routerLink="/login" routerLinkActive="active">Login</a>
        </ng-template>
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
  public token : string | null = null;
  public userId = -1;
  user : User |null = null;

  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.token = AuthService.getToken("token")
    if(AuthService.getToken("id")){
      this.userId = Number(AuthService.getToken("id"))
    }
    this.checkDipendente()
  }

  checkDipendente(){
    if(this.token){
      this.http.get<User>(Util.userServerUrl+"/"+this.userId).subscribe( result=> {
        this.user = result;
    });
    }
  }
}
