import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Usuario } from '../objects/usuario';
import { UsuarioService }from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from '../services/rol.service';
import { Rol } from '../objects/rol';
import { Carrera } from '../objects/carrera';
import { CarreraService } from '../services/carrera.service';
import { Selec } from '../objects/selec';

@Component({
  selector: 'userC',
  templateUrl: './user-c.component.html',
  styleUrls: ['./user-c.component.scss']
})


export class UserCComponent implements OnInit {
  user:Usuario;
  id_usuario:number;
  nombre:string;
  id_rol:number;
  contrasena:string;
  contrasena2:string;
  roles:Rol[];
  carreras:Carrera[];
  selected:Selec[]=[];

  constructor(
    private router: Router,
    private usuarioService:UsuarioService,
    private rolService:RolService,
    private _snackBar: MatSnackBar,
    private carService:CarreraService,
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
    this.getRoles();
    this.getCars();
  }
  getRoles():void{
    this.rolService.getRols()
      .subscribe(
        data => {this.roles = data;},
        (err) => {console.error(err);}
      );
  }
  getCars():void{
    this.carService.getCars()
      .subscribe(
        data => {
          this.carreras = data;
          this.carreras.forEach(value=>this.foo(value));
        },
        (err) => {console.error(err);}
      );
  }
  foo(value:Carrera){
    this.selected.push(new Selec(value.ID_CARRERA,false));
  }

  onSubmit(){
    let idU=this.id_usuario==undefined;
    let nom=this.nombre==undefined;
    let pass1=this.contrasena==undefined;
    let pass2=this.contrasena2==undefined;
    let idR=this.id_rol==undefined;
    //let paim=this.path_img==undefined;
    if(idU){
      this.openSnackBar("Codigo de usuario requerido","continuar");
      return;
    }
    if(nom){
      this.openSnackBar("Nombre de usuario requerido","continuar");
      return;
    }
    if(pass1 || pass2){
      this.openSnackBar("Contraseñas de usuario requeridas","continuar");
      return;
    }
    if(pass1!=pass2){
      this.openSnackBar("Contraseñas deben ser iguales","continuar");
      return;
    }
    if(idR){
      this.openSnackBar("Rol de usuario requerido","continuar");
      return;
    }
    let new_user={
      ID_USUARIO:this.id_usuario,
      NOMBRE:this.nombre,
      CONTRASENA:this.contrasena,
      ID_ROL:this.id_rol,
      PATH_IMG:null
    };
    console.log(new_user);
    this.usuarioService.addUser(new_user)
    .subscribe(
      data =>{
        this.selected.forEach(
          value=>this.asignar(this.id_usuario,value)
        );
        alert("usuario "+this.nombre+" creado exitosamente");
      },
      error =>{
        alert("usuario no creado");
      }
    );

  }
  asignar(id_usuario:number,valor:Selec){
    if(valor.checked){
      this.usuarioService.asignar(id_usuario,valor.id_carrera);
    }
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
