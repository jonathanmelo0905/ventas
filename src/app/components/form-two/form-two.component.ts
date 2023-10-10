import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clients } from 'src/app/models/clients.models';
import { InfoPaso, Result } from 'src/app/models/pasos.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-two',
  templateUrl: './form-two.component.html',
  styleUrls: ['./form-two.component.css'],
})
export class FormTwoComponent implements OnInit {
  idPasos: number = 0;
  estado: number = 0;
  status = 0;
  typeCita: number = 0;
  reschedule: number = 0;
  stepThree: number = 0;
  titulo: string = '';
  nameA: string = '';
  nameB: string = '';
  mensaje: string = '';
  state: boolean = false;
  alerta: boolean = false;
  info: Result[] = [];
  pasos: Result[] = [];
  detailClient: Clients = <Clients>{};
  informacion: InfoPaso = <InfoPaso>{};

  infoPasos: FormGroup = new FormGroup({});

  constructor(
    private services: DataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.createForm();
    this.detailClient = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.pasos = await this.getPasos();
    this.nextStep();
    this.callAndInteraction(); 
  }

  callAndInteraction(){
    this.services.stepThree$.subscribe(
      step=>{
        this.stepThree = step;
        console.log("melo ~ file: form-two.component.ts:49 ~ FormTwoComponent ~ callAndInteraction ~ stepThree:", this.stepThree)
      }
    )
  }

  createForm() {
    this.infoPasos = new FormGroup({
      fecha_a: new FormControl('', Validators.required),
      fecha_b: new FormControl(''),
      hora_a: new FormControl('', Validators.required),
      hora_b: new FormControl(''),
      id_client: new FormControl(''),
      observaciones: new FormControl('', Validators.required),
      pasos: new FormControl(''),
      typeCita: new FormControl(''),
      reschedule: new FormControl(''),
      medio: new FormControl('', Validators.required)
    });
  }

  //se llama la guia de los pasos y sus titulos
  getPasos() {
    return new Promise<Result[]>((resolve) => {
      this.services.getPasos().subscribe((res) => {
        resolve(res.result);
      });
    });
  }

  //evalua en que paso esta y cual paso debe mostrar
  async nextStep() {
    this.status = this.detailClient.level;
    if (this.status === 0 || this.status === 1) {
      this.idPasos = 2;
    } else if (this.status >= 2) {
      this.idPasos = this.status + 1;
    }
    this.info = this.pasos.filter((n: Result) => {
      return n.id === this.idPasos;
    });
    this.estado = this.info[0].estatus;
    this.titulo = this.info[0].name;
    this.nameA = this.info[0].name_a;
    this.nameB = this.info[0].name_b;
  }

  sendForm(id: number) {
    this.informacion.fecha_a = this.infoPasos.value.fecha_a;
    this.informacion.hora_a = this.infoPasos.value.hora_a;
    this.informacion.fecha_b = this.infoPasos.value.fecha_b;
    this.informacion.hora_b = this.infoPasos.value.hora_b;
    this.informacion.id_client = this.detailClient.id_client;
    this.informacion.observaciones = this.infoPasos.value.observaciones;
    this.informacion.paso = this.idPasos;
    this.informacion.medio = this.infoPasos.value.medio;
    this.typeCita = this.infoPasos.value.typeCita;
    this.reschedule = this.infoPasos.value.reschedule;
    this.parameters(id);
    sessionStorage.removeItem('lista-clientes')
  }


  //1 : REAGENDAR NO, VIRTUAL 2: REAGENDAR SI, PRESENCIAL
  parameters(id: number){
    let state = true;
    let pasos = this.idPasos;
    let remarketing = 0;
    id === 3 ? (pasos = 16) : id === 1 ? (remarketing = 1, this.state = true) : false;
    this.reschedule == 2 && pasos === 8 ? (pasos = pasos -2) : false;
    this.reschedule == 2 && pasos === 13 ? (pasos = pasos -2) : false;
    this.typeCita == 2 && pasos === 3 ? (pasos = 6) : false;
    this.reschedule == 2 && this.typeCita == 1
      ? (pasos = this.idPasos - 2)
      : this.reschedule == 2 && this.typeCita == 2
      ? (pasos = 6)
      : false;
    this.typeCita == 3 ? state = false : state = true;
    this.saveInfo(pasos, remarketing, state);
  }

  saveInfo(pasos: number, remarketing: number, state: boolean) {
    this.services.saveInfo(this.informacion).subscribe((res: any) => {
      if(res.state){
        console.log(res, 'se salvo el paso en la base de datos');
        this.infoPasos.reset(this.infoPasos)
        this.updateStepClient(state, pasos, remarketing)
      }else{
        console.log(res,'no se guardo la info correctamente')
        this.mensaje = 'No se guardo la info correctamente';
        this.alerta = true;
      }
    });
  }

  updateStepClient(state: boolean, pasos: number, remarketing: number){
    if(state){
      this.services.update(this.informacion.id_client, pasos, remarketing).subscribe((res: any) => {
        if(res.state){
          console.log(res, 'se cambio el paso en el perfil del cliente');
          this.updateCliente(this.informacion.id_client)
        }else{
          console.log('no se actualizo el paso en el cliente porfavor puedes actualizarlo manualmente')
          this.mensaje = 'No se actualizo el paso en el cliente porfavor puedes actualizarlo manualmente';
          this.alerta = true;
        }
      });
    }else{
      this.updateCliente(this.informacion.id_client)
    }
  }

  updateCliente(id: number){
    this.services.getClientId(id).subscribe(
      res =>{
        console.log('se llamo al cliente por su id')
        localStorage.setItem('cliente', JSON.stringify(res.clients[0]))
        this.detailClient = res.clients[0];
        this.services.sendSearch(true);
        this.nextStep();
        if(this.state){
          this.router.navigate(['/','home'])
          this.state = false;
        }
      }
    )
  }

  addItem(estado: boolean) {
    this.alerta = estado;
  }
}
