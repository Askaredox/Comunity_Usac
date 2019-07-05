import { Injectable } from '@angular/core';
import { Carrera } from '../objects/carrera';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Carfac } from '../objects/carfac';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http:HttpClient) { }

  getCarfs():Observable<Carfac[]>{
    return this.http.get<Carfac[]>('http://192.168.1.7:3000/api/carfacs');
  }
  addCar(new_car:Carrera){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/carrera',new_car,{headers});
  }
  getCars():Observable<Carrera[]>{
    return this.http.get<Carrera[]>('http://192.168.1.7:3000/api/carrera');
  }
}
