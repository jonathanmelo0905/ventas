import { ClientesService } from 'src/app/services/clientes.service';
import { Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clients } from 'src/app/models/clients.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent {
  constructor(
    private readonly dataSvc: ClientesService
  ){}

  openFiltro(){
    this.dataSvc.openFiltro(true);
  }

}
