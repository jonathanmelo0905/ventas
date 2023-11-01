import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadClientesRoutingModule } from './load-clientes-routing.module';
import { LoadClientsComponent } from 'src/app/components/load-clients/load-clients.component';


@NgModule({
  declarations: [
    LoadClientsComponent,
  ],
  imports: [
    CommonModule,
    LoadClientesRoutingModule
  ]
})
export class LoadClientesModule { }
