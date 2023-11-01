import { ClientesService } from 'src/app/services/clientes.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit{

  amount: number = 0;
  isFiltro: boolean = false;
  buscarName: string = '';
  filtroName: string = '';
  newClient: boolean = false;

  constructor(
    private readonly dataSvc: ClientesService
  ){}

  ngOnInit(): void {
      this.onFilter();
      this.onStar();
      this.deleteClient();
  }

  deleteClient(){
    localStorage.removeItem('cliente')
  }

  openFiltro(){
    this.dataSvc.openFiltro(true);
  }

  onFilter(){
    this.dataSvc.filtro$.subscribe({
      next: res => {
        console.log("res:", res)       
        res.forEach( filtro =>{
          if(filtro.state){
            this.isFiltro = true;
            this.amount++;
          }
        }) 
      }
    })
  }

  onStar(){
    this.dataSvc.star$.subscribe({
      next: res => {
        if(res){
          this.isFiltro = true;
          this.amount++;
        }
      }
    })
  }

  eliminarFiltros(id: number){
    this.isFiltro = false;
    this.amount = 0;
    this.dataSvc.eliminarFiltros(true);
    if(id == 0){this.filtroName = ''}
  }

  buscador(){
    if(this.buscarName){
      this.filtroName = this.buscarName;
      this.dataSvc.search(this.buscarName);
    }
    this.buscarName = ''
  }

  closePerfil(estado: boolean){
    this.newClient = estado;
  }

}
