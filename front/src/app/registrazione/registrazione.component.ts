import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse, Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrazione',
  template: `
    <div class="container">
    <div *ngIf="token != null; else elseBlock"> 
      <h1>ACCESSO GIA' EFFETTUATO</h1>
    </div>
    <ng-template #elseBlock>
      <br><br><br><br><br><br>
      <div class="container-form"> 
      <form #registrationForm="ngForm" (ngSubmit)="register(registrationForm.value)">
          <p id="title">REGISTRAZIONE</p><br>
          
          <div class="inner-form"> 
            <div id="left">
              <p>Nome</p>
              <p>Cognome</p>
              <p>Email</p>
              <p>Password</p>
              <p>Conferma Password</p>
            </div>
            <div id="right">            
              <input type="text" name="nome" ngModel placeholder="nome"><br><br>
              <input type="text" name="cognome" ngModel placeholder="cognome"><br><br>
              <input type="text" name="email" ngModel placeholder="email"><br><br>
              <input type="password" name="password" ngModel placeholder="password"><br><br>
              <input type="password" name="conferma-password" ngModel placeholder="password"><br><br>
            </div>
          </div>
          <b><p style="color:black;weight:bold" id="loginform-error"><p></b>
          <button type="submit">Registrati</button>
        </form>
        <br>
      </div>
    </ng-template>
  </div>
      <!-- <div class="registration-form">
        <h2>Registrazione</h2>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" ngModel required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" ngModel required pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&*]).{6,}$">
          </div>
          <div class="button-group">
            <button type="submit">Registrati</button>
          </div>
        </form>
      </div> -->
    <!-- </div> -->
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
    .inner-form{
      display:flex;
      flex-direction:row;
      
    }
    #left{
      height:100%;
      width:auto;
    }
    #left > p{
      font-weight:bold;
      padding-bottom:20px;
      padding-top:4px;
      padding-right:10px;
      text-align:center;
    }
    #right{
      height:100%;
      width:auto;
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
    `
  ]
})
export class RegistrazioneComponent {
  public token : string | null = null;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.token = AuthService.getToken("token")
    if(this.token){
      this.router.navigate(['/profilo']);
    }
  }
  register(form: any) {
    if(form["password"]!=form["conferma-password"]){
      let element = document.getElementById("loginform-error")
      if (element != null) {
        element.innerHTML = "le password non coincidono"
      }
      return
    }
    if(!form["nome"] || !form["cognome"] || !form["email"] || !form["password"] || !form["conferma-password"]){
      let element = document.getElementById("loginform-error")
      if (element != null) {
        element.innerHTML = "Non puoi lasciare campi vuoti"
      }
      return
    }
    this.http.post<LoginResponse>(Util.authServerUrl + "/register", form).subscribe(
      success => {
        console.log(success.token)
        AuthService.setToken("token", success.token)
        AuthService.setToken("id", success.id)
        window.location.reload()
      },
      error => {
        console.log(error.error)
        let element = document.getElementById("loginform-error")
        if (element != null) {
          element.innerHTML = error.error
        }
      }
    )
  }

}
