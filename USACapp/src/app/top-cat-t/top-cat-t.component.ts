import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';

export interface Catedratico {
  POS: number;
  ID_USUARIO: number;
  NOMBRE: string;
  TEMA: number;
}
@Component({
  selector: 'app-top-cat-t',
  templateUrl: './top-cat-t.component.html',
  styleUrls: ['./top-cat-t.component.scss']
})
export class TopCatTComponent implements OnInit {
  displayedColumns: string[] = ['POS', 'ID_USUARIO', 'NOMBRE', 'TEMA'];
  cats:Catedratico[];
  constructor(private estServ:EstadisticaService) { }

  ngOnInit() {
    this.estServ.getEstadistica(3)
    .subscribe(
      data=>{
        this.cats=Array<Catedratico>();
        if(!data.length){
          this.cats[0]=data;
          this.cats[0].POS=1;
        }
        else{
          this.cats=data;
          for(var i=0;i<this.cats.length;i++)
            this.cats[i].POS=i+1;
        }
      }
    );
  }

}
