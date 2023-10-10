import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoSalesman } from 'src/app/models/salesman.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  estudiantes: InfoSalesman[] = [];
  session: FormGroup = new FormGroup({});

  isPassword: boolean = false;
  isUser: boolean = false;


  

  
  respuesta: any = <any>{}

  constructor(private router: Router, 
    private dataServices: DataService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.sessionForm();
    sessionStorage.removeItem('lista-clientes')
    localStorage.removeItem('idclientes')
  }

  sessionForm(){
    this.session = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      user: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  getData() {
    this.dataServices.getVendedores().subscribe(
      res=>{
        this.estudiantes = res.clients;
        console.log("estudiantes:", this.estudiantes)
        this.logIn();
      }
    )
  }

  logIn() {
    const data = JSON.parse(localStorage.getItem('stateSession') || '0');
    if (data != 0) this.validationIdentidad(data);
  }

  validationSession(data: any) {
    this.validationIdentidad(data);
    this.session.reset(this.session);
  }

  validationIdentidad(data: any) {
    this.estudiantes.filter((e: any) => {
      if (e.user === data.user) {
        this.isUser = false;
        if (e.password === data.password) {
          this.isPassword = false;
          this.router.navigate(['/', 'home']);
          localStorage.setItem('stateSession', JSON.stringify(e));
        }else{
          this.isPassword = true;
        }
      }else{
        this.isUser = true;
      }
    });
  }

  

}
