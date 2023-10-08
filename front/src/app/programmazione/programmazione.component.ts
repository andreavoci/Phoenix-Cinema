import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Util } from '../services/util';
import { Programmazione } from '../model/programmazione';

@Component({
  selector: 'app-programmazione',
  template: `
    <p>
      programmazione works!
    </p>
  `,
  styles: [
  ]
})
export class ProgrammazioneComponent {
  public programmazioni: Programmazione[] = [];
    
  id: number = -1;

  constructor(private http: HttpClient,private route: ActivatedRoute){}

  ngOnInit(): void {
      this.getAll();
      // Recupera il parametro 'id' dall'URL
      if (this.route.snapshot.paramMap.get('id')){
          this.id = Number(this.route.snapshot.paramMap.get('id'));
      }
      
  }

  getAll(){
      this.http.get<Programmazione[]>(Util.pellicoleServerUrl+"/all").subscribe(result=>{
          this.programmazioni=result;
          console.log(result);
          console.log(this.id);
      })
  }
}
