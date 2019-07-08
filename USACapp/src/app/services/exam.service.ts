import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../objects/ruta';
import { FooterRowOutlet } from '@angular/cdk/table';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http:HttpClient) { }

  getExams(id_usr:number):Observable<any[]|any>{
    return this.http.get<any[]>(url+'/api/examen/E&'+id_usr);
  }
  getPreg(id_exa:number):Observable<any[]|any>{
    return this.http.get<any[]>(url+'/api/examen/P&'+id_exa);
  }
  getRes(id_pre:number):Observable<any[]|any>{
    return this.http.get<any[]>(url+'/api/examen/R&'+id_pre);
  }
  addExam(exam):Observable<any>{
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/examen/E',exam,{headers});
  }
  addPreg(preg):Observable<any>{
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/examen/P',preg,{headers});
  }
  addResp(resp):Observable<any>{
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/examen/R',resp,{headers});
  }
  getExam(nombre:string):Observable<any>{
    return this.http.get<any>(url+'/api/exam/'+nombre);
  }
  setNota(nota){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/exam',nota,{headers});
  }
  getNotaS(id_usuario:number){
    return this.http.get<any>(url+'/api/nota/S&'+id_usuario);
  }
  getNotaT(id_exam:number){
    return this.http.get<any>(url+'/api/nota/T&'+id_exam);
  }
}
