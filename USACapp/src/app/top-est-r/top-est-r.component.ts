import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';

export interface Usuario {
  POS: number;
  ID_USUARIO: number;
  NOMBRE: string;
  RESP: number;
}
@Component({
  selector: 'app-top-est-r',
  templateUrl: './top-est-r.component.html',
  styleUrls: ['./top-est-r.component.scss']
})
export class TopEstRComponent implements OnInit {
  displayedColumns: string[] = ['POS', 'ID_USUARIO', 'NOMBRE', 'RESP'];
  estudiantes:Usuario[];
  constructor(private estserv:EstadisticaService) { }

  ngOnInit() {
    this.estserv.getEstadistica(2)
    .subscribe(
      data=>{
        this.estudiantes=Array<Usuario>();
        if(!data.length){
          this.estudiantes[0]=data;
          this.estudiantes[0].POS=1;
        }
        else{
          this.estudiantes=data;
          for(var i=0;i<this.estudiantes.length;i++)
            this.estudiantes[i].POS=i+1;
        }
      }
    );
  }
}
