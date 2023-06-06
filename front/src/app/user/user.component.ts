import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user',
  template: `
    <div id="userDiv"> 
     <br>USERLIST [{{users.length}}] :
      <ul>
        
        <li *ngFor="let u of users"> {{u|json}}  --  <button (click)="delete(u)">DELETE</button></li>
        <!-- <li *ngFor="let u of users">{{u["id"]}}: {{u["nome"]}}</li> -->
      </ul>
      <br><br><br>CREATE USER
      <form #userCreate="ngForm" (ngSubmit)="create(userCreate.value)">
        <input type="text" name="nome" ngModel placeholder="nome"><br><br>
        <input type="text" name="cognome" ngModel placeholder="cognome"><br><br>
        <input type="text" name="email" ngModel placeholder="email"><br><br>
        <input type="text" name="password" ngModel placeholder="password"><br><br>
        <button type="submit">Crea utente</button>

      </form>
      
      <br><br><br>UPDATE USER
      <form #userUpdate="ngForm" (ngSubmit)="update(userUpdate.value)">
        <input type="text" name="id" ngModel placeholder="id"><br><br>
        <input type="text" name="email" ngModel placeholder="email"><br><br>
        <button type="submit">Aggiorna utente</button>

      </form>


    </div>

  `,
  styles: [
    `
    div{
      
      padding-left : 10px;
    }
    `,
  ]
})
export class UserComponent {
  public users: User[] = [];
  
  private apiServerUrl = 'http://localhost:8091';

  constructor(private http: HttpClient){ }

  
  
  create(data: any){
    console.log(data)
    this.http.post(this.apiServerUrl+"/api/users/create",data).subscribe(result =>{
      console.log(result)
      window.location.reload()
    })
  }

  update(data: any){
    var newUser : User = data

    this.http.post(this.apiServerUrl+"/api/users/update",newUser).subscribe(result =>{
      console.log(result)
      window.location.reload()
    })
  }

  delete(user:User){
    this.http.delete(this.apiServerUrl+"/api/users/delete/"+user.id).subscribe(result =>{
      console.log(result)
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.http.get<User[]>(this.apiServerUrl+"/api/users").subscribe(result=>{
      this.users = result;
      console.log(result)
    })
  }


}
