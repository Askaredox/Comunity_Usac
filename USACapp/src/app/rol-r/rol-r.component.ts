import { Component, OnInit } from '@angular/core';
import { RolService } from '../services/rol.service';
import { Rol } from '../objects/rol';

@Component({
  selector: 'app-rol-r',
  templateUrl: './rol-r.component.html',
  styleUrls: ['./rol-r.component.scss']
})
export class RolRComponent implements OnInit {
  roles:Rol[];
  constructor(private rolService:RolService) { }

  ngOnInit() {
    this.rolService.getRols()
    .subscribe(
      usrs=>{
        this.roles=usrs;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
