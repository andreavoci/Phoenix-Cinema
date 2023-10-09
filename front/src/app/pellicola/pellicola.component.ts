import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Pellicola } from "../model/pellicola";
import { HttpClient } from "@angular/common/http";
import { Util } from "../services/util";

@Component({
    selector: 'app-pellicola',
    template: `
    <br>
    <br><br><br>    
        <div class="col-ms-10 col-md-4">
        <div class="project" *ngFor="let p of pellicole">
            <figure class="img-responsive">
                <a [routerLink]="[p.id]">
                    <img src="{{p.locandina}}" alt="{{p.titolo}}">
                    <span class="actions">
                            <button [routerLink]="[p.id]" class="btn btn-warning btn-action" type="submit" >Acquista ora</button>
                    </span>
                </a>
            </figure>
        </div>
        </div>`,
    styles: [`
    body{
    background:#eee;;
}
.title{
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4) !important;    
}

.divider-title{
    border:1px solid #dddddd;
}

.project {
    margin-bottom: 30px;
    vertical-align: top;
    margin-right: 30px;
    cursor: pointer;
    width:100%;
}

.project figure {
    position: relative;
    display: inline-block;
    width:230px;
}

.project figure figcaption {
    position: relative;
    z-index: 10;
    padding: 8px 18px 11px;
    background: #fff;
    -ms-transition: all .2s ease-out;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -o-transition: all .2s ease-out;
    transition: all .2s ease-out;
    text-align: left;
    color: #555;
}

.project figure:hover .actions {
    opacity: 1;
}

.project figure .actions {
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

.project figure img {
    border: 0;
    width: 100%;
}

figcaption .project-creator {
    font-size: 13px;
    color: #545454;
    display: block;
}

figcaption .project-creator {
    font-size: 13px;
    color: #545454;
    display: block;
}

.project figure .actions button {
    font-size: 16px;
    color:#FFFFFF;
    top: 32%;
    position: relative;
    left: 50%;
    width: 90%;
    margin-left: -45%;
    line-height: 18px;
    letter-spacing: 1px;
    background-color: transparent;
}                    
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
        this.http.get<Pellicola[]>(Util.pellicoleServerUrl).subscribe(result=>{
            this.pellicole=result;
            console.log(result);
        })
    }
}