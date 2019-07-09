import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../objects/usuario';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ExamService } from '../services/exam.service';

export interface Respuesta{
  TEXTO:string;
  CORRECTA:boolean;
}

export interface Pregunta{
  ID_PREGUNTA:number;
  TEXTO:string;
  TIPO:string;
  RESPUESTA:Respuesta[];
  temp:string;
}

@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.scss']
})
export class DoExamComponent implements OnInit {
  id_exam:number;
  user:Usuario;
  preguntas:Pregunta[]=new Array<Pregunta>();
  timeLeft:number=0;
  timeM:number=0;
  timeS:number=0;
  interval;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private examServ:ExamService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.id_exam=this.route.snapshot.params.id;
    this.getFromLocal(0);
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    else{
      this.user=this.data[0];
      if(this.user.ID_ROL!=2){
        this.saveInLocal(0,null);
        this.router.navigate(['/login']);
        return;
      }
    }

    this.examServ.getExamI(this.id_exam)
    .subscribe(val=>{
      this.timeLeft=val.TIEMPO;
      this.timeM = this.timeLeft/60-.5;
      this.timeS = this.timeLeft%60;
      alert("cuenta con "+this.timeM.toFixed(0)+":"+('0'+this.timeS).slice(-2)+" minutos para hacer el examen");
    })
    this.startTimer();

    this.getPreguntas();
  }
  getPreguntas(){
    this.examServ.getPreg(this.id_exam)
    .subscribe(pregs=>{
      this.preguntas=pregs;
      this.preguntas.forEach(preg=>{
        preg.RESPUESTA=new Array<Respuesta>();
        preg.temp=preg.TIPO=='T'?"":"NA";
        this.examServ.getRes(preg.ID_PREGUNTA)
        .subscribe(resps=>{
          preg.RESPUESTA=resps;
        });
      });
    });
  }
  show(){
    let correctas:number=0;
    let total:number=0;
    this.preguntas.forEach(preg=>{
      if(preg.TIPO=='T')
        correctas+=((preg.temp==preg.RESPUESTA[0].TEXTO)?1:0);
      else
        correctas+=(preg.temp=='Y'?1:0)
    });
    total=(correctas/this.preguntas.length)*100;
    
    
    let nota={
      ID_USUARIO:this.user.ID_USUARIO,
      ID_EXAMEN:this.id_exam,
      NOTA:total
    }
    this.examServ.setNota(nota)
    .subscribe(v=>{
      alert("Su nota fue de: "+total.toFixed(2));
      this.router.navigate(['student_main/StExam']);
    },
      error=>{console.log(error);this.router.navigate(['student_main/StExam']);});
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.timeM = this.timeLeft/60-.5;
        this.timeS = this.timeLeft%60;
        
      } else {
        clearInterval(this.interval);
        this.show();
      }
    },1000)
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
