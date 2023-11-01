import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { InicioComponent } from 'src/app/session/inicio/inicio.component';
import { LoginComponent } from 'src/app/session/login/login.component';
import { CreateAccountComponent } from 'src/app/session/create-account/create-account.component';


@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
    CreateAccountComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
