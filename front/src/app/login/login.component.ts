import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginResponse, Util } from '../services/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `

    <div *ngIf="token != null; else elseBlock"> 
      <p>questo è il token dell'utente salvato : {{token}}</p>
      
      <button (click)="logout()" type="submit">Logout</button>

    </div>
    <ng-template #elseBlock>
      <div id="userDiv"> 
        <br><br><br>LOGIN
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)">
          <input type="text" name="email" ngModel placeholder="email"><br><br>
          <input type="password" name="password" ngModel placeholder="password"><br><br>
          <b><p style="color:red;weight:bold" id="loginform-error" ><p></b>
          <button type="submit">Login</button>
        </form>


      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class LoginComponent {
  public token : string | null = null;
  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.token = AuthService.getToken("token")
    console.log(this.token)
  }

  login(form: any){
    // console.log(data)
    this.http.post<LoginResponse>(Util.authServerUrl+"login",form).subscribe(
      success => {
        console.log(success.token)
        AuthService.setToken("token",success.token)
        window.location.reload()
      },
      error => {
        console.log(error.error)
        let element = document.getElementById("loginform-error")
        if(element != null){
          element.innerHTML = error.error
        }
      }

    )
  }
  

  logout(){
     console.log("delete")
    
    AuthService.deleteToken("token")
    window.location.reload()
  }

}
