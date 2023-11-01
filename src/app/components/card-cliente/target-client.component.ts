import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Campaings, Medios, Projects } from 'src/app/enums/medios';
import { UrlPages } from 'src/app/enums/rutas';
import { Clients } from 'src/app/models/clients.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-target-client',
  templateUrl: './target-client.component.html',
  styleUrls: ['./target-client.component.css'],
})
export class TargetClientComponent implements OnInit {

  @Output() newStarEvent = new EventEmitter<boolean>();
  
  nameClient = '';
  project = '';
  medio = '';
  campaing = '';
  email = '';
  perfil: boolean = false;
  interes: number = 0;
  prioridad: number = 1;
  detailClient: Clients = <Clients>{};
  projects = Projects;
  medios = Medios;
  campaings = Campaings;

  constructor(
    private router: Router,
    private services: DataService
  ) {}

  ngOnInit(): void {
    this.searchData();
  }

  searchData() {
    const data = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.detailClient = data;
    this.projects.find((e: any) => {
      if (e.id === this.detailClient.project) {
        this.project = e.name;
      }
    });
    this.services.getMedios().subscribe(
      res=>{
        this.medios = res.medios;
        this.medios.find((e: any) => {
          if (e.id === this.detailClient.medio) {
            this.medio = e.name;
          }
        });
      }
    )
    this.campaings.find((e: any) => {
      if (e.id === this.detailClient.id_camp) {
        this.campaing = e.name;
      }
    });
    this.email = this.detailClient.email;
    this.prioridad = this.detailClient.prioridad;
    this.interes = this.detailClient.interes;
  }

  
  signOff(){
    this.router.navigate([UrlPages.HOME]);
  }

  openStar(){
    this.newStarEvent.emit(true)
  }

  closePerfil(state: boolean){
    this.perfil= state;
    this.searchData();
  }
}
