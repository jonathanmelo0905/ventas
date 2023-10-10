import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit {
  
  stateStar: boolean = false;

  constructor(private router: Router,private servicesClient: DataService) { }

  async ngOnInit(){
  }

  stars(event: boolean){
    this.stateStar = event;
  }
}
