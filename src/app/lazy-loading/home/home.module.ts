import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ClientesComponent } from 'src/app/components/clientes/clientes.component';
import { MomentsComponent } from 'src/app/components/buscador/moments.component';
import { TablasComponent } from 'src/app/components/tablas/tablas.component';
import { ResumenClientesComponent } from 'src/app/components/filtro/resumen-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormOneComponent } from 'src/app/components/form-one/form-one.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ClientesComponent,
    MomentsComponent,
    TablasComponent,
    ResumenClientesComponent,
    FormOneComponent, 
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class HomeModule { }
