import { Component, OnInit } from '@angular/core';
import { Usuario } from '../objects/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'userR',
  templateUrl: './user-r.component.html',
  styleUrls: ['./user-r.component.scss']
})
export class UserRComponent implements OnInit {
  usuarios:Usuario[];
  constructor(
    private usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.getAllUsers()
    .subscribe(
      usrs=>{
        this.usuarios=usrs;
      },
      err=>{
        console.log(err);
      }
    );
  }
}
