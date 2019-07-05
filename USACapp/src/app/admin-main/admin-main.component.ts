import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Usuario } from '../objects/usuario';

@Component({
  selector: 'admin_main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  user:Usuario;

  constructor(
    private http:HttpClient,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }
  ngOnInit() {
    this.getFromLocal(0)
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    else{
      this.user=this.data[0];
      if(this.user.ID_ROL!=1){
        this.saveInLocal(0,null);
        this.router.navigate(['/login']);
        return;
      }
    }
  }
  
  logout(){
    this.saveInLocal(0,null);
    this.router.navigate(['/login']);
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
