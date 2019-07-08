import { Component, OnInit, Inject } from '@angular/core';
import { RolService } from '../services/rol.service';
import { UsuarioService }from '../services/usuario.service';
import { Rol } from '../objects/rol';
import {Usuario} from '../objects/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router} from '@angular/router';

import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roles:Rol[];
  selected:number=1;
  user:number;
  userE:boolean=false;
  pass:string;
  passE:boolean=false;
  temporal:Usuario;

  constructor(
    private rolService:RolService,
    private usuarioService:UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.getRoles();
  }
  getRoles():void{
    this.rolService.getRols()
      .subscribe(
        data => {this.roles = data;},
        (err) => {console.error(err);}
      );
  }
  
  submit():void {
    this.userE=this.user==undefined;
    this.passE=this.pass==undefined;
    if(this.userE){
      this.openSnackBar("codigo de usuario requerido","continuar");
      return;
    }
    if(this.passE){
      this.openSnackBar("contraseña requerida","continuar");
      return;
    }
    this.usuarioService.login(this.user,this.pass,this.selected)
      .subscribe(usr =>{
        if(usr==undefined){
          window.alert("No se pudo logear");
        }
        else{
          //window.alert("Bienvenido "+usr.NOMBRE);
          if(usr.ID_ROL==1){
            this.saveInLocal(0,usr);
            this.router.navigate(['/admin_main']);
          }
          else if(usr.ID_ROL==2){
            this.saveInLocal(0,usr);
            this.router.navigate(['/student_main']);
          }
          else if(usr.ID_ROL==3){
            this.saveInLocal(0,usr);
            this.router.navigate(['/teacher_main']);
          }
        }
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
  public data:any=[]
  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }
  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);
  }
}