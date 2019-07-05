import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Usuario } from '../objects/usuario';
import { ChatService } from '../services/chat.service';
import { SalaChat } from '../objects/sala-chat';
import { Mensaje } from '../objects/mensaje';
import { MensajeriaService,IOEventName } from '../services/mensajeria.service';

@Component({
  selector: 'app-chatear',
  templateUrl: './chatear.component.html',
  styleUrls: ['./chatear.component.scss']
})
export class ChatearComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  id_n:number;
  user:Usuario;
  mens:Mensaje[]=new Array();
  mensaje:string;
  prueba:any[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatSer:ChatService,
    private mensServ:MensajeriaService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
    ) { }

  ngOnInit() {
    this.id_n=this.route.snapshot.params.id
    this.getFromLocal(0);
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    this.user=this.data[0];
    
    this.chatSer.getAllSalas(this.user.ID_USUARIO)
    .subscribe(data=>{
      let chats:SalaChat[];
      chats=new Array();
      if(data.length==undefined){
        let a:any=data;
        chats[0]=a;
        if(a.ID_CHAT!=this.id_n)
          this.router.navigate(['/student_main/salaChat']);
      }
      else{
        chats=data;
        let t=true;
        chats.forEach(valor=>{
          if(valor.ID_CHAT==this.id_n){
            t=false;
          }
        })
        if(t)
          this.router.navigate(['/student_main/salaChat']);
      }
    },
    err=>{});
    this.mensServ.initSocket(this.id_n,this.user.ID_USUARIO);
    this.mensServ.onEvent<any>(IOEventName.mensajes)
    .subscribe(
      val=>{
        this.mens=new Array();
        if(val.length==undefined){
          let a:any=val;
          this.mens[0]=a;
        }
        else{
          this.mens=val;
        }
        this.mens.forEach(valor=>{
          if(this.user.ID_USUARIO==valor.ID_USUARIO)
            valor.estilo="chat2"
          else
            valor.estilo="chat1"
        });
      }
    )
  }
  send(){
    let men={
      ID_CHAT:this.id_n,
      ID_USUARIO:this.user.ID_USUARIO,
      TEXTO:this.mensaje
    }
    console.log(men);
    this.mensServ.sendMensaje(men)
    this.mensaje="";
    this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  public data:any=[]
  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }
  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);
  }
  Mensajes(){
    /*
    this.chatSer.getMens(this.id_n)
    .subscribe(
      val=>{
        this.mens=new Array();
        if(val.length==undefined){
          let a:any=val;
          this.mens[0]=a;
        }
        else{
          this.mens=val;
        }
        this.mens.forEach(valor=>{
          if(this.user.ID_USUARIO==valor.ID_USUARIO){
            console.log("chatuno");
            valor.estilo="chat2"
          }
          else{
            console.log("chados");
            valor.estilo="chat1"
          }
        });
      },
      err=>{
        console.log(err);
      }
    );
    */
  }
}
