import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UrlPages } from './enums/rutas'
import { PermisionsGuard } from './guards/permisions.guard'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: UrlPages.LOGIN_PADRE },
  {
    path: UrlPages.SESSION,
    loadChildren: () => import('./lazy-loading/login/login.module').then( m => m.LoginModule)
  },
  {
    path: UrlPages.HOME,
    loadChildren: () => import('./lazy-loading/home/home.module').then(m => m.HomeModule),
    canActivate: [PermisionsGuard]
  },
  {
    path: UrlPages.RESUMEN,
    canActivate: [PermisionsGuard],
    loadChildren: () => import('./lazy-loading/perfil-cliente/perfil-cliente.module').then(m => m.PerfilClienteModule)
  },
  {
    path: UrlPages.CARGAR_CLIENTES,
    loadChildren: () => import('./lazy-loading/load-clientes/load-clientes.module').then(m => m.LoadClientesModule),
    canActivate: [PermisionsGuard]
  },
  { path: '**', redirectTo: UrlPages.LOGIN_PADRE }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
