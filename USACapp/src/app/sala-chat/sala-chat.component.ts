import { Component, OnInit, Inject } from '@angular/core';
import { SalaChat } from '../objects/sala-chat';
import { ChatService } from '../services/chat.service';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Usuario } from '../objects/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.scss']
})
export class SalaChatComponent implements OnInit {
  chats:SalaChat[];
  user:Usuario;
  codigo:string;
  constructor(
    private router: Router,
    private chatSer:ChatService,
    private usrSer:UsuarioService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.getFromLocal(0);
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    this.user=this.data[0];
    this.actualizar();
    
  }
  actualizar(){
    this.chatSer.getAllSalas(this.user.ID_USUARIO)
    .subscribe(data=>{
      this.chats=new Array();
      if(data.length==undefined){
        let a:any=data;
        this.chats[0]=a;
      }
      else{
        this.chats=data;
      }
    },
    err=>{})
  }

  find(){
    this.usrSer.getUser(+this.codigo)
    .subscribe(val=>{
      let sala={
        ID_USUARIO1:this.user.ID_USUARIO,
        ID_USUARIO2:val.ID_USUARIO,
        HABILITADO:"Y"
      }
      this.chatSer.addSala(sala)
      .subscribe(val=>{
        this.codigo="";
        this.actualizar();
      },
        err=>{
          console.log(err)
        })
    },
    err=>{
      alert("No existe dicho usuario")
    });
  }
  chatear(id_chat:number){
    console.log(id_chat);
    this.router.navigate(['/student_main/salaChat',id_chat])
  }


  public data:any=[]
  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }
  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);
  }
}
