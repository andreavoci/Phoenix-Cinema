// data-transfer.service.ts
import { Injectable } from '@angular/core';
import { Programmazione } from '../model/programmazione';

@Injectable()
export class SharedService {
  giornoScelto: Programmazione[] = [];

  constructor(){}
}