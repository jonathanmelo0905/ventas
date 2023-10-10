import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientesComponent } from './components/clientes/clientes.component'
import { DescripcionComponent } from './components/descripcion/descripcion.component'
import { LoadClientsComponent } from './components/load-clients/load-clients.component'
import { GraphicsComponent } from './components/graphics/graphics.component'
import { LoginComponent } from './session/login/login.component'
import { InicioComponent } from './session/inicio/inicio.component'
import { CreateAccountComponent } from './session/create-account/create-account.component'
import { TablasComponent } from './components/tablas/tablas.component'
import { ResumenClientesComponent } from './components/filtro/resumen-clientes.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/session/login' },
  {
    path: 'session',
    component: InicioComponent,
    children: [   
      { path: '', pathMatch: 'full', redirectTo: '/session/login' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: CreateAccountComponent,
      }
    ]
  },
  {
    path: 'home',
    component: ClientesComponent
  },
  {
    path: 'resumen',
    component: DescripcionComponent
  },
  {
    path: 'load-clientes',
    component: LoadClientsComponent
  },
  {
    path: 'graficas',
    component: GraphicsComponent
  },
  {
    path: 'pruebas',
    component: ResumenClientesComponent
  },
  { path: '**', redirectTo: '/session/login' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
