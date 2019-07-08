import { Component, OnInit, Inject } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { Router } from '@angular/router';
import { Usuario } from '../objects/usuario';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

export interface Nota{
  NOMBRE:string,
  FECHA:string,
  NOTA:number,
}

@Component({
  selector: 'app-st-exam',
  templateUrl: './st-exam.component.html',
  styleUrls: ['./st-exam.component.scss']
})
export class StExamComponent implements OnInit {
  room:string;
  user:Usuario;
  notas:Nota[];
  constructor(
    private examServ:ExamService,
    private router: Router,
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
      if(this.user.ID_ROL!=2){
        this.saveInLocal(0,null);
        this.router.navigate(['/login']);
        return;
      }
    }
    this.examServ.getNotaS(this.user.ID_USUARIO)
    .subscribe(val=>{
      this.notas=val;
    })
  }

  find(){
    this.examServ.getExam(this.room)
    .subscribe(val=>{
      if(val!=undefined){
        console.log(val);
        this.router.navigate(['student_main/doExam',val.ID_EXAMEN])
      }
      else
        alert("No hay Examen con ese nombre");
    })
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
