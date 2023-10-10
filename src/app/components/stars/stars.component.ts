import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Clients } from 'src/app/models/clients.models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Output() newStarEvent = new EventEmitter<boolean>();

  detailClient: Clients = <Clients>{};

  stars = [
    {
      id: 1,
      star: 'assets/iconos/star_gold.png',
      gold: 'assets/iconos/star_gold.png',
      black: 'assets/iconos/star_black.png'
    },
    {
      id: 2,
      star: 'assets/iconos/star_black.png',
      gold: 'assets/iconos/star_gold.png',
      black: 'assets/iconos/star_black.png'
    },
    {
      id: 3,
      star: 'assets/iconos/star_black.png',
      gold: 'assets/iconos/star_gold.png',
      black: 'assets/iconos/star_black.png'
    },
    {
      id: 4,
      star: 'assets/iconos/star_black.png',
      gold: 'assets/iconos/star_gold.png',
      black: 'assets/iconos/star_black.png'
    },
    {
      id: 5,
      star: 'assets/iconos/star_black.png',
      gold: 'assets/iconos/star_gold.png',
      black: 'assets/iconos/star_black.png'
    }
  ]

  idClient: number = 0;
  
  constructor(
    private service: DataService
  ) { }

  ngOnInit(): void {
    this.searchData();
  }

  
  searchData() {
    const data = JSON.parse(localStorage.getItem('cliente') || '[]');
    this.detailClient = data;
    this.idClient = data.id_client;
    this.qualification(data.prioridad, false)
  }

  assignStars(){
    for(let start of this.stars){
      start.star = start.black
    }
  }

  qualification(id: number, state: boolean = true){
    this.assignStars();
    for(let n=0; n<id; n++){
      this.stars[n].star = this.stars[n].gold
    }
    if(state){
      this.service.stars(this.idClient, id).subscribe(
        (res: any) =>{
          if(res.state){
            this.newStarEvent.emit(false)
            this.detailClient.prioridad = id;
            localStorage.setItem('cliente', JSON.stringify(this.detailClient))
            sessionStorage.removeItem('lista-clientes')
          }
        }
      )
    }
  }

  close(){
    this.newStarEvent.emit(false)
  }
}
