import { Pellicola } from "./pellicola";
import { Posto } from "./posto";
import { Sala } from "./sala";

export interface Programmazione{
    id:number;
    pellicola:Pellicola;
    sala:Sala;
    posti:Array<Posto>;
    prezzo:number;
    orario:Date;
}