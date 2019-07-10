import { Component, OnInit } from '@angular/core';
import { CienciaService } from '../services/ciencia.service';

export interface Ciencia{
  CIENCIA:string,
  CARRERA:string,
  FACULTAD:string
}

@Component({
  selector: 'app-ciencia-r',
  templateUrl: './ciencia-r.component.html',
  styleUrls: ['./ciencia-r.component.scss']
})
export class CienciaRComponent implements OnInit {
  ciencias:Ciencia[];
  constructor(private cieServ:CienciaService) { }

  ngOnInit() {
    this.cieServ.getCies()
    .subscribe(
      usrs=>{
        this.ciencias=usrs;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
