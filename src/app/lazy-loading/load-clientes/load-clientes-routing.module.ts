import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadClientsComponent } from 'src/app/components/load-clients/load-clients.component';

const routes: Routes = [
  {
    path: '',
    component: LoadClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadClientesRoutingModule { }
