import { Injectable } from '@angular/core';
import { Tema } from '../objects/tema';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../objects/respuesta';
import { url } from '../objects/ruta';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  constructor(private http:HttpClient) { }

  addTema(new_tema):Observable<any>{
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/tema',new_tema,{headers});
  }
  getAllTemas():Observable<Tema[]>{
    return this.http.get<Tema[]>(url+'/api/tema');
  }
  getTema(id:number):Observable<Tema>{
    return this.http.get<Tema>(url+'/api/tema/'+id);
  }
  getResps(id:number):Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(url+'/api/comentario/'+id);
  }
  addResp(new_resp){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/comentario',new_resp,{headers});
  }
  getCiencias(id_tema:number):Observable<any[]>{
    return this.http.get<any[]>(url+'/api/temcie/'+id_tema);
  }
  addCiencias(temcie):Observable<any>{
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/temcie',temcie,{headers});
  }
  getF(){
    return this.http.get<any[]>(url+'/api/FCC/F');
  }
  getCa(id:number){
    return this.http.get<any[]>(url+'/api/FCC/A&'+id);
  }
  getCi(id:number){
    return this.http.get<any[]>(url+'/api/FCC/I&'+id);
  }
}
