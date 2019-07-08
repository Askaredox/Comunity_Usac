import { Injectable } from '@angular/core';
import { url } from '../objects/ruta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  constructor(private http:HttpClient) { }

  getEstadistica(id_estadistica:number):Observable<any|any[]>{
    return this.http.get<any[]>(url+'/api/estadistica/'+id_estadistica);
  }
}
