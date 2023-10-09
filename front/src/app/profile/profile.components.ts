import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Util } from '../services/util';
import { AuthService } from '../services/auth.service';
import {User} from "../model/user";

@Component({
  selector: 'app-profile',
  template: './profile.component.html',
  styles: [   ]
})
export class ProfileComponent implements OnInit {
    user!: User ;
    readonly profile = "profile" 

    constructor(private http: HttpClient, private authService: AuthService) { }

    ngOnInit(): void {
        let userId = AuthService.getToken("id");
        const authToken = AuthService.getToken("token");
        this.http.get<User>(`${Util.userServerUrl}/${this.profile}?id=${userId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
        }).subscribe(
        (data: User) => {
            this.user = data;
        },
        (error:HttpErrorResponse) => {
            console.error(error);
        }
        );
    }


}

