import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SessionService } from 'src/app/services/session.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {

  id_business?: number;
  cedula: number = 0;
  amountClient = 0;
  nameBusiness = '';
  url = '';
  nameList = 'general';
  isLoading$ = this.servicesClient.isLoanding$;
  status: boolean = true;
  onOff: string = ''
  modal: boolean = false;
  alerta: boolean = false;
  
  constructor(
    private router: Router,
    private servicesClient: DataService,
    private session : SessionService,
    private clientesSvc: ClientesService
  ) {}

  async ngOnInit() {
    this.newClients();
    this.logIn();
    this.clientesSvc.amount$.subscribe({
      next: res => this.amountClient = res
    })
    this.clientesSvc.open$.subscribe(res=> this.modal = res)
  }

  logIn() {
    const data = JSON.parse(localStorage.getItem('stateSession') || '[]');
    this.nameBusiness = data.name;
    this.cedula = data.cedula;
    this.url = data.url;
    this.id_business = parseInt(data.user);
    data.estado == 0 ? (this.status = false, this.onOff = 'OFF'): (this.status = true, this.onOff = 'ON');
  }

  signOff() {
    localStorage.removeItem('stateSession');
    localStorage.removeItem('session')
    this.router.navigate(['/']);
  }

  estado(){
    this.session.estado(!this.status, this.cedula).subscribe(
      res => {
        if(res.state){
          this.status = !this.status
          this.status ? this.onOff = 'ON' : this.onOff = 'OFF';
          let data = JSON.parse(localStorage.getItem('stateSession') || '[]');
          data.estado = this.status;
          localStorage.setItem('stateSession', JSON.stringify(data))
        }
      }
    )
  }

  newClients(){
    this.clientesSvc.newClientes$.subscribe(res => this.alerta = res)
  }
  
}
