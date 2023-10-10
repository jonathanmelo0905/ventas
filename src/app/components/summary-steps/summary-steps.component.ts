import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients.models';
import { Pasos, Result } from 'src/app/models/pasos.models';
import { Resumen } from 'src/app/models/resumen.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-summary-steps',
  templateUrl: './summary-steps.component.html',
  styleUrls: ['./summary-steps.component.css']
})
export class SummaryStepsComponent implements OnInit {

  pasos: Result[] = [];
  detailClient: Clients = <Clients>{};
  getInfo: Resumen = <Resumen>{}
  state: boolean = false;

  constructor(private services: DataService) { }

  async ngOnInit(){
    this.detailClient = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.getInfo = await this.getInfoPasosId(this.detailClient.id_client);
    this.pasos = await this.getPasos();
    this.callAndInteraction();
    await this.updateRes();
  }

  callAndInteraction(){
    let contador = 0;
    this.getInfo.pasos.forEach(
      step =>{
        if(step.paso == 3){
          contador++;
        }
      }
    )
    this.services.sendStepThree(contador)
  }

  //se llama la guia de los pasos y sus titulos
  getPasos() {
    return new Promise<Result[]>((resolve) => {
      this.services.getPasos().subscribe((res) => {
        resolve(res.result);
      });
    });
  }
  
  getInfoPasosId(id: number){
    return new Promise<Resumen>((resolve) => {
      this.services.getInfoId(id).subscribe(
        res=>{
          resolve(res)
        }
      )
    });
  }

  filterStep(id: number){
    this.state = false;
    let data = this.getInfo.pasos.filter((step: any)=>{
      return step.paso === id
    })
    if(data.length === 0)this.state = true;
    return data;
  }

  medio(id: number){
    let data = ''
    id === 1 ? data = 'Whatsapp' : id === 2 ? data = 'Llamada' : data = 'Correo';
    return data;
  }

   async updateRes(){
    this.services.resumen$.subscribe(
      async res=>{
        console.log(res)
        if(res){
          this.getInfo = await this.getInfoPasosId(this.detailClient.id_client);
        }
      }
    )
  }
}
