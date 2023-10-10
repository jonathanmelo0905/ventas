import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.css']
})
export class FormOneComponent implements OnInit {

  @Input('data') info: any;
  @Output() newItemEvent = new EventEmitter<boolean>();
  mensaje: string = '';
  name: string = '';

  constructor() { }

  ngOnInit(){
    let data = JSON.parse(localStorage.getItem('stateSession') || '0');
    this.name = data.name
    this.mensaje = this.info.mensaje;
  }

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

}
