import { Component, OnInit, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { Usuario } from '../objects/usuario';

@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.scss']
})
export class TeacherMainComponent implements OnInit {
  user:Usuario;
  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    
    this.getFromLocal(0);
    console.log(this.data[0]);
    if(this.data[0]==null){
      this.router.navigate(['/login']);
      return;
    }
    else{
      this.user=this.data[0];
      if(this.user.ID_ROL!=3){
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
