import { Component, OnInit } from '@angular/core';
import { Clients, DataClients } from 'src/app/models/clients.models';
import { Medio } from 'src/app/models/medios.models';
import { InfoSalesman, Salesman } from 'src/app/models/salesman.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})

export class GraphicsComponent implements OnInit {

  clientes: Clients[] = [];
  vendedores: InfoSalesman[] = []
  data: any[] =[
  ]
  colorScheme = {
    domain: ['#FF5733', '#176FFF', '#29FF17', '#29FF17', '#17FFFF']
  }
  isDoughnut = true;
  legendPosition = 'right'
  showLegend= true;
  showLabels = true;
  gradient = true;

  constructor(
    private servicesClient: DataService
  ){}

  async ngOnInit(){
    this.clientes = await this.getclients();
    this.vendedores = await this.getSalesman();
    console.log("this.clientes:", this.clientes)
    this.estadisticas();
  }

  estadisticas(){
    let redes: any[] = [];
    let data: any;
    this.vendedores.forEach(
      vendedor =>{
        data = this.clientes.filter(
          n=>{
            return n.id_resp === parseInt(vendedor.password)
          }
        )
        redes.push(data)
      }
    )
    console.log(redes)
    redes.forEach(
      data =>{
        let name = this.vendedores.find(
          res=>{
            return data[0].id_resp == res.password
          }
        )
        console.log("name:", name)
        this.data.push({
          name: name?.name,
          value: data.length
        })
      }
    )
    console.log(this.data)
  }
  
  getMedios() {
    return new Promise<Medio[]>((resolve) => {
      this.servicesClient.getMedios().subscribe((res) => {
        resolve(res.medios);
      });
    });
  }
  getclients() {
    return new Promise<Clients[]>((resolve) => {
      this.servicesClient.getClient().subscribe((res) => {
        resolve(res.clients);
      });
    });
  }
  getSalesman(){
    return new Promise<InfoSalesman[]>((resolve) => {
      this.servicesClient.getVendedores().subscribe((res) => {
        console.log("res:", res)
        resolve(res.clients);
      });
    });

  }
  
  onDeactivate(event: any){
    console.log("event:", event)
  }

  onActivate(event: any){

  }

  onSelect(event: any){

  }

}
