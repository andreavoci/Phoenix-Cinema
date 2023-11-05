import { Fornitura } from "./fornitura";

export interface Pellicola{
    id:number;
    titolo:string;
    fornitura:Fornitura;
    data_uscita:Date;
    durata:number;
    generi:string;
    pegi:number;
    regista:string;
    attori:string;
    prezzo_noleggio:number;
    locandina:string;
    trailer:string;
    trama:string;
    fine_noleggio:Date;
}

export class Pellicola{
    constructor(
        public titolo:string,
        public data_uscita:Date,
        public fine_noleggio:Date,
        public prezzo_noleggio:number
    ) {}
}