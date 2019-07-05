import { Injectable } from '@angular/core';
import { Tema } from '../objects/tema';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../objects/respuesta';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http:HttpClient) { }

  addTema(new_tema){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/tema',new_tema,{headers});
  }
  getAllTemas():Observable<Tema[]>{
    return this.http.get<Tema[]>('http://192.168.1.7:3000/api/tema');
  }
  getTema(id:number):Observable<Tema>{
    return this.http.get<Tema>('http://192.168.1.7:3000/api/tema/'+id);
  }
  getResps(id:number):Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>('http://192.168.1.7:3000/api/respuesta/'+id);
  }
  addResp(new_resp){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/respuesta',new_resp,{headers});
  }
}
