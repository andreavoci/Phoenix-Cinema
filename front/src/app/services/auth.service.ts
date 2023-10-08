import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(){}
    static setToken(key:string, value:string){

        // First, serialize it (but just if token is not string type).
        // const tokenString:string = JSON.stringify( token );
    
        localStorage.setItem(key, value);
    }
    
    // READ the token from localstorage and Deserialize
    static getToken(key:string): string | null{
    
        let token = localStorage.getItem( key );
    
    return token;
    }
    
    static deleteToken(key:string): void{
    
        let token = localStorage.removeItem(key);
    
    }
}

