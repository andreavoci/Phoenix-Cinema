import { Data } from '@angular/router';
import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Pellicola } from "../model/pellicola";
import { HttpClient } from "@angular/common/http";
import { Util } from "../services/util";

@Component({
    selector: 'app-pellicola',
    template: `
    <br>
    <br>
    <a style="color: azure; display: flex; height: 40px;">Oggi al cinema</a>
        <div class="container-film">
            <div *ngFor="let p of programm">
            <a [routerLink]="[p.id]">
                <img src="{{p.locandina}}">
                <span class="actions">
                    <div class="center">
                        <p>{{p.titolo}}
                        <p style="font-size:12px;">info</p>
                    </div>
                </span>
            </a>
            </div>
        </div>
    <br><br>
    <a style="color: azure; display: flex; height: 40px;">Prossimamente</a>
    <div class="container-film">
        <div *ngFor="let p of nuove">
        <a [routerLink]="[p.id]">
            <img src="{{p.locandina}}">
            <span class="actions">
                <div class="center">
                    <p>{{p.titolo}}
                    <p style="font-size:12px;">info</p>
                </div>
            </span>
        </a>
        </div>
        </div>
    `,
    styles: [`
        .container-film {
            flex-flow: row wrap;
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
        }
        a{
            flex: 0 0 calc(25% - 1em);
            margin: 5px 10px;
            position: relative;
            display: inline-block;
            max-width:200px;
            width:100%;
            height:100%;
        }
        img {
            border: 0;
            border-radius:15px;
            width: 200px;
            object-fit: cover;
        }
        
        a:hover .actions {

            opacity: 1;
        }
        a .actions {
            border-radius:15px;
            display: block;
            position: absolute;
            top: 0;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(29,29,29,.7);
            -ms-transition: all .2s ease-out;
            -webkit-transition: all .2s ease-out;
            -moz-transition: all .2s ease-out;
            -o-transition: all .2s ease-out;
            transition: all .2s ease-out;
        }
        .center{
            width : 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align:center;
            justify-content: center;
        }
        a p{
            color:#FFFFFF;
            letter-spacing: 1px;
            font-size: 20px;
        }

        

      `,
    ]
})
export class PellicolaComponent {
    public pellicole: Pellicola[] = [];
    public nuove: Pellicola[] = [];
    public programm: Pellicola[] = [];

    constructor(private http: HttpClient){}

    ngOnInit(): void {
        this.getAll();  
    }

    getAll(){
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result=>{
            this.pellicole=result;
            console.log(result);
        this.spartisciPellicole();
        })
    }

    spartisciPellicole(){
        var oggi = new Date();
        console.log(oggi);
        console.log(this.pellicole);
        this.pellicole.forEach(p=>{
            var orario = new Date(p.data_uscita);
            console.log(oggi>orario);    
            if(oggi>orario){
                this.programm.push(p);
            }else{
                this.nuove.push(p);
            }
        })
        console.log(this.programm);
        console.log(this.nuove);
    }
    
}