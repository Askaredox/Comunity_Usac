import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';

export interface Ciencia{
  POS: number;
  NOMBRE: string;
  COMENTARIO: number;
}

@Component({
  selector: 'app-top-cie-r',
  templateUrl: './top-cie-r.component.html',
  styleUrls: ['./top-cie-r.component.scss']
})
export class TopCieRComponent implements OnInit {
  displayedColumns: string[] = ['POS', 'NOMBRE', 'COMENTARIO'];
  cien:Ciencia[];
  constructor(private estServ:EstadisticaService) { }

  ngOnInit() {
    this.estServ.getEstadistica(5)
    .subscribe(
      data=>{
        this.cien=Array<Ciencia>();
        if(!data.length){
          this.cien[0]=data;
          this.cien[0].POS=1;
        }
        else{
          this.cien=data;
          for(var i=0;i<this.cien.length;i++)
            this.cien[i].POS=i+1;
        }
      }
    );
  }

}
