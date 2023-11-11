import { Data } from "@angular/router";
import { Dipendente } from "./dipendente";
import { ElementoVendita } from "./elementovendita";
import { Biglietto } from "./biglietto";

export interface Vendita{
    id:number;
    dipendente:Dipendente;
    elementi:Array<ElementoVendita>;
    biglietti:Array<Biglietto>;
    totale:number;
    data:Data;
}