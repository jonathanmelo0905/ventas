import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from '../services/clientes.service';
import { UrlPages } from '../enums/rutas';

@Injectable({
  providedIn: 'root'
})
export class PermisionsGuard implements CanActivate {
  private readonly router = inject(Router);
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.hasUser()){
      return true;
    }
    alert('No has iniciado sesion')
    this.router.navigate([UrlPages.LOGIN_PADRE])
    return false;
  }
  

  hasUser(): boolean{
    const data = JSON.parse(localStorage.getItem('session') || 'false');
    return data
  }
}
