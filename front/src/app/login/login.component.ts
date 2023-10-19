import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginResponse, Util } from '../services/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div *ngIf="token != null; else elseBlock"> 
        <h1>ACCESSO GIA' EFFETTUATO</h1>
        
        <button (click)="logout()" type="submit" class="button">Logout</button>

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
    </div>
  `,
  styles: [
    `
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
    .button{
      font-size:24px;
      padding:10px 15px;
    }
    `,
  ]
})
export class LoginComponent {
  public token : string | null = null;

  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.token = AuthService.getToken("token")
    console.log(this.token)
    console.log(AuthService.getToken("id"))
  }

  login(form: any){
    // console.log(data)
    this.http.post<LoginResponse>(Util.authServerUrl+"/login",form).subscribe(
      success => {
        console.log(success.token)
        AuthService.setToken("token",success.token)
        AuthService.setToken("id",success.id)
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

  register(form: any){
    this.http.post<LoginResponse>(Util.authServerUrl+"/register",form).subscribe(
      success=>{
        console.log(success.token)
        AuthService.setToken("token",success.token)
        AuthService.setToken("id",success.id)
        window.location.reload()
      },
      error=>{console.log(error.error)
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
