import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.css']
})
export class FormOneComponent implements OnInit {

  // @Input('data') info: any;
  // @Output() newItemEvent = new EventEmitter<boolean>();
  mensaje: string = '';
  amount: number = 0;
  name: string = '';

  constructor(
    private clientesSvc: ClientesService,) { }

  ngOnInit(){
    let data = JSON.parse(localStorage.getItem('stateSession') || '0');
    this.amount = JSON.parse(localStorage.getItem('newClientes') || '0');
    this.name = data.name
    if(this.amount > 1){
      this.mensaje = `Tienes ${this.amount} clientes nuevos`;
    }else{
      this.mensaje = `Tienes un nuevo cliente`;
    }
  }

  closeModal(){
    this.clientesSvc.modalNewClients(false);
  }


}
