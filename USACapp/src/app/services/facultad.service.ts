import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facultad } from '../objects/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  constructor(private http:HttpClient) { }

  getFacs():Observable<Facultad[]>{
    return this.http.get<Facultad[]>('http://192.168.1.7:3000/api/facultad');
  }
  addFac(new_fac:Facultad){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/facultad',new_fac,{headers});
  }
}
