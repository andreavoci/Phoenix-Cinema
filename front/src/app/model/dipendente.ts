import { User } from "./user";

export interface Dipendente {
    id:number;
    userID:User;
    nome:string;
    cognome:string;
    cf:string;
    genere:string;
    data_nascita:Date;
    indirizzo:string;
    telefono:string;
    mansione:string;
}