import { Component, OnInit, Inject } from '@angular/core';
import { Tema } from '../objects/tema';
import { TemaService } from '../services/tema.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Usuario } from '../objects/usuario';
import { Router } from '@angular/router';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.scss']
})
export class TemaComponent implements OnInit {
  temas:Tema[]=Array<Tema>();
  user:Usuario;

  pageIndex:number = 0;
  pageSize:number = 5;
  lowValue:number = 0;
  highValue:number = 5;

  constructor(
    private router: Router,
    private temaService:TemaService,
    private _bottomSheet: MatBottomSheet,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.getFromLocal(0);
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    this.user=this.data[0];
    this.updateTemas();
    
  }
  updateTemas(){
    this.temaService.getAllTemas()
    .subscribe(
      usrs=>{
        this.temas=usrs;
        this.temas.forEach(dato=>{
          this.temaService.getResps(dato.ID_TEMA)
          .subscribe(data=>{
              dato.RESPS=new Array();
              if(data.length==undefined){
                let a:any=data;
                dato.RESPS[0]=a;
              }
              else{
                dato.RESPS=data;
              }
          },
          err=>{
            console.log(err);
          });
          this.temaService.getCiencias(dato.ID_TEMA)
          .subscribe(temcie=>{
            dato.CIENCIAS="";
            for(var i=0;i<temcie.length;i++){
              dato.CIENCIAS+=temcie[i].CIENCIA+",\n"
            }
          })
        });
      },
      err=>{
        console.log(err);
      }
    );
  }
  comment(tema:Tema){
    let new_resp={
      ID_TEMA:tema.ID_TEMA,
      ID_USUARIO:this.user.ID_USUARIO,
      TEXTO:tema.TEXTO
    };
    tema.TEXTO="";
    this.temaService.addResp(new_resp)
    .subscribe(
      val=>{},
      err=>{
        console.log(err);
      });
    this.updateTemas();
  }
  addTema(){
    const OwO=this._bottomSheet.open(NewTemaComponent);
    OwO.afterDismissed().subscribe(
      ()=>{
        this.updateTemas();
      }
    )
  }



  
  getPaginatorData(event){
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
      }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }   
      this.pageIndex = event.pageIndex;
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

export interface Facultad{
  ID_FACULTAD:number;
  NOMBRE:string;
  CARRERAS:Carrera[];
}
export interface Carrera{
  ID_CARRERA:number;
  NOMBRE:string;
  CIENCIAS:Ciencia[];
}
export interface Ciencia{
  ID_CIENCIA:number;
  NOMBRE:string;
}

@Component({
  selector: 'new-tema',
  templateUrl: 'new-tema.component.html',
})
export class NewTemaComponent implements OnInit{
  titulo:string;
  contenido:string;
  user:Usuario;
  facultades:Facultad[];
  facu:Facultad;
  ciencias:Ciencia[]=[];
  cien;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NewTemaComponent>,
    private temService:TemaService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {}
  ngOnInit(){
    this.temService.getF().subscribe(
      facs=>{
        this.facultades=facs;
        this.facultades.forEach(fac=>{
          fac.CARRERAS=[];
          this.temService.getCa(fac.ID_FACULTAD).subscribe(
            cars=>{
              fac.CARRERAS=cars;
              fac.CARRERAS.forEach(car=>{
                car.CIENCIAS=[];
                this.temService.getCi(car.ID_CARRERA).subscribe(
                  cies=>{
                    car.CIENCIAS=cies;
                  }
                );
              });
            }
          );
        });
      }
    );
  }
  agregar(){
    this.ciencias.push(this.cien);
  }
  submit(){
    if(this.titulo==undefined || this.titulo==""){
      alert("Coloque un titulo");
      return;
    }
    if(this.contenido==undefined || this.contenido==""){
      alert("Coloque un titulo");
      return;
    }
    this.getFromLocal(0);
    this.user=this.data[0];
    var new_tem={
      TITULO:this.titulo,
      ID_USUARIO:this.user.ID_USUARIO,
      CONTENIDO:this.contenido,
      HABILITADO:"Y"
    };
    this.temService.addTema(new_tem)
    .subscribe(
      va=>{
        this.ciencias.forEach(cien=>{
          let temcie={
            ID_TEMA:va.tmp,
            ID_CIENCIA:cien.ID_CIENCIA
          }
          console.log(temcie);
          this.temService.addCiencias(temcie).subscribe(
            val=>{}
          );
        })
      },
      error=>{console.log(error);}
    );
    this._bottomSheetRef.dismiss();
  }
  back(){
    this._bottomSheetRef.dismiss();
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