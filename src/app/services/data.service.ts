import { InfoPaso } from './../models/pasos.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Clients, DataClients, NewClients } from '../models/clients.models';
import { Pasos } from '../models/pasos.models';
import { environment } from '../../environments/environment'
import { Resumen } from '../models/resumen.models';
import { Salesman } from '../models/salesman.models';
import { ItemsMedios } from '../models/medios.models';
import { Respuesta } from '../models/res.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private  resumen = new Subject<boolean>;
  private  stepThree = new Subject<number>;
  clientes$ = new BehaviorSubject<Clients[]>([]);
  resumen$ = this.resumen.asObservable();
  stepThree$ = this.stepThree.asObservable();
  estado: boolean = false;

  isLoanding$ = new Subject<boolean>;

  constructor(private http: HttpClient) { }
  
  API_URI = environment.apiUrl;
  
  sendStepThree(amount: number){
    this.stepThree.next(amount)
  }

  sendSearch(estado: boolean){
    this.estado = estado;
    this.resumen.next(this.estado);
  }
  updateClients(clients: Clients[]){
    this.clientes$.next(clients);
  }
  show(){
    this.isLoanding$.next(true);
  }
  hide(){
    this.isLoanding$.next(false);
  }

  getClient(){
    return this.http.get<DataClients>(`${this.API_URI}/client/capturing`)
  }

  
  getId(id: any){
    return this.http.post<DataClients>(`${this.API_URI}/client/id`, id)
  }

  getVendedores(){
    return this.http.get<Salesman>(`${this.API_URI}/client/vendedores`)
  }
  
  getClientId(id: number){
    return this.http.get<DataClients>(`${this.API_URI}/client/one/${id}`)
  }
  
  getInfoId(id: number){
    return this.http.get<Resumen>(`${this.API_URI}/client/info/${id}`)
  }

  getPasos(){
    return this.http.get<Pasos>(`${this.API_URI}/client/pasos`)
  }
  getMedios(){
    return this.http.get<ItemsMedios>(`${this.API_URI}/client/medios`)
  }

  saveInfo(infoPaso: InfoPaso){
    return this.http.post(`${this.API_URI}/client/info`, infoPaso)
  }

  
  saveClient(cliente: NewClients){
    return this.http.post<Respuesta>(`${this.API_URI}/client/newClient`, cliente)
  }

  update(id: number, paso: number, remarketing: number){
    return this.http.put(`${this.API_URI}/client/update/${id}`, {level: paso, remarketing: remarketing})
  }

  
  updateCliente(id: number, data: Clients){
    return this.http.put<Respuesta>(`${this.API_URI}/client/updateCliente/${id}`, data)
  }

  stars(id: number,prioridad: number){
    return this.http.put(`${this.API_URI}/client/stars/${id}`, {prioridad: prioridad})
  }
}
