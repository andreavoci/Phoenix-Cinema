import { Fattura } from "./fattura";
import { Fornitore } from "./fornitore";
import { Merce } from "./merce";
import { Pellicola } from "./pellicola";

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
    pellicole:Array<Pellicola>;
}

export class Fornitura{
    public constructor();
    public constructor(
        fornitore?:Fornitore,
        fattura?:Fattura,
        tipo?:string,
        merci?:Array<Merce>
    ) {}
}