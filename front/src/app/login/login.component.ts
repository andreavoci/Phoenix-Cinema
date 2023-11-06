import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginResponse, Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <div class="container">
    <div *ngIf="token != null; else elseBlock"> 
      <p style="color:white">error</p>
    </div>
    <ng-template #elseBlock>
      <br><br><br><br><br><br>
      <div class="container-form"> 
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)">
          <p id="title">LOGIN</p><br>
          <input type="text" name="email" ngModel placeholder="email"><br><br>
          <input type="password" name="password" ngModel placeholder="password"><br><br>
          <b><p style="color:black;weight:bold" id="loginform-error"><p></b>
          <button type="submit">Login</button>
        </form>
        <br>
        <p style="font-size:12px;color:white;">Non sei registrato? Registrati <a href="/registrazione">QUI</a></p>
      </div>
    </ng-template>
  </div>
  `,
  styles: [
    `
    .container{
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 80px);
      backdrop-filter: blur(5px);
      z-index:1;
      display: flex;
      overflow: auto;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }
    .container-form{
      display:flex;
      padding:20px 30px 10px 30px;
      border-radius:20px;
      border:3px solid white;
      flex-direction:column;
      background: rgba(250,108,20,1);
      justify-content:space-between;
      align-items:center;
      text-align:center;
    }
    #title{
      font-size:28px;
      font-weight:bold;
      color:white;
    }
    input{
      border-radius:10px;
      border:1px solid black;
      font-size:20px;
      text-align:center;
    }
    button{
      font-size:16px;
      padding:5px 15px;
      border-radius:10px;
      background:white;
      border:2px solid black;
    }
    button:hover{
      cursor:pointer;
      color:white;
      background:gray;
    }

    `,
  ]
})
export class LoginComponent {
  public token : string | null = null;

  constructor(private http: HttpClient, private router: Router){ }

  ngOnInit(): void {
    this.token = AuthService.getToken("token")
    if(this.token){
      this.router.navigate(['/profilo']);
    }
  }

  login(form: any){
    // console.log(data)
    this.http.post<LoginResponse>(Util.authServerUrl+"/login",form).subscribe(
      success => {
        console.log(success.token)
        AuthService.setToken("token",success.token)
        AuthService.setToken("id",success.id)
        window.location.href = '/profilo'
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

  navigateToRegistration() {
    this.router.navigate(['/registrazione']);
  }
  
}
