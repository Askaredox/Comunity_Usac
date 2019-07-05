import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { UserCComponent } from './user-c/user-c.component';
import { RolCComponent } from './rol-c/rol-c.component';
import { UserRComponent } from './user-r/user-r.component';
import { FacultadCComponent } from './facultad-c/facultad-c.component';
import { FacultadRComponent } from './facultad-r/facultad-r.component';
import { RolRComponent } from './rol-r/rol-r.component';
import { CarreraCComponent } from './carrera-c/carrera-c.component';
import { CarreraRComponent } from './carrera-r/carrera-r.component';
import { StudentMainComponent } from './student-main/student-main.component';
import { TemaComponent } from './tema/tema.component';
import { SalaChatComponent } from './sala-chat/sala-chat.component';
import { ChatearComponent } from './chatear/chatear.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin_main', component: AdminMainComponent, 
    children:[
      { path: '', component: TemaComponent },
      { path: 'userC', component: UserCComponent},
      { path: 'userR', component: UserRComponent},
      { path: 'rolC', component: RolCComponent},
      { path: 'rolR', component: RolRComponent},
      { path: 'facultadC', component: FacultadCComponent},
      { path: 'facultadR', component: FacultadRComponent},
      { path: 'carreraC', component: CarreraCComponent},
      { path: 'carreraR', component: CarreraRComponent},
    ]
  },
  { path: 'student_main', component: StudentMainComponent,
    children:[
      { path: '', component: TemaComponent }, 
      { path: 'tema', component: TemaComponent }, 
      { path: 'salaChat', component: SalaChatComponent },
      { path: "salaChat/:id", component: ChatearComponent }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
