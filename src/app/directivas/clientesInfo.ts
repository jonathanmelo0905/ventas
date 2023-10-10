import { Medio } from "../models/medios.models";
import { DataService } from "../services/data.service";
import { Clients } from "../models/clients.models";
import { Injectable } from "@angular/core";


@Injectable()
export class ClientsList {

    constructor(
      private servicesClient: DataService,
    ){}
  
  
    getclients(): Promise<Clients[]> {
      const data = JSON.parse(localStorage.getItem('stateSession') || '[]');
      return new Promise<Clients[]>((resolve) => {
        this.servicesClient.getId({id: data.cedula}).subscribe({
          next: res=> {
            resolve(res.clients.reverse());
          }
        });
      });
    }
  
    getMedios(): Promise<Medio[]> {
      return new Promise<Medio[]>((resolve) => {
        let medios = JSON.parse(sessionStorage.getItem('medios') || '0');
        if(medios == 0){
          this.servicesClient.getMedios().subscribe({
            next: res =>{
              sessionStorage.setItem('medios',JSON.stringify(res.medios))
              resolve(res.medios);
            }
          });
        }else{
          resolve(medios)
        }
      });
    }
  
}