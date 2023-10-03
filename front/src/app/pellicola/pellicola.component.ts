import { Component } from "@angular/core";
import { Pellicola } from "../model/pellicola";
import { HttpClient } from "@angular/common/http";
import { Util } from "../services/util";

@Component({
    selector: 'app-pellicola',
    template: `
      <div id="userDiv">
        <ng-container *ngFor="let p of pellicole">
            <div>
                <img src="{{p.locandina}}" alt="Pellicola">
                <div>
                    <a [routerLink]="['/pellicola/{{p.id}}']" routerLinkActive="router-link-active" ></a>
                </div>
            </div>
            <div class="pellicola_details">
                <h5>{{p.titolo}}</h5>
                <h6>{{p.regista}}</h6>
                <ul>
                    <li>€</li>
                </ul>
            </div>
        </ng-container>
        
      </div>
    `,
    styles: [`
      
      
      
    `,
    ]
})
export class PellicolaComponent {
    public pellicole: Pellicola[] = [];

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.getAll();
    }

    getAll(){
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl+"/all").subscribe(result=>{
            this.pellicole=result;
            console.log(result);
        })
    }
}