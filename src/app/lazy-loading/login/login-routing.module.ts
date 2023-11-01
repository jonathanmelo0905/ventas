import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UrlPages } from 'src/app/enums/rutas';
import { CreateAccountComponent } from 'src/app/session/create-account/create-account.component';
import { InicioComponent } from 'src/app/session/inicio/inicio.component';
import { LoginComponent } from 'src/app/session/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    
    children: [   
      { path: '', pathMatch: 'full', redirectTo: UrlPages.LOGIN_PADRE },
      {
        path: UrlPages.LOGIN,
        component: LoginComponent,
      },
      {
        path: UrlPages.REGISTRO,
        component: CreateAccountComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
