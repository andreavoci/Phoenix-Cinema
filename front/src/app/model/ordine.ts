import { Data } from "@angular/router";
import { Biglietto } from "./biglietto";
import { User } from "./user";

export interface Ordine{
    id:number;
    cliente:User;
    biglietti:Array<Biglietto>;
    sconto:number;
    data:Data;
}