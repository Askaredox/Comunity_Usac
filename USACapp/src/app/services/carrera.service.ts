import { Injectable } from '@angular/core';
import { Carrera } from '../objects/carrera';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Carfac } from '../objects/carfac';
import { url } from '../objects/ruta';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  constructor(private http:HttpClient) { }

  getCarfs():Observable<Carfac[]>{
    return this.http.get<Carfac[]>(url+'/api/carfacs');
  }
  addCar(new_car:Carrera){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post(url+'/api/carrera',new_car,{headers});
  }
  getCars():Observable<Carrera[]>{
    return this.http.get<Carrera[]>(url+'/api/carrera');
  }
}
