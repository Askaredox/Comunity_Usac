import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Mensaje } from '../objects/mensaje';
import { Observable } from 'rxjs';

export enum IOEventName{
  mensajes="mensajes"
}

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {
  private url = 'http://192.168.1.7:3000';
  private socket:io.Socket;
  
  constructor() {  }
  public initSocket(id_room:number,id_usr:number){
    this.socket = io(this.url);
    this.socket.emit('joinRoom', id_room, id_usr)
  }
  public onEvent<T>(event:IOEventName):Observable<T[]>{
    return new Observable<T[]>(observer=>{
      this.socket.on(event,(data:T[])=>observer.next(data));
    })
  }

  public sendMensaje(mensaje:any){
    this.socket.emit('mensaje', mensaje)
  }


  public destroy() {
    if (this.socket) {
        this.socket.removeAllListeners();
        this.socket.close();
        this.socket = undefined;
    }
  }
}
