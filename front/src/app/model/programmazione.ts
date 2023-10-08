import { Pellicola } from "./pellicola";
import { Sala } from "./sala";

export interface Programmazione{
    id:number;
    pellicola:Pellicola;
    sala:Sala;
    posti:String;
    prezzo:number;
    orario:Date;
}