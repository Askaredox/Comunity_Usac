import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent} from './login/login.component';
import { MaterialModule } from '../material-module';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { HeaderComponent } from './header/header.component';
import { StorageServiceModule} from 'angular-webstorage-service';
import { UserCComponent } from './user-c/user-c.component';
import { RolCComponent } from './rol-c/rol-c.component';
import { UserRComponent } from './user-r/user-r.component';
import { FacultadCComponent } from './facultad-c/facultad-c.component';
import { FacultadRComponent } from './facultad-r/facultad-r.component';
import { RolRComponent } from './rol-r/rol-r.component';
import { CarreraCComponent } from './carrera-c/carrera-c.component';
import { CarreraRComponent } from './carrera-r/carrera-r.component';
import { StudentMainComponent } from './student-main/student-main.component';
import { TemaComponent, NewTemaComponent } from './tema/tema.component';
import { SalaChatComponent } from './sala-chat/sala-chat.component';
import { ChatearComponent } from './chatear/chatear.component';
import { MensajeriaService } from './services/mensajeria.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminMainComponent,
    HeaderComponent,
    UserCComponent,
    RolCComponent,
    UserRComponent,
    FacultadCComponent,
    FacultadRComponent,
    RolRComponent,
    CarreraCComponent,
    CarreraRComponent,
    StudentMainComponent,
    TemaComponent,
    NewTemaComponent,
    SalaChatComponent,
    ChatearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  exports:[
    MaterialModule
  ],
  entryComponents:[
    NewTemaComponent
  ],
  providers: [MensajeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
