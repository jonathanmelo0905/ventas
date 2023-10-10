import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarBlack, StarGold, StartList } from 'src/app/enums/starts';
import { Clients } from 'src/app/models/clients.models';
import { Medio } from 'src/app/models/medios.models';
import { DataService } from 'src/app/services/data.service';
import { ClientsList } from 'src/app/directivas/clientesInfo'
import { ClientesService } from 'src/app/services/clientes.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {
  
  
  stars = StartList
  listclients: boolean = true;
  nameList!: string;
  search: string = '';
  clientesLista: Clients[] = [];
  litsClient: Clients[] = [];
  itemsMedios: Medio[] = [];


  constructor(
    private router: Router,
    private data: ClientsList,
    private clientesSvc: ClientesService,
  ) { }

  ngOnInit(){
    this.callClass();
    this.onFilter();
    this.onStar();
  }

  async callClass(){
    this.litsClient = await this.data.getclients();
    this.clientesLista = this.litsClient;
    this.clientesAmount();
    this.itemsMedios = await this.data.getMedios();
  }

  clientesAmount(){
    this.clientesSvc.onAmount(this.litsClient.length);
  }
  
  seeClient(client: Clients){
    localStorage.setItem('cliente', JSON.stringify(client));
    this.router.navigate(['/', 'resumen']);
  }

  filterMedio(id: number){
    let data: Medio | undefined = this.itemsMedios.find((n) => {
      return n.id === id;
    });
    if(data){
      return data.name;
    }else{
      return 'INDEFINIDO';
    }
  }

  onStart(id: any): any{
    let n=0;
    this.stars.forEach(star =>{
      if(n<id){
        star.star = StarGold;
      }else{
        star.star = StarBlack;
      }
      n++;
    })
    return this.stars
  }
  
  onFilter(){
    this.clientesSvc.filtro$.subscribe({
      next: res => {
        console.log("melo:", res)
        this.onFilterCategoria(res)
      }
    })
  }

  onFilterCategoria(data: Medio[]){
    let material: Clients[] = [];
    let bandera = false;
    data.forEach(e=>{
      if(e.state){
            bandera = true;
            material = material.concat(this.clientesLista.filter( cliente => {
              return cliente.medio == e.id
            }))
      }
    })
    if(bandera){
      this.litsClient = material;
    }else{
      this.litsClient = this.clientesLista;
    }
    this.clientesAmount();
  }

  onStar(){
    this.clientesSvc.star$.subscribe({
      next: res => {
        console.log("meres:", res)
        if(res){
          this.litsClient = this.clientesLista.filter(cliente =>{
            return cliente.prioridad > 0;
          })
          this.clientesAmount();
        }
      }
    })
  }
}
