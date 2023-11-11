import { Inventario } from "./inventario";

export interface ElementoVendita{
    id:number;
    merce:Inventario;
    quantita:number;
    costo:number;
}

export class ElementoVendita{
    constructor(
        public merce:Inventario,
        public quantita:number,
        public costo:number
    ) {}
}