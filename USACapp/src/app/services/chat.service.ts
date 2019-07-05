import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaChat } from '../objects/sala-chat';
import { Mensaje } from '../objects/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getAllSalas(id_usr:number):Observable<SalaChat[]>{
    return this.http.get<SalaChat[]>('http://192.168.1.7:3000/api/chat/'+id_usr);
  }
  addSala(sala){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/chat',sala,{headers});
  }
  getMens(id_chat):Observable<Mensaje[]>{
    return this.http.get<Mensaje[]>('http://192.168.1.7:3000/api/mensajes/'+id_chat);
  }
  addMen(new_men){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/mensajes',new_men,{headers});
  }
}
