import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../objects/ruta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CienciaService {

  constructor(private http:HttpClient) { }
  
  addCie(new_cie){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/ciencia',new_cie,{headers});
  }
  getCies():Observable<any[]>{
    return this.http.get<any[]>(url+'/api/ciencia');
  }
}
