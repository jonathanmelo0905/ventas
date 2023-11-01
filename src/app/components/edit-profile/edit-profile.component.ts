import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clients } from 'src/app/models/clients.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Output() newPerfilEvent = new EventEmitter<boolean>();

  infoClient: Clients = <Clients>{};
  cliente: Clients = <Clients>{};
  user: FormGroup = new FormGroup({});
  eleccion: boolean = true;

  constructor(
    private services: DataService
  ) { }

  ngOnInit(){
    const data = JSON.parse(localStorage.getItem('cliente') || 'false');
    console.log("data:", data)
    if(data){
      console.log('verdadero')
    }else{
      console.log('falso')
    }
    data ? this.eleccion = true : this.eleccion = false;
    this.infoClient = data;
    this.updateForm();
    this.asignar(data);
  }

  
  updateForm(){
    this.user = new FormGroup({
      id_resp: new FormControl(''),
      name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      id_camp: new FormControl('',[Validators.required]),
      medio: new FormControl('',[Validators.required]),
      project: new FormControl('',[Validators.required]),
      date: new FormControl(''),
      time: new FormControl('',),
      level: new FormControl('',[Validators.required]),
      remarketing: new FormControl('',[Validators.required]),
      ubicacion: new FormControl('',[Validators.required]),
      prioridad: new FormControl('',[Validators.required]),
      interes: new FormControl('',[Validators.required]),
    })
  }

  asignar(data:Clients){
    this.user.patchValue({
      id_resp : data.id_resp,
      name : data.name,
      phone : data.phone,
      email : data.email,
      id_camp : data.id_camp,
      medio : data.medio,
      project : data.project,
      date : data.date,
      time : data.time,
      level : data.level,
      remarketing : data.remarketing,
      ubicacion : data.ubicacion,
      prioridad : data.prioridad,
      interes : data.interes
    })
  }

  actualizar(){
    let data = this.user.value;
    if(this.eleccion){
      this.services.updateCliente(this.infoClient.id_client,data).subscribe(
        res =>{
          console.log(res)
          if(res.state){
            this.infoClient = data;
            localStorage.setItem('cliente', JSON.stringify(this.infoClient))
            this.close();
          }        
        }
      )
    }else{
      this.loadClient();
      this.services.saveClient(this.cliente).subscribe((res) => {
        console.log(res)
        if(res.state){
          this.close();
        }  
      });
    }
  }
  
  loadClient(){
    const infoUser = JSON.parse(localStorage.getItem('stateSession') || '[]');
    let date = new Date;
    let hora = date.getHours() + ':' + date.getMinutes()
    this.cliente.name = this.user.value.name;
    this.cliente.phone = this.user.value.phone;
    this.cliente.email = this.user.value.email;
    this.cliente.id_camp = this.user.value.id_camp;
    this.cliente.medio = this.user.value.medio;
    this.cliente.project = this.user.value.project;
    this.cliente.date = new Date;
    this.cliente.time = hora
    this.cliente.id_resp = infoUser.user
    this.cliente.level = 1;
    this.cliente.prioridad=0;
    this.cliente.interes = this.user.value.interes;
    this.cliente.level = 1;
    this.cliente.remarketing = 0;
    this.cliente.ubicacion = this.user.value.ubicacion;
  }

  close(){
    this.newPerfilEvent.emit(false)
  }
}
