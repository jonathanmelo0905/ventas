import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Clients } from '../models/clients.models';
import { ItemsMedios, Medio } from '../models/medios.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { }

  private open = new BehaviorSubject<boolean>(false);
  private filtro = new Subject<Medio[]>();
  private star = new BehaviorSubject<boolean>(false);
  private amount = new Subject<number>();

  filtro$ = this.filtro.asObservable();
  open$ = this.open.asObservable();
  star$ = this.star.asObservable();
  amount$ = this.amount.asObservable();

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
}
