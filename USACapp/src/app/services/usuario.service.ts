import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../objects/usuario';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  
  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usr')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  login(id:number,password:string,rol:number):Observable<Usuario>{
    return this.http.get<Usuario>('http://192.168.1.7:3000/api/usuario/'+id)
      .pipe(map(user => {
        if(user!=undefined){
          if(user.CONTRASENA==password && user.ID_ROL==rol){
            localStorage.setItem('usr',JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }
          else{
            console.log(user);
          }
        }
      }));
  }
  getUser(id:number):Observable<Usuario>{
    return this.http.get<Usuario>('http://192.168.1.7:3000/api/usuario/'+id);
  }
  asignar(id_usr:number,id_carrera:number){
    let new_asg={
      ID_USUARIO:id_usr,
      ID_CARRERA:id_carrera
    }
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/asignar',new_asg,{headers});
  }
  addUser(new_user:Usuario){
    let headers= new HttpHeaders().set( "Content-Type" , "application/json" );
    return this.http.post('http://192.168.1.7:3000/api/usuario',new_user,{headers});
  }
  getAllUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://192.168.1.7:3000/api/usuario');
  }
  logout() {
    localStorage.removeItem('usr');
    this.currentUserSubject.next(null);
  }
}
