import { InfoSalesman, Salesman } from './../../models/salesman.models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Clients,
  DataClients,
  NewClients,
} from 'src/app/models/clients.models';
import { Medio } from 'src/app/models/medios.models';
import { DataService } from 'src/app/services/data.service';
import * as XSLX from 'xlsx';

@Component({
  selector: 'app-load-clients',
  templateUrl: './load-clients.component.html',
  styleUrls: ['./load-clients.component.css'],
})
export class LoadClientsComponent implements OnInit {
  getSaleman: Salesman = <Salesman>{}
  formatoCliente: NewClients = <NewClients>{};
  dataClientes: DataClients = <DataClients>{};
  vendedores: InfoSalesman[] = []
  itemsMedios: Medio[]= []
  clientes: Array<Clients> = [];
  filtros: Array<Clients> = [];
  redes: Array<any> = []
  amount: Array<any> = [];
  repeat: Array<Clients> = [];
  file!: any;
  status: boolean = false;
  cantidad: number = 0;
  mensaje = '';
  loadClients: number = 0;
  icons: any = [
    {
      id: 0,
      url: 'assets/iconos/Facebook_Logo.png'
    },
    {
      id: 1,
      url: 'assets/iconos/instagram.png'
    },
    {
      id: 2,
      url: 'assets/iconos/whatsapp.png'
    },
    {
      id: 3,
      url: 'assets/iconos/gmail.png'
    },
    {
      id: 4,
      url: 'assets/iconos/mapa.png'
    },
    {
      id: 5,
      url: 'assets/iconos/llamada.png'
    },
    {
      id: 6,
      url: 'assets/iconos/ads.png'
    },
    {
      id: 7,
      url: 'assets/iconos/chabot.png'
    }
  ]


  constructor(private router: Router, private servicesClient: DataService) { }

  async ngOnInit() {
    this.getSaleman = await this.getVendedores();
    this.vendedores = this.getSaleman.clients;
    this.dataClientes = await this.getclients();
    this.itemsMedios = await this.getMedios();
    this.redesAmounts();
    this.status = true;
  }
  
  //este codigo me pinta la cantidad de clientes de cada vendedor
  amountSalesman(cedula: string) {
    let data = 0;
    this.dataClientes.clients.forEach((n: Clients) => {
      if (n.id_resp === parseInt(cedula)) data++;
    });
    return data;
  }

  //convierte el formato de carga de excell a json
  cargar(event: any) {
    this.clientes = [];
    const selectedFile = event.target.files[0];
    event.target.value = null;
    const fileRead = new FileReader();
    fileRead.readAsBinaryString(selectedFile);
    fileRead.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XSLX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const data: Array<Clients> = XSLX.utils.sheet_to_json(
          workbook.Sheets[sheet]
        );
        this.clientes = data;
        this.repeatCustomer();
        this.medios();
      });
    };
  }

  //separamos los contactos subidos en los medios para repartirlos
  medios() {
    this.redes = [];
    this.itemsMedios.forEach(
      medio => {
        this.filtros = this.clientes.filter((e: Clients) => {
          return e.medio === medio.id;
        });
        this.redes.push(this.filtros);
      }
    )
  }

  //este codigo me pinta la cantidad de clientes por cada medio de cada vendedor
  amountMedios(id: string, tipo: number) {
    let data = this.dataClientes.clients.filter((n: Clients) => {
      return n.id_resp === parseInt(id) && n.medio === tipo;
    });
    return data.length;
  }

  //cantidades ya asignadas de los vendedores por cada medio excluye a los vendedores inactivos (estado = false)
  redesAmounts() {
    this.itemsMedios.forEach(
      item => {
        let cantidad = [];
        for (let vendedor of this.vendedores) {
          let data = 0;
          if(vendedor.estado){            
            this.dataClientes.clients.forEach(
              n => {
                if (n.id_resp === parseInt(vendedor.password) && n.medio == item.id) data++;
              }
            )
            let name = vendedor.name;
            cantidad.push({
              name: name,
              amount: data,
              cedula: vendedor.password,
            });
            data = 0;
          }
        }
        this.amount.push(cantidad);
      }
    )
  }


  //llama los items de los medios actuales en la BD
  getMedios() {
    return new Promise<Medio[]>((resolve) => {
      this.servicesClient.getMedios().subscribe((res) => {
        resolve(res.medios);
      });
    });
  }
  //llama los vendedores actuales en la BD
  getVendedores() {
    return new Promise<Salesman>((resolve) => {
      this.servicesClient.getVendedores().subscribe((res) => {
        resolve(res);
      });
    });
  }

  //llama los clientes actuales en la BD
  getclients() {
    return new Promise<DataClients>((resolve) => {
      this.servicesClient.getClient().subscribe((res) => {
        console.log("res:", res)
        resolve(res);
      });
    });
  }

  //filtros para la visualizacion de la tabla en thml
  filtercampaing(id: number) {
    let data = '';
    id === 1
      ? (data = 'KML_MARCELA')
      : id === 2
        ? (data = 'Comentarios')
        : false;
    return data;
  }

  filterMedio(id: number) {
    let data: Medio = <Medio>this.itemsMedios.find(
      n => {
        return n.id === id;
      }
    )
    return data.name;
  }

  filterProject(id: number) {
    let data = '';
    id === 1 ? (data = 'Montes') : id === 2 ? (data = 'Casa 7') : false;
    return data;
  }

  async loadClient() {
    let amount = 0;
    this.loadClients = 0;
    for (let red of this.redes) {
      await this.assignment(red, amount);
      amount++;
    }
    this.redes = [];
    this.clientes = [];
    this.mensaje = 'Se cargaron exitosamente los clientes';
    setTimeout(()=>{
      this.mensaje = '';
    }, 2000);
    this.dataClientes = await this.getclients();
    alert('se terminamos de cargar los clientes')
  }

  //asignamiento de clientes
  async assignment(medios: Clients[], amount: number) {
    let nuevosClientes = medios.length;
    let numVendedores = 0;
    this.vendedores.forEach( vendedor=>{
      if(vendedor.estado)numVendedores++
    })
    this.amount.forEach( amount =>{
      amount.sort((a:any, b:any) => a.amount - b.amount);
    })


    if (nuevosClientes > 0) {
      let pos = 0;
      let long = medios.length;
      for (let n = 0; n < long; n++) {
        let estado = await this.createClient(medios[0], this.amount[amount][pos].cedula);
        if (estado) {
          this.loadClients++;
          medios.shift();
          pos++
          if (pos === numVendedores) {
            pos = 0;
          }
        } else {
          n-=1;
        }
      }
    }
  }

  createClient(data: Clients, cedula: string) {
    return new Promise((resolve) => {
      this.formatoCliente = data;
      this.formatoCliente.id_resp = parseInt(cedula);
      this.formatoCliente.level = 1;
      this.formatoCliente.prioridad = 0;
      this.formatoCliente.interes = 0;
      this.formatoCliente.remarketing = 0;
      this.formatoCliente.ubicacion = 'por definir'
      this.servicesClient.saveClient(this.formatoCliente).subscribe((res) => {
        resolve(res.state);
      });
    });
  }

  //esta funcion revisa si los clientes que se encuentran en la base de datos estan repetidos con los que se van a cargar

  repeatCustomer() {
    this.repeat = []
    this.clientes.forEach(
      cliente => {
        let data: any = this.dataClientes.clients.find(
          data => {
            let day = this.diferencia(data.date, cliente.date);
            return ((data.email == cliente.email || data.phone == cliente.phone) && day < 30)
          }
        );
        if (data) this.repeat.push(data);
        this.cantidad = this.repeat.length;
      }
    )
    this.deleteRepeat();
  }

  deleteRepeat() {
    this.repeat.forEach(
      cliente => {
        this.clientes = this.clientes.filter(
          n => {
            return (n.email != cliente.email && n.phone != cliente.phone)
          }
        )
      }
    )
  }

  diferencia(data: Date, cliente: Date) {
    var fecha1: any = new Date(data);
    var fecha2: any = new Date(cliente);
    const diffTiempo = fecha2.getTime() - fecha1.getTime();
    const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));
    return diffDias;
  }
}
