import { Fornitore } from "../model/fornitore";

export interface Pellicola{
    id:number;
    titolo:string;
    fornitore:Fornitore;
    data_uscita:Date;
    durata:number;
    generi:string;
    pegi:number;
    regista:string;
    attori:string;
    prezzo_noleggio:number;
    locandina:string;
    trailer:string;
    fine_noleggio:Date;
}