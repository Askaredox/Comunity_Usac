import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from '../services/estadistica.service';

export interface Usuario {
  POS: number;
  ID_USUARIO: number;
  NOMBRE: string;
  TEMA: number;
}
@Component({
  selector: 'app-top-est-t',
  templateUrl: './top-est-t.component.html',
  styleUrls: ['./top-est-t.component.scss']
})
export class TopEstTComponent implements OnInit {
  displayedColumns: string[] = ['POS', 'ID_USUARIO', 'NOMBRE', 'TEMA'];
  estudiantes:Usuario[];
  constructor(private estserv:EstadisticaService) { }

  ngOnInit() {
    this.estserv.getEstadistica(4)
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
