import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilClienteRoutingModule } from './perfil-cliente-routing.module';
import { DescripcionComponent } from 'src/app/components/descripcion/descripcion.component';
import { TargetClientComponent } from 'src/app/components/card-cliente/target-client.component';
import { FormTwoComponent } from 'src/app/components/form-two/form-two.component';
import { SummaryStepsComponent } from 'src/app/components/summary-steps/summary-steps.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StarsComponent } from 'src/app/components/stars/stars.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DescripcionComponent,
    TargetClientComponent,
    FormTwoComponent,
    SummaryStepsComponent,
    StarsComponent,
  ],
  imports: [
    CommonModule,
    PerfilClienteRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ]
})
export class PerfilClienteModule { }
