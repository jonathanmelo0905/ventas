import { NgForm } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ClientsList } from 'src/app/directivas/clientesInfo';
import { IconsList } from 'src/app/enums/starts';
import { Clients, DataClients } from 'src/app/models/clients.models';
import { Medio } from 'src/app/models/medios.models';

@Component({
  selector: 'app-resumen-clientes',
  templateUrl: './resumen-clientes.component.html',
  styleUrls: ['./resumen-clientes.component.css']
})
export class ResumenClientesComponent implements OnInit {

  constructor(private data: ClientsList,
    private infoSvc: ClientesService
  ) { }
  
  // constructor(private readonly materialesSvc: MaterialesService){}

  estado: boolean = false;
  medios!: Medio[];
  onStar: boolean = false;

  ngOnInit(): void{
    this.onMedios();
    this.infoSvc.open$.subscribe(res=> {
      setTimeout(()=>{
        this.estado = res;
      },100)
    })
  }

  async onMedios(){
    this.medios = await this.data.getMedios();
    console.log("this.medios:", this.medios)
  }

  closeModal(){
    this.estado = false
    setTimeout(()=>{
      this.infoSvc.openFiltro(false)
    },500)
  }

  verResultados(result: NgForm){
    console.log("result:", result, this.medios, this.onStar)
    this.infoSvc.onFilter(this.medios);
    this.infoSvc.onStar(this.onStar);
    this.closeModal();
  }
}
