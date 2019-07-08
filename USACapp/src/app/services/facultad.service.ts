import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facultad } from '../objects/facultad';
import { url } from '../objects/ruta';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  constructor(private http:HttpClient) { }

  getFacs():Observable<Facultad[]>{
    return this.http.get<Facultad[]>(url+'/api/facultad');
  }
  addFac(new_fac:Facultad){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/facultad',new_fac,{headers});
  }
}
