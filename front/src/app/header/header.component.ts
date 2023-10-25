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
        <a class="navbar-menu-item" routerLink="/about-us" routerLinkActive="active">About Us</a>
        <a class="navbar-menu-icons" routerLink="/carrello" routerLinkActive="active">
        <span class="material-icons" style="font-size:30px;">shopping_cart</span>

        </a>
        <ng-component *ngIf="token ;then logged else guest">here is ignored</ng-component>
      </div>
   </div>

   <ng-template #logged>
      <a class="navbar-menu-icons" routerLink="/profilo" routerLinkActive="active">
        <span class="material-icons" style="font-size:30px;">account_circle</span>
      </a>
      <a *ngIf="user?.ruolo=='DIPENDENTE'" class="navbar-menu-icons" routerLink="/riservata" routerLinkActive="active">AreaPersonale</a>
    </ng-template>  
    <ng-template #guest>
      <a class="navbar-menu-item" routerLink="/login" routerLinkActive="active">Login</a>
    </ng-template>
  `,
  styles: [
    `
    .navbar {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background:rgba(0,0,0,0.4);
      width:100%;
      height :45px;
      overflow: hidden;
      position: relative;
    }
    .navbar-menu {
      width:100%;
      justify-content: center;
      align-items: center;
    }
    .navbar img{
      height :45px;
      color:white;
      -webkit-filter: invert(1)
    }

    .navbar-menu-item {
      float: left;
      display: flex; 
      color: white;
      text-align: center;
      height:45px;
      padding:0px 10px 0px 10px;
      align-items: center;
      /* padding: 18.5px 16px; */
      text-decoration: none;
      font-size: 15px;
      font-family: helvetica;
      font-weight: bold;
    }

    .navbar-menu-icons{
      display: flex; 
      margin-left:auto;
      float: right;
      color: white;
      text-align: center;
      align-items: center;
      /* padding: 16px 16px 10px 16px; */
      /* margin-right: 10px; */
      text-decoration: none;
      padding:0px 10px 0px 10px;
      font-size: 15px;
      height:45px;
      font-family: helvetica;
      font-weight: bold;
    }

    .navbar-item {
      float: left;
      display: block;
      text-align: center;
      /* padding: 2.5px; */
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
      color: rgba(250,108,20,1);
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
