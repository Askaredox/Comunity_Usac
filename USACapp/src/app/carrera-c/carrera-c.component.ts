import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from '../objects/usuario';
import { Facultad } from '../objects/facultad';
import { Router } from '@angular/router';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Carrera } from '../objects/carrera';

@Component({
  selector: 'carreraC',
  templateUrl: './carrera-c.component.html',
  styleUrls: ['./carrera-c.component.scss']
})
export class CarreraCComponent implements OnInit {
  user:Usuario;
  nombre:string;
  id_facultad:number;
  facultades:Facultad[];

  constructor(
    private router: Router,
    private carreraService:CarreraService,
    private facService:FacultadService,
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
    this.getFacs();
  }
  getFacs():void{
    this.facService.getFacs()
      .subscribe(
        data => {this.facultades = data;},
        (err) => {console.error(err);}
      );
  }
  onSubmit(){
    let nom=this.nombre==undefined;
    let idR=this.id_facultad==undefined;
    if(nom){
      this.openSnackBar("Nombre de Carrera requerida","continuar");
      return;
    }
    if(idR){
      this.openSnackBar("Facultad para la carrera requerida","continuar");
      return;
    }
    var new_car:Carrera={
      ID_CARRERA:null,
      NOMBRE:this.nombre,
      ID_FACULTAD:this.id_facultad
    };
    console.log(new_car);
    this.carreraService.addCar(new_car)
    .subscribe(
      data =>{
        alert("Carrera "+this.nombre+" creada exitosamente");
      },
      error =>{
        alert("Carrera no creada");
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
