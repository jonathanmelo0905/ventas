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
  @Input('data') estado: boolean = true;
  infoClient: Clients = <Clients>{};
  cliente: Clients = <Clients>{};
  
  user: FormGroup = new FormGroup({});
  eleccion: boolean = true;

  constructor(
    private services: DataService
  ) { }

  ngOnInit(){
    const data = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.infoClient = data;
    this.updateForm();
    this.asignar(data);
    this.eleccion = this.estado;
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
    this.user.controls['id_resp'].setValue(data.id_resp);
    this.user.controls['name'].setValue(data.name);
    this.user.controls['phone'].setValue(data.phone);
    this.user.controls['email'].setValue(data.email);
    this.user.controls['id_camp'].setValue(data.id_camp);
    this.user.controls['medio'].setValue(data.medio);
    this.user.controls['project'].setValue(data.project);
    this.user.controls['date'].setValue(data.date);
    this.user.controls['time'].setValue(data.time);
    this.user.controls['level'].setValue(data.level);
    this.user.controls['remarketing'].setValue(data.remarketing);
    this.user.controls['ubicacion'].setValue(data.ubicacion);
    this.user.controls['prioridad'].setValue(data.prioridad);
    this.user.controls['interes'].setValue(data.interes);
  }

  actualizar(data: Clients){
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
