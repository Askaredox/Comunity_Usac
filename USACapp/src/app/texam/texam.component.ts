import { Component, OnInit, Inject } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Usuario } from '../objects/usuario';

export interface Examen{
  ID_EXAMEN:number;
  ID_USUARIO:string;
  NOMBRE:string;
  FECHA:string;
  PREGUNTAS:Pregunta[];
}
export interface Pregunta{
  ID_PREGUNTA:number;
  ID_EXAMEN:number;
  TIPO:string;
  TEXTO:string;
  RESPUESTA:Respuesta[];
}
export interface Respuesta{
  ID_RESPUESTA:number;
  ID_PREGUNTA:number;
  CORRECTA:string;
  TEXTO:string;
}

@Component({
  selector: 'app-texam',
  templateUrl: './texam.component.html',
  styleUrls: ['./texam.component.scss']
})
export class TExamComponent implements OnInit {
  user:Usuario;
  examenes:Examen[]=Array<Examen>();

  pageIndex:number = 0;
  pageSize:number = 5;
  lowValue:number = 0;
  highValue:number = 5;
  
  constructor(
    private examServ:ExamService,
    private router: Router,
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
    this.updateExam();
  }
  updateExam(){
    this.examServ.getExams(this.user.ID_USUARIO)
    .subscribe(
      data=>{
        this.examenes=Array<Examen>();
        if(!data.length){
          this.examenes[0]=data;
          this.examenes[0].PREGUNTAS=Array<Pregunta>();
        }
        else{
          this.examenes=data;
          for(var i=0;i<this.examenes.length;i++)
            this.examenes[i].PREGUNTAS=Array<Pregunta>();
        }
      }
    )
  }



  pregunta(exam:number,i:number){

    this.examServ.getPreg(exam)
    .subscribe(
      data=>{
        if(!data.length){
          this.examenes[i].PREGUNTAS[0]=data;
          this.examenes[i].PREGUNTAS.forEach(element => {
            if(element.TIPO=='T')
              element.TIPO="TEXTO";
            else if(element.TIPO=='O')
              element.TIPO="OPCION MULTIPLE";
            else if(element.TIPO=='V')
              element.TIPO="VERDADERO | FALSO";
          });
        }
        else{
          this.examenes[i].PREGUNTAS=data;
          this.examenes[i].PREGUNTAS.forEach(element => {
            if(element.TIPO=='T')
              element.TIPO="TEXTO";
            else if(element.TIPO=='O')
              element.TIPO="OPCION MULTIPLE";
            else if(element.TIPO=='V')
              element.TIPO="VERDADERO | FALSO";
          });
        }
      }
    )
  }
  addPregunta(){
    const OwO=this._bottomSheet.open(NewExamComponent);
    OwO.afterDismissed().subscribe(
      (sd)=>{
        this.router.navigate(['teacher_main/createExam',sd.ID_USUARIO,sd.NOMBRE]);
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




@Component({
  selector: 'new-exam',
  templateUrl: 'new-exam.component.html',
})
export class NewExamComponent {
  nombre:string;
  user:Usuario;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NewExamComponent>,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) {}

  submit(){
    if(this.nombre==undefined || this.nombre==""){
      alert("Coloque un titulo");
      return;
    }
    this.getFromLocal(0);
    this.user=this.data[0];
    var new_exam={
      NOMBRE:this.nombre,
      ID_USUARIO:this.user.ID_USUARIO,
    };
    this._bottomSheetRef.dismiss(new_exam);
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