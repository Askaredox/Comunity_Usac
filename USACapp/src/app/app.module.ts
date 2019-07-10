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
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import { TopCatRComponent } from './top-cat-r/top-cat-r.component';
import { TopEstRComponent } from './top-est-r/top-est-r.component';
import { TopEstTComponent } from './top-est-t/top-est-t.component';
import { TopCatTComponent } from './top-cat-t/top-cat-t.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { TExamComponent,NewExamComponent } from './texam/texam.component';
import { StExamComponent } from './st-exam/st-exam.component';
import { DoExamComponent } from './do-exam/do-exam.component';
import { CienciaCComponent } from './ciencia-c/ciencia-c.component';
import { CienciaRComponent } from './ciencia-r/ciencia-r.component';
import { TopCieRComponent } from './top-cie-r/top-cie-r.component';

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
    ChatearComponent,
    TeacherMainComponent,
    TopCatRComponent,
    TopEstRComponent,
    TopEstTComponent,
    TopCatTComponent,
    CreateExamComponent,
    TExamComponent,
    NewExamComponent,
    StExamComponent,
    DoExamComponent,
    CienciaCComponent,
    CienciaRComponent,
    TopCieRComponent
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
    NewTemaComponent,
    NewExamComponent
  ],
  providers: [MensajeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
