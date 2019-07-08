import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';

export interface Catedratico {
  POS: number;
  ID_USUARIO: number;
  NOMBRE: string;
  RESP: number;
}
@Component({
  selector: 'app-top-cat-r',
  templateUrl: './top-cat-r.component.html',
  styleUrls: ['./top-cat-r.component.scss']
})
export class TopCatRComponent implements OnInit {
  displayedColumns: string[] = ['POS', 'ID_USUARIO', 'NOMBRE', 'RESP'];
  cats:Catedratico[];
  constructor(private estServ:EstadisticaService) { }

  ngOnInit() {
    this.estServ.getEstadistica(1)
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
