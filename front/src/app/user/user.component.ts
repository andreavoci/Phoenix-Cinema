import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-user',
  template: `
    <p>
      user works!
    </p>
    <ul>
      <li *ngFor="let u of users"> {{u|json}} </li>
    </ul>
  `,
  styles: [
  ]
})
export class UserComponent {
  public users: User[] = [];

  private apiServerUrl = 'http://localhost:8080/api/users'

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.http.get<User[]>(this.apiServerUrl).subscribe(result =>{
      this.users = result;
      console.log(result)
    })
  }
}
