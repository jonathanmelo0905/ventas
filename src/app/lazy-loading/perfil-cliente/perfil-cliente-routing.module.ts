import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescripcionComponent } from 'src/app/components/descripcion/descripcion.component';

const routes: Routes = [
  {
    path: '',
    component: DescripcionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilClienteRoutingModule { }
