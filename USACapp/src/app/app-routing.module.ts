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
import { TeacherMainComponent } from './teacher-main/teacher-main.component';
import { TopCatRComponent } from './top-cat-r/top-cat-r.component';
import { TopEstRComponent } from './top-est-r/top-est-r.component';
import { TopCatTComponent } from './top-cat-t/top-cat-t.component';
import { TopEstTComponent } from './top-est-t/top-est-t.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { TExamComponent } from './texam/texam.component';
import { StExamComponent } from './st-exam/st-exam.component';
import { DoExamComponent } from './do-exam/do-exam.component';
import { CienciaCComponent } from './ciencia-c/ciencia-c.component';
import { CienciaRComponent } from './ciencia-r/ciencia-r.component';
import { TopCieRComponent } from './top-cie-r/top-cie-r.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin_main', component: AdminMainComponent, 
    children:[
      { path: '', component: TemaComponent },
      { path: 'tema', component: TemaComponent }, 
      { path: 'userC', component: UserCComponent},
      { path: 'userR', component: UserRComponent},
      { path: 'rolC', component: RolCComponent},
      { path: 'rolR', component: RolRComponent},
      { path: 'facultadC', component: FacultadCComponent},
      { path: 'facultadR', component: FacultadRComponent},
      { path: 'carreraC', component: CarreraCComponent},
      { path: 'carreraR', component: CarreraRComponent},
      { path: 'cienciaC', component: CienciaCComponent},
      { path: 'cienciaR', component: CienciaRComponent},
      { path: 'TopCatRes', component: TopCatRComponent},
      { path: 'TopEstRes', component: TopEstRComponent},
      { path: 'TopCatTema', component: TopCatTComponent},
      { path: 'TopEstTema', component: TopEstTComponent},
      { path: 'TopCieRes', component: TopCieRComponent},
    ]
  },
  { path: 'student_main', component: StudentMainComponent,
    children:[
      { path: '', component: TemaComponent }, 
      { path: 'tema', component: TemaComponent }, 
      { path: 'salaChat', component: SalaChatComponent },
      { path: "salaChat/:id", component: ChatearComponent },
      { path: "StExam", component: StExamComponent },
      { path: "doExam/:id", component: DoExamComponent },
    ]
  },
  { path: 'teacher_main', component: TeacherMainComponent,
    children:[
      { path: '', component: TemaComponent }, 
      { path: 'tema', component: TemaComponent }, 
      { path: 'salaChat', component: SalaChatComponent },
      { path: "salaChat/:id", component: ChatearComponent },
      { path: "TExam", component: TExamComponent },
      { path: "createExam/:id/:name", component: CreateExamComponent }
    ]
  },
  //{ path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
