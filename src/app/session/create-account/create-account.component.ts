import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/enums/rutas';
import { Respuesta } from 'src/app/models/res.models';
import { InfoSalesman } from 'src/app/models/salesman.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user: InfoSalesman[] = [];
  register: FormGroup = new FormGroup({});
  dataUser: InfoSalesman = <InfoSalesman>{}
  alertPassword = 'La contraseña no coincide'

  isPassword: boolean = false;
  isUser: boolean = false;

  constructor(
    private router: Router, 
    private dataServices: DataService,
    private session: SessionService
  ) {}

  async ngOnInit(){
    this.getSalesman();
    this.sessionForm();
  }

  sessionForm(){
    this.register = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      repeatPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      user: new FormControl('', [Validators.required, Validators.minLength(4)]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cedula: new FormControl('', [Validators.required, Validators.minLength(4)]),
      phone: new FormControl('', Validators.required)
    });
  }

  validationRegister(data: any){
    console.log("data:", data)
    if(data.password === data.repeatPassword){
      this.isPassword = false;
      this.data(data);
      let user = this.reviewData();
      if(user){
        this.isPassword = true;
        this.alertPassword = 'El usuairo o la cedula ya se encuentran registrados'
        setTimeout(()=>{
          this.isPassword = false;
        },1000)
      }else{
        this.isPassword = false;
        this.registerUser(this.dataUser);
      }
    }else{
      this.isPassword = true;
      setTimeout(()=>{
        this.isPassword = false;
        this.register.controls['password'].setValue('');
        this.register.controls['repeatPassword'].setValue('');
      },1000)
    }
  }

  reviewData(){
    return this.user.find(
      user =>{
        return (user.cedula === this.dataUser.cedula || user.user === this.dataUser.user)
      }
    )
  }

  data(data: any){
    this.dataUser.name = data.name;
    this.dataUser.user = data.user;
    this.dataUser.password = data.password;
    this.dataUser.url = '';
    this.dataUser.phone = data.phone;
    this.dataUser.cedula = data.cedula;
  }

  registerUser(data: InfoSalesman){
    this.session.registerUser(data).subscribe(
      (res)=>{
        console.log(res)
        if(res.state){
          this.alertPassword = 'Se guardo exitosamente';
          this.isPassword = true;
          this.register.reset(this.register)
        }
      }
    )
  }

  getSalesman(){
    this.dataServices.getVendedores().subscribe(
      (res) => {
        console.log("res:", res)
        this.user = res.clients;
      }
    )
  }

  json(data: any){
    return JSON.stringify(data)
  }

  backButton(){
    this.router.navigate([UrlPages.LOGIN_PADRE])
  }
}
