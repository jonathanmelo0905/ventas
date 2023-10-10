import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Clients } from '../models/clients.models';
import { ItemsMedios, Medio } from '../models/medios.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  private newClientes = new BehaviorSubject<boolean>(false)
  private isFilter = new BehaviorSubject<boolean>(false);
  private open = new BehaviorSubject<boolean>(false);
  private filtro = new Subject<Medio[]>();
  private star = new BehaviorSubject<boolean>(false);
  private amount = new Subject<number>();
  private isSearch = new Subject<string>();

  filtro$ = this.filtro.asObservable();
  open$ = this.open.asObservable();
  star$ = this.star.asObservable();
  amount$ = this.amount.asObservable();
  isFilter$ = this.isFilter.asObservable();
  isSearch$ = this.isSearch.asObservable();
  newClientes$ = this.newClientes.asObservable();

  modalNewClients(estado: boolean){
    this.newClientes.next(estado)
  }

  onStar(star: boolean){
    this.star.next(star);
  }

  openFiltro(estado: boolean){
    this.open.next(estado)
  }
  
  onFilter(data: Medio[]){
    this.filtro.next(data)
  }

  onAmount(cantidad: number){
    this.amount.next(cantidad);
  }

  eliminarFiltros(isFiltro: boolean){
    this.isFilter.next(isFiltro);
  }

  search(arg: string){
    this.isSearch.next(arg)
  }
}
