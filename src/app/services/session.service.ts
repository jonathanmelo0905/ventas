import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoSalesman } from '../models/salesman.models';
import { Respuesta } from '../models/res.models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  
  API_URI = environment.apiUrl;

  registerUser(data: InfoSalesman){
    return this.http.post<Respuesta>(`${this.API_URI}/client/register`, data)
  }

  estado(data: any, id:number){
    return this.http.put<Respuesta>(`${this.API_URI}/status/${id}`, {estado: data})
  }
}
