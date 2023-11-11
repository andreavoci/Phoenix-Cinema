import { Ordine } from "./ordine";

export interface Reso{
    id:number;
    ordine:Ordine;
    data:Date;
    stato:String
}