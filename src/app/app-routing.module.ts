import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ClientesComponent } from './components/clientes/clientes.component'
import { DescripcionComponent } from './components/descripcion/descripcion.component'
import { LoadClientsComponent } from './components/load-clients/load-clients.component'
import { GraphicsComponent } from './components/graphics/graphics.component'
import { LoginComponent } from './session/login/login.component'
import { InicioComponent } from './session/inicio/inicio.component'
import { CreateAccountComponent } from './session/create-account/create-account.component'
import { ResumenClientesComponent } from './components/filtro/resumen-clientes.component'
import { UrlPages } from './enums/rutas'
import { PermisionsGuard } from './guards/permisions.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: UrlPages.LOGIN_PADRE },
  {
    path: UrlPages.SESSION,
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
  },
  {
    path: UrlPages.HOME,
    component: ClientesComponent,
    canActivate: [PermisionsGuard]
  },
  {
    path: UrlPages.RESUMEN,
    component: DescripcionComponent,
    canActivate: [PermisionsGuard]
  },
  {
    path: UrlPages.CARGAR_CLIENTES,
    component: LoadClientsComponent,
    canActivate: [PermisionsGuard]
  },
  {
    path: UrlPages.GRAFICAS,
    component: GraphicsComponent,
    canActivate: [PermisionsGuard]
  },
  {
    path: UrlPages.PRUEBAS,
    component: ResumenClientesComponent,
    canActivate: [PermisionsGuard]
  },
  { path: '**', redirectTo: UrlPages.LOGIN_PADRE }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
