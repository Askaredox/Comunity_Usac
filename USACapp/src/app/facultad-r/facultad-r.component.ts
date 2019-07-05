import { Component, OnInit } from '@angular/core';
import { Facultad } from '../objects/facultad';
import { FacultadService } from '../services/facultad.service';

@Component({
  selector: 'app-facultad-r',
  templateUrl: './facultad-r.component.html',
  styleUrls: ['./facultad-r.component.scss']
})
export class FacultadRComponent implements OnInit {
  facultades:Facultad[];
  constructor(private facService:FacultadService) { }

  ngOnInit() {
    this.facService.getFacs()
    .subscribe(
      usrs=>{
        this.facultades=usrs;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
