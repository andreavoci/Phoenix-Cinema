import { Data } from "@angular/router";
import { ElementoCarrello } from "./elementocarrello";
import { User } from "./user";

export interface Carrello{
    id:number;
    cliente:User;
    elementi:Array<ElementoCarrello>;
    sconto:number;
    data:Data;
}