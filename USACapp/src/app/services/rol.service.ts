import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../objects/rol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http:HttpClient) {}

  getRols():Observable<Rol[]>{
    return this.http.get<Rol[]>('http://192.168.1.7:3000/api/rol');
  }
  addRol(new_rol:Rol){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/rol',new_rol,{headers});
  }
}

