import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/enums/rutas';
import { InfoSalesman } from 'src/app/models/salesman.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  vendedores: InfoSalesman[] = [];
  session: FormGroup = new FormGroup({});
  isPassword: boolean = false;

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
        this.vendedores = res.clients;
        this.logIn();
      }
    )
  }

  logIn() {
    const data = JSON.parse(localStorage.getItem('session') || 'false');
    if (data) this.router.navigate([UrlPages.HOME]);
  }

  validationSession(data: any) {
    this.validationIdentidad(data);
    this.session.reset(this.session);
  }

  validationIdentidad(data: any) {
    let user = this.vendedores.find( user => user.password == data.password && user.user == data.user);
    if(user){
      localStorage.setItem('stateSession', JSON.stringify(user));
      localStorage.setItem('session', 'true');
      this.router.navigate(['/', 'home']);
    }else{
      this.isPassword = true;
    }
  }

  backButton(){
    this.router.navigate([UrlPages.SESSION, UrlPages.REGISTRO])
  }
  

}
