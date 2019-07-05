import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../services/carrera.service';
import { Carfac } from '../objects/carfac';

@Component({
  selector: 'carreraR',
  templateUrl: './carrera-r.component.html',
  styleUrls: ['./carrera-r.component.scss']
})
export class CarreraRComponent implements OnInit {
  carfacs:Carfac[];
  constructor(private carfacService:CarreraService) { }

  ngOnInit() {
    this.carfacService.getCarfs()
    .subscribe(
      usrs=>{
        this.carfacs=usrs;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
