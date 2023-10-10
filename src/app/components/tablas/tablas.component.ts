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
  searchList: Clients[] = [];
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
    this.eliminarFiltro();
    this.busqueda();
  }

  async callClass(){
    this.litsClient = await this.data.getclients();
    this.clientesLista = this.litsClient;
    let clientes = JSON.parse(localStorage.getItem('clientes') || '0');
    let nuevosClientes!: number;
    clientes == 0 ? nuevosClientes = 0 : nuevosClientes = this.clientesLista.length - clientes;
    if(nuevosClientes > 0){
      localStorage.setItem('newClientes', JSON.stringify(nuevosClientes))
      this.clientesSvc.modalNewClients(true);
    }
    localStorage.setItem('clientes', JSON.stringify(this.clientesLista.length))
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
  
  onFilter(){
    this.clientesSvc.filtro$.subscribe({
      next: res => {
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

  eliminarFiltro(){
    this.clientesSvc.isFilter$.subscribe(res=>{
      if(res){
        this.litsClient = this.clientesLista;
        this.clientesAmount();
      }
    })
  }

  busqueda(){    
    this.clientesSvc.isSearch$.subscribe({
      next: arg =>{
        this.searchList = this.litsClient;
        const resultFilter = [];
        for(const post of this.litsClient){
          if((post.name.toUpperCase().indexOf(arg.toUpperCase()) > -1) || (post.email.toUpperCase().indexOf(arg.toUpperCase()) > -1) || (post.phone.indexOf(arg) != -1)){
            resultFilter.push(post);
          }
        }
        this.litsClient = resultFilter;
      }
    })
  }
}
