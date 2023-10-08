import { ElementoCarrello } from "./elementocarrello";
import { Programmazione } from "./programmazione";

export interface AuthBody{
    id:number;
    body:any;
}
export class AuthBody {
    constructor(public id: number, public body: any) {}
  }