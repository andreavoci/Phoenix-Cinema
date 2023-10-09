import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import {User} from "../model/user";

@Component({
  selector: 'app-profile',
  template: `
  
    <div class="container" *ngIf="user">
        <h1>Profilo Personale</h1>
        <p>Nome: {{ user.nome }}</p>
        <p>Cognome: {{ user.cognome }}</p>
        <p>Cf: {{ user.cf }}</p>
    
        <h1>ACCESSO GIA' EFFETTUATO</h1>
        
        <button (click)="logout()" type="submit" class="button">Logout</button>
        <br>
        <br>
        <button routerLink="/ordini" type="submit" class="button">MIEI ORDINI</button>

      
    </div>
`,
  styles: [  `

    .container{
      width: 100%;
      background: gray;
      height: 100%;
      min-height: calc(100vh - 80px);
      display: flex;
      overflow: auto;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }
  `, ]
})
export class ProfileComponent implements OnInit {
    user: User | null = null;
    
    readonly profile = "profile" 
    userId = -1;
    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit(): void {
        if (AuthService.getToken('id')){
          this.userId = Number(AuthService.getToken('id'));
        }    
        const authToken = AuthService.getToken("token");
        
        this.http.get<User>(Util.userServerUrl+"/"+this.userId).subscribe( result=> {
            this.user = result;
            console.log(result)
        });

        console.log(this.user);
    }

    logout(){
        console.log("delete")
       
       AuthService.deleteToken("token")
       AuthService.deleteToken("id")
       window.location.reload()
     }

}

