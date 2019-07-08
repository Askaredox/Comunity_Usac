import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaChat } from '../objects/sala-chat';
import { Mensaje } from '../objects/mensaje';
import { url } from '../objects/ruta';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http:HttpClient) { }

  getAllSalas(id_usr:number):Observable<SalaChat[]>{
    return this.http.get<SalaChat[]>(url+'/api/chat/'+id_usr);
  }
  addSala(sala){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/chat',sala,{headers});
  }
  getMens(id_chat):Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>(url+'/api/mensajes/'+id_chat);
  }
  addMen(new_men){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/mensajes',new_men,{headers});
  }
}
