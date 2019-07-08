import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from '../objects/rol';
import { url } from '../objects/ruta';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http:HttpClient) {}

  getRols():Observable<Rol[]>{
    return this.http.get<Rol[]>(url+'/api/rol');
  }
  addRol(new_rol:Rol){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/rol',new_rol,{headers});
  }
}

