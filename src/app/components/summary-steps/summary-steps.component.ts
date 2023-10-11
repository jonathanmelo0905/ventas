import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/models/clients.models';
import { InfoPaso, Pasos, Result } from 'src/app/models/pasos.models';
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
  resumenStep: any = [];
  isOpenResumen = false;
  state: boolean = false;

  constructor(private services: DataService) { }

  async ngOnInit(){
    this.detailClient = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.callAndInteraction();
    await this.updateRes();
  }

  getResumenes(){
    this.pasos.forEach( step =>{
      let data = this.getInfo.pasos.filter(res=>{
        return res.paso === step.id
      })
      data.length == 0 ? 
      step.state = false : 
      step.state = true;
      this.resumenStep.push(data)
    })
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

  medio(id: number){
    let data = ''
    id === 1 ? data = 'Whatsapp' : id === 2 ? data = 'Llamada' : data = 'Correo';
    return data;
  }

   async updateRes(){
    this.services.resumen$.subscribe(
      async res=>{
        if(res){
          this.getInfo = await this.getInfoPasosId(this.detailClient.id_client);
          this.resumenStep();
        }
      }
    )
  }

  async openResumen(){
    this.getInfo = await this.getInfoPasosId(this.detailClient.id_client);
    this.pasos = await this.getPasos();
    this.getResumenes();
    this.isOpenResumen = true;
  }
}
