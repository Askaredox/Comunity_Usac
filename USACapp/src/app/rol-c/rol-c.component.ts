import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from '../objects/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { RolService } from '../services/rol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'rolC',
  templateUrl: './rol-c.component.html',
  styleUrls: ['./rol-c.component.scss']
})
export class RolCComponent implements OnInit {
  user:Usuario;
  nombre:string;
  descripcion:string="";
  
  constructor(
    private router: Router,
    private usuarioService:UsuarioService,
    private rolService:RolService,
    private _snackBar: MatSnackBar,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.getFromLocal(0)
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    else{
      this.user=this.data[0];
      if(this.user.ID_ROL!=1){
        this.saveInLocal(0,null);
        this.router.navigate(['/login']);
        return;
      }
    }
  }

  onSubmit(){
    let nom=this.nombre==undefined;
    if(nom){
      this.openSnackBar("Nombre de usuario requerido","continuar");
      return;
    }
    let new_rol={
      NOMBRE:this.nombre,
      DESCRIPCION:this.descripcion,
      ID_ROL:null
    };
    this.rolService.addRol(new_rol)
    .subscribe(
      data =>{
        alert("Rol "+this.nombre+" creado exitosamente");
      },
      error =>{
        alert("Rol no creado");
      }
    );
  }



  public data:any=[]
  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }
  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
