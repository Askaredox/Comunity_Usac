import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from '../objects/usuario';
import { Router } from '@angular/router';
import { FacultadService } from '../services/facultad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'FacultadC',
  templateUrl: './facultad-c.component.html',
  styleUrls: ['./facultad-c.component.scss']
})
export class FacultadCComponent implements OnInit {
  user:Usuario;
  nombre:string;
  descripcion:string="";

  constructor(
    private router: Router,
    private facService: FacultadService,
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
      this.openSnackBar("Nombre de facultad requerido","continuar");
      return;
    }
    let new_fac={
      NOMBRE:this.nombre,
      DESCRIPCION:this.descripcion,
      ID_FACULTAD:null
    };
    this.facService.addFac(new_fac);
    this.facService.addFac(new_fac)
    .subscribe(
      data =>{
        alert("Facultad "+this.nombre+" creada exitosamente");
      },
      error =>{
        alert("Facultad no creada");
      }
    );;
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
