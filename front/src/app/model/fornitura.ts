import { Fattura } from "./fattura";
import { Fornitore } from "./fornitore";
import { Merce } from "./merce";

export interface Fornitura{
    id:number;
    fornitore:Fornitore;
    fattura:Fattura;

    tipo:string;
    arrivo:Date;
    scadenza:Date;
    prezzo:number;
    quantita:number;
    stato:string;
    merci:Array<Merce>;
}