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
  mensaje: string = '';
  state: boolean = false;
  alerta: boolean = false;
  info!: Result | undefined;
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
    console.log("this.pasos:", this.pasos)
    this.nextStep();
  }


  createForm() {
    this.infoPasos = new FormGroup({
      fecha: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
      observaciones: new FormControl('', Validators.required),
      medio: new FormControl('', Validators.required),
      id_client: new FormControl(''),
      pasos: new FormControl(''),
    });
  }

  //se llama la guia de los pasos y sus titulos
  getPasos() {
    return new Promise<Result[]>((resolve) => {
      this.services.getPasos().subscribe((res) => {
        console.log(res)
        resolve(res.result);
      });
    });
  }

  //evalua en que paso esta y cual paso debe mostrar
  async nextStep() {
    this.status = this.detailClient.level;
    this.idPasos = this.status;
    this.info = this.pasos.find((n: Result) => {
      return n.id === this.idPasos;
    });
    this.estado = this.info!.estatus;
    this.titulo = this.info!.name;
  }

  sendForm(id: number) {
    this.infoPasos.patchValue({
      id_client: this.detailClient.id_client,
      pasos: this.idPasos

    })
    console.log(this.infoPasos.value)
    id == 2 ? 
      this.saveInfo(id) :
      this.onUpdateStepClient(id);
  }

  onUpdateStepClient(remarketing: number){
    this.services.update(this.infoPasos.value.id_client, this.infoPasos.value.pasos + 1, remarketing).subscribe({
      next: (res: any)=>{
        if(res.state){
          console.log(res)
          this.saveInfo();
        }else{
          this.onUpdateStepClient(remarketing);
        }
      }
    })
  }


  saveInfo(id: number = 0) {
    this.services.saveInfo(this.infoPasos.value).subscribe({
      next: (res: any) => {
        if(res.state){
          console.log(res, 'se salvo el paso en la base de datos', res); 
          if(id != 2){
            this.detailClient.level = this.idPasos + 1;
            localStorage.removeItem('cliente');
            localStorage.setItem('cliente', JSON.stringify(this.detailClient))
            this.nextStep();
          }
          this.infoPasos.reset(this.infoPasos)
        }else{
          console.log(res,'no se guardo la info correctamente')
          this.saveInfo();
        }
      }
    });
  }
}
