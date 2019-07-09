import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../services/exam.service';

export interface Respuesta{
  TEXTO:string;
  CORRECTA:boolean;
}

export interface Pregunta{
  TEXTO:string;
  TIPO:string;
  RESPUESTA:Respuesta[];
  temp:string;
}

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  id_usr:number;
  timem:number=1;
  times:number=0;
  
  name:string;
  preg:number;
  texto:string;
  preguntas:Pregunta[]=new Array<Pregunta>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examServ: ExamService
  ) { }

  ngOnInit() {
    this.id_usr=this.route.snapshot.params.id;
    this.name=this.route.snapshot.params.name;
    this.preg=1;
  }


  add(tipo:number,text:string){
    if(tipo==1){
      let e:Pregunta={
        TEXTO:text,
        TIPO:"Texto",
        RESPUESTA:new Array<Respuesta>(),
        temp:""
      }
      this.preguntas.push(e);
    }
    else if(tipo==2){
      this.preguntas.push({
        TEXTO:text,
        TIPO:"Repuesta multiple",
        RESPUESTA:new Array<Respuesta>(),
        temp:""
      });
    }
    else if(tipo==3){
      let e:Pregunta={
        TEXTO:text,
        TIPO:"V|F",
        RESPUESTA:new Array<Respuesta>(),
        temp:""
      }
      let r1:Respuesta={
        TEXTO:"Verdadero",
        CORRECTA:false
      };
      let r2:Respuesta={
        TEXTO:"Falso",
        CORRECTA:false
      };
      e.RESPUESTA.push(r1);
      e.RESPUESTA.push(r2);
      this.preguntas.push(e);
    }
    this.texto="";
  }
  addR(pregunta:Pregunta){
    if(pregunta.TIPO=='Texto')
      pregunta.RESPUESTA.push({TEXTO:pregunta.temp,CORRECTA:true});
    else
      pregunta.RESPUESTA.push({TEXTO:pregunta.temp,CORRECTA:false});
    pregunta.temp="";
  }
  addExam(){
    let num:number;
    var new_exam={
      NOMBRE:this.name,
      ID_USUARIO:this.id_usr,
    };
    this.examServ.addExam(new_exam)
    .subscribe(val=>{
      num=val.tmp;
      this.preguntas.forEach(pregunta=>{
        let num_preg:number;
        let p={
          ID_EXAMEN:num,
          TIPO:pregunta.TIPO=='Texto'?"T":(pregunta.TIPO=='V|F'?'V':'O'),
          TEXTO:pregunta.TEXTO,
          TIEMPO:(this.timem*60+this.times)
        }
        console.log('3:'+p)
        this.examServ.addPreg(p)
        .subscribe(
          ret=>{
            num_preg=ret.tmp;
            pregunta.RESPUESTA.forEach(respuesta=>{
              let r={
                ID_PREGUNTA:num_preg,
                CORRECTA:respuesta.CORRECTA?'Y':'N',
                TEXTO:respuesta.TEXTO
              }
              this.examServ.addResp(r)
              .subscribe(val=>{},
                error=>{
                  alert(error);;
                }
              );
            });
          },
          error=>{
            alert(error);
          }
        );
      });
      alert("Se creo Exitosamente el Examen: '"+name+"'");
      this.router.navigate(['teacher_main/TExam']);
    },
    error=>{
      alert("No se pudo crear el examen");
      console.log(error)
      this.router.navigate(['teacher_main/TExam']);
      return;
    });
    
  }
}
