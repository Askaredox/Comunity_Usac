import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CienciaService } from '../services/ciencia.service';
import { CarreraService } from '../services/carrera.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Usuario } from '../objects/usuario';

export interface Carrera{
  ID_CARRERA:number,
  ID_FACULTAD:number,
  NOMBRE:string,
}

@Component({
  selector: 'app-ciencia-c',
  templateUrl: './ciencia-c.component.html',
  styleUrls: ['./ciencia-c.component.scss']
})
export class CienciaCComponent implements OnInit {
  user:Usuario;
  nombre:string;
  id_carrera:number;
  carreras:Carrera[];
  
  constructor(
    private router: Router,
    private cieService:CienciaService,
    private carService:CarreraService,
    private _snackBar: MatSnackBar,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.getFromLocal(0);
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
    this.getCarr();
  }

  getCarr(){
    this.carService.getCars()
      .subscribe(
        data => {this.carreras = data;},
        (err) => {console.error(err);}
      );
  }


  onSubmit(){
    let nom=this.nombre==undefined;
    let idR=this.id_carrera==undefined;
    if(nom){
      this.openSnackBar("Nombre de Ciencia requerida","continuar");
      return;
    }
    if(idR){
      this.openSnackBar("Carrera para la ciencia requerida","continuar");
      return;
    }
    var new_cie={
      NOMBRE:this.nombre,
      ID_CARRERA:this.id_carrera
    };
    console.log(new_cie);
    this.cieService.addCie(new_cie)
    .subscribe(
      data =>{
        alert("Ciencia "+this.nombre+" creada exitosamente");
      },
      error =>{
        alert("Ciencia no creada");
        console.log(error);
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
